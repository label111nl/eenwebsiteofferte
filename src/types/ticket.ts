export interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'technical' | 'billing' | 'account' | 'other';
  created_by: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
  messages: TicketMessage[];
}

export interface TicketMessage {
  id: string;
  ticket_id: string;
  content: string;
  sender_id: string;
  sender_role: 'admin' | 'freelancer';
  created_at: string;
  attachments?: TicketAttachment[];
}

export interface TicketAttachment {
  id: string;
  filename: string;
  url: string;
  size: number;
  mime_type: string;
}