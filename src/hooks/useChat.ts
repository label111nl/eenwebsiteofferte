import { useState, useEffect, useCallback } from 'react';
import { Message, ChatRoom } from '../types/chat';
import { initializeSocket, sendMessage, subscribeToMessages, joinRoom, leaveRoom } from '../utils/socket';
import { useAuth } from '../contexts/AuthContext';

export function useChat(roomId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [room, setRoom] = useState<ChatRoom | null>(null);
  const { token, user } = useAuth();

  useEffect(() => {
    if (!token || !user) return;

    const socket = initializeSocket(token);
    
    const handleConnect = () => {
      setIsConnected(true);
      joinRoom(roomId);
      
      // Load previous messages
      socket.emit('get_messages', { roomId }, (response: Message[]) => {
        if (Array.isArray(response)) {
          setMessages(response);
        }
      });

      // Get room details
      socket.emit('get_room', { roomId }, (response: ChatRoom) => {
        setRoom(response);
      });
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    const handleError = (error: Error) => {
      console.error('Chat error:', error);
      setIsConnected(false);
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('error', handleError);

    // Subscribe to new messages
    const unsubscribe = subscribeToMessages((message) => {
      if (message.roomId === roomId) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('error', handleError);
      unsubscribe();
      leaveRoom(roomId);
    };
  }, [token, roomId, user]);

  const sendChatMessage = useCallback(async (content: string) => {
    if (!isConnected || !user) {
      throw new Error('Chat not connected');
    }
    
    try {
      const message = {
        roomId,
        content,
        senderId: user.id,
        senderName: user.name,
        timestamp: new Date().toISOString(),
      };

      await sendMessage(message);
      setMessages((prev) => [...prev, message as Message]);
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }, [isConnected, user, roomId]);

  return {
    messages,
    room,
    sendMessage: sendChatMessage,
    isConnected,
  };
}