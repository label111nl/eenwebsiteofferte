import React, { useState } from 'react';
import { Send, Smile } from 'lucide-react';
import { Button } from '../ui/Button';

interface ChatInputProps {
  onSend: (message: string) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <div className="border-t p-4">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowEmoji(!showEmoji)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Smile className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <Button
          type="submit"
          variant="primary"
          size="sm"
          icon={<Send className="h-4 w-4" />}
        >
          Send
        </Button>
      </form>
    </div>
  );
}