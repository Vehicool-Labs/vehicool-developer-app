export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      api_keys: {
        Row: {
          api_key: string
          created_at: string | null
          global_requests_count: number
          id: number
          is_active: boolean
          user_id: string
        }
        Insert: {
          api_key?: string
          created_at?: string | null
          global_requests_count?: number
          id?: number
          is_active?: boolean
          user_id: string
        }
        Update: {
          api_key?: string
          created_at?: string | null
          global_requests_count?: number
          id?: number
          is_active?: boolean
          user_id?: string
        }
      }
      vehicle_bodies: {
        Row: {
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
        }
      }
      vehicle_brands: {
        Row: {
          country: string | null
          created_at: string | null
          id: number
          name: string
          slug: string
        }
        Insert: {
          country?: string | null
          created_at?: string | null
          id?: number
          name: string
          slug: string
        }
        Update: {
          country?: string | null
          created_at?: string | null
          id?: number
          name?: string
          slug?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
