import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Book {
  id: string
  title: string
  author: string
  level: 'O' | 'A'
  class: string | null
  subject: string
  description: string | null
  keywords: string[] | null
  cover_url: string | null
  file_url: string | null
  featured: boolean
  created_at: string
  updated_at: string
}

export interface BookRequest {
  id: string
  book_title: string
  author: string
  subject: string
  class_level: string
  reason: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'FULFILLED'
  student_name: string | null
  student_email: string | null
  date_requested: string
  date_updated: string
  admin_notes: string | null
}

export interface Subject {
  id: number
  name: string
  icon: string | null
  color: string | null
  level: 'O' | 'A' | 'BOTH'
  display_order: number
  active: boolean
  created_at: string
  updated_at: string
}

export interface AdminUser {
  id: string
  email: string
  full_name: string
  role: 'admin' | 'moderator'
  is_active: boolean
  last_login: string | null
  created_at: string
}
