import { io, Socket } from 'socket.io-client';
import { Message } from '../types/chat';

let socket: Socket | null = null;

export const initializeSocket = (token: string) => {
  if (!socket) {
    socket = io(import.meta.env.VITE_WS_URL, {
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    socket.on('connect', () => {
      console.log('Connected to chat server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from chat server');
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    socket.on('reconnect', (attemptNumber) => {
      console.log('Reconnected after', attemptNumber, 'attempts');
    });
  }
  return socket;
};

export const joinRoom = (roomId: string) => {
  if (!socket) throw new Error('Socket not initialized');
  socket.emit('join_room', { roomId });
};

export const leaveRoom = (roomId: string) => {
  if (!socket) throw new Error('Socket not initialized');
  socket.emit('leave_room', { roomId });
};

export const sendMessage = async (message: Partial<Message>) => {
  if (!socket) throw new Error('Socket not initialized');
  return new Promise((resolve, reject) => {
    socket!.emit('message', message, (response: { success: boolean; error?: string }) => {
      if (response.success) {
        resolve(response);
      } else {
        reject(new Error(response.error || 'Failed to send message'));
      }
    });
  });
};

export const subscribeToMessages = (callback: (message: Message) => void) => {
  if (!socket) throw new Error('Socket not initialized');
  socket.on('message', callback);
  return () => {
    socket.off('message', callback);
  };
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};