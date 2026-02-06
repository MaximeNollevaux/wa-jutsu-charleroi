export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type MemberRole = 'admin' | 'practitioner'
export type MemberCategory = 'enfant' | 'jeune' | 'adulte'
export type PaymentStatus = 'pending' | 'paid' | 'overdue'
export type PaymentType = 'license' | 'subscription'
export type BeltColor = 'blanche' | 'jaune' | 'orange' | 'verte' | 'bleue' | 'marron' | 'noire' | 'violette'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          first_name: string
          last_name: string
          phone: string | null
          birth_date: string | null
          address: string | null
          postal_code: string | null
          city: string | null
          emergency_contact: string | null
          emergency_phone: string | null
          role: MemberRole
          category: MemberCategory | null
          current_belt: BeltColor
          is_active: boolean
          avatar_url: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          email: string
          first_name: string
          last_name: string
          phone?: string | null
          birth_date?: string | null
          address?: string | null
          postal_code?: string | null
          city?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          role?: MemberRole
          category?: MemberCategory | null
          current_belt?: BeltColor
          is_active?: boolean
          avatar_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          first_name?: string
          last_name?: string
          phone?: string | null
          birth_date?: string | null
          address?: string | null
          postal_code?: string | null
          city?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          role?: MemberRole
          category?: MemberCategory | null
          current_belt?: BeltColor
          is_active?: boolean
          avatar_url?: string | null
        }
      }
      payments: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          type: PaymentType
          amount: number
          period_start: string
          period_end: string
          status: PaymentStatus
          paid_at: string | null
          validated_by: string | null
          validated_at: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          type: PaymentType
          amount: number
          period_start: string
          period_end: string
          status?: PaymentStatus
          paid_at?: string | null
          validated_by?: string | null
          validated_at?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          type?: PaymentType
          amount?: number
          period_start?: string
          period_end?: string
          status?: PaymentStatus
          paid_at?: string | null
          validated_by?: string | null
          validated_at?: string | null
          notes?: string | null
        }
      }
      grades: {
        Row: {
          id: string
          created_at: string
          user_id: string
          belt: BeltColor
          obtained_at: string
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          belt: BeltColor
          obtained_at: string
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          belt?: BeltColor
          obtained_at?: string
          notes?: string | null
        }
      }
      announcements: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          content: string
          author_id: string
          is_published: boolean
          published_at: string | null
          expires_at: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          content: string
          author_id: string
          is_published?: boolean
          published_at?: string | null
          expires_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          content?: string
          author_id?: string
          is_published?: boolean
          published_at?: string | null
          expires_at?: string | null
        }
      }
      contact_messages: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          phone: string | null
          subject: string
          message: string
          is_read: boolean
          replied_at: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          phone?: string | null
          subject: string
          message: string
          is_read?: boolean
          replied_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          phone?: string | null
          subject?: string
          message?: string
          is_read?: boolean
          replied_at?: string | null
        }
      }
      registrations: {
        Row: {
          id: string
          created_at: string
          first_name: string
          last_name: string
          email: string
          phone: string
          birth_date: string
          address: string
          postal_code: string
          city: string
          category: MemberCategory
          emergency_contact: string
          emergency_phone: string
          message: string | null
          status: 'pending' | 'approved' | 'rejected'
          processed_at: string | null
          processed_by: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          first_name: string
          last_name: string
          email: string
          phone: string
          birth_date: string
          address: string
          postal_code: string
          city: string
          category: MemberCategory
          emergency_contact: string
          emergency_phone: string
          message?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          processed_at?: string | null
          processed_by?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          birth_date?: string
          address?: string
          postal_code?: string
          city?: string
          category?: MemberCategory
          emergency_contact?: string
          emergency_phone?: string
          message?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          processed_at?: string | null
          processed_by?: string | null
        }
      }
    }
  }
}
