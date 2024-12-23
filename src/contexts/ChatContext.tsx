import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { initializeSocket, disconnectSocket } from '../services/socket';
import type { Message, ChatRoom } from '../types/chat';

interface ChatContextType {
  rooms: ChatRoom[];
  currentRoom: ChatRoom | null;
  messages: Message[];
  setCurrentRoom: (room: ChatRoom | null) => void;
  sendMessage: (content: string) => void;
  markAsRead: (roomId: string) => void;
  unreadCount: number;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [currentRoom, setCurrentRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (token) {
      const socket = initializeSocket(token);

      socket.on('rooms', (updatedRooms: ChatRoom[]) => {
        setRooms(updatedRooms);
        setUnreadCount(updatedRooms.reduce((acc, room) => acc + room.unreadCount, 0));
      });

      socket.on('messages', (roomMessages: Message[]) => {
        setMessages(roomMessages);
      });

      socket.on('message', (newMessage: Message) => {
        setMessages(prev => [...prev, newMessage]);
        if (newMessage.roomId !== currentRoom?.id) {
          setUnreadCount(prev => prev + 1);
        }
      });

      return () => {
        disconnectSocket();
      };
    }
  }, [token, currentRoom]);

  const sendMessage = (content: string) => {
    if (currentRoom) {
      const socket = initializeSocket(token!);
      socket.emit('message', {
        roomId: currentRoom.id,
        content
      });
    }
  };

  const markAsRead = (roomId: string) => {
    const socket = initializeSocket(token!);
    socket.emit('markAsRead', { roomId });
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  return (
    <ChatContext.Provider value={{
      rooms,
      currentRoom,
      messages,
      setCurrentRoom,
      sendMessage,
      markAsRead,
      unreadCount
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}