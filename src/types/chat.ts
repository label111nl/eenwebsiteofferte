export interface Message {
  id: string;
  roomId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface ChatRoom {
  id: string;
  leadId: string;
  participants: {
    id: string;
    name: string;
    role: 'freelancer' | 'client';
  }[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
}