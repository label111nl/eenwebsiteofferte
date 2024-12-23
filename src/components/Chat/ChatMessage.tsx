import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../../contexts/AuthContext';
import { Check, CheckCheck } from 'lucide-react';
import type { Message } from '../../types/chat';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { user } = useAuth();
  const isOwnMessage = message.senderId === user?.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[70%] ${isOwnMessage ? 'order-2' : 'order-1'}`}>
        <div
          className={`rounded-lg px-4 py-2 ${
            isOwnMessage 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-100 text-gray-900'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
        </div>
        <div
          className={`mt-1 flex items-center space-x-2 text-xs text-gray-500
            ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
        >
          <span>{formatDistanceToNow(new Date(message.timestamp))} ago</span>
          {isOwnMessage && (
            message.read ? <CheckCheck size={12} /> : <Check size={12} />
          )}
        </div>
      </div>
    </motion.div>
  );
}