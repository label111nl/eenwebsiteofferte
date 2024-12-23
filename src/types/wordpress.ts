export interface WordPressForm {
  id: number;
  title: string;
  fields: FormField[];
  created_at: string;
}

export interface FormField {
  id: string;
  name: string;
  type: 'text' | 'email' | 'textarea' | 'number' | 'select';
  label: string;
  required: boolean;
  options?: string[];
}

export interface FormSubmission {
  id: number;
  form_id: number;
  data: Record<string, any>;
  created_at: string;
}