export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      check_ins: {
        Row: {
          ai_summary: string | null
          client_id: string
          id: string
          progress_photos: string[] | null
          responses: Json
          reviewed_at: string | null
          submitted_at: string
          trainer_feedback: string | null
          trainer_id: string
          week_number: number
        }
        Insert: {
          ai_summary?: string | null
          client_id: string
          id?: string
          progress_photos?: string[] | null
          responses: Json
          reviewed_at?: string | null
          submitted_at?: string
          trainer_feedback?: string | null
          trainer_id: string
          week_number: number
        }
        Update: {
          ai_summary?: string | null
          client_id?: string
          id?: string
          progress_photos?: string[] | null
          responses?: Json
          reviewed_at?: string | null
          submitted_at?: string
          trainer_feedback?: string | null
          trainer_id?: string
          week_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "check_ins_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "check_ins_trainer_id_fkey"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      client_profiles: {
        Row: {
          date_of_birth: string | null
          emergency_contact: Json | null
          fitness_level: string | null
          goals: string[] | null
          height_cm: number | null
          id: string
          medical_conditions: string[] | null
          trainer_id: string | null
          weight_kg: number | null
        }
        Insert: {
          date_of_birth?: string | null
          emergency_contact?: Json | null
          fitness_level?: string | null
          goals?: string[] | null
          height_cm?: number | null
          id: string
          medical_conditions?: string[] | null
          trainer_id?: string | null
          weight_kg?: number | null
        }
        Update: {
          date_of_birth?: string | null
          emergency_contact?: Json | null
          fitness_level?: string | null
          goals?: string[] | null
          height_cm?: number | null
          id?: string
          medical_conditions?: string[] | null
          trainer_id?: string | null
          weight_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "client_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_profiles_trainer_id_fkey"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          message_type: string | null
          read_at: string | null
          recipient_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          message_type?: string | null
          read_at?: string | null
          recipient_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          message_type?: string | null
          read_at?: string | null
          recipient_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          updated_at: string
          user_type: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          updated_at?: string
          user_type: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_type?: string
        }
        Relationships: []
      }
      trainer_profiles: {
        Row: {
          bio: string | null
          brand_colors: Json | null
          business_name: string | null
          certifications: string[] | null
          communication_tone: string | null
          experience_years: number | null
          hourly_rate: number | null
          id: string
          logo_url: string | null
          specializations: string[] | null
          timezone: string | null
        }
        Insert: {
          bio?: string | null
          brand_colors?: Json | null
          business_name?: string | null
          certifications?: string[] | null
          communication_tone?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id: string
          logo_url?: string | null
          specializations?: string[] | null
          timezone?: string | null
        }
        Update: {
          bio?: string | null
          brand_colors?: Json | null
          business_name?: string | null
          certifications?: string[] | null
          communication_tone?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          logo_url?: string | null
          specializations?: string[] | null
          timezone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trainer_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      video_sessions: {
        Row: {
          action_items: Json | null
          ai_summary: string | null
          client_id: string
          created_at: string
          duration_minutes: number | null
          id: string
          meeting_url: string | null
          session_date: string
          status: string | null
          trainer_id: string
          transcript: string | null
        }
        Insert: {
          action_items?: Json | null
          ai_summary?: string | null
          client_id: string
          created_at?: string
          duration_minutes?: number | null
          id?: string
          meeting_url?: string | null
          session_date: string
          status?: string | null
          trainer_id: string
          transcript?: string | null
        }
        Update: {
          action_items?: Json | null
          ai_summary?: string | null
          client_id?: string
          created_at?: string
          duration_minutes?: number | null
          id?: string
          meeting_url?: string | null
          session_date?: string
          status?: string | null
          trainer_id?: string
          transcript?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "video_sessions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_sessions_trainer_id_fkey"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_programs: {
        Row: {
          client_id: string | null
          created_at: string
          description: string | null
          difficulty_level: string | null
          duration_weeks: number | null
          exercises: Json
          id: string
          is_template: boolean | null
          name: string
          trainer_id: string
          updated_at: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          duration_weeks?: number | null
          exercises: Json
          id?: string
          is_template?: boolean | null
          name: string
          trainer_id: string
          updated_at?: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          duration_weeks?: number | null
          exercises?: Json
          id?: string
          is_template?: boolean | null
          name?: string
          trainer_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_programs_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_programs_trainer_id_fkey"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
