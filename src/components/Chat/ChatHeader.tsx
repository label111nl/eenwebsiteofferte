import React from 'react';
import { Minimize2, Maximize2, X } from 'lucide-react';
import type { ChatRoom } from '../../types/chat';
import { useAuth } from '../../contexts/AuthContext';

interface ChatHeaderProps {
  room: ChatRoom;
  onClose: () => void;
  onMinimize: () => void;
  isMinimized: boolean;
}

export function ChatHeader({ room, onClose, onMinimize, isMinimized }: ChatHeaderProps) {
  const { user } = useAuth();
  const otherParticipant = room.participants.find(p => p.id !== user?.id);

  return (
    <div className="bg-indigo-600 text-white p-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-400 rounded-full" />
        <span className="font-medium">{otherParticipant?.name}</span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={onMinimize}
          className="p-1 hover:bg-indigo-700 rounded"
        >
          {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
        </button>
        <button
          onClick={onClose}
          className="p-1 hover:bg-indigo-700 rounded"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}