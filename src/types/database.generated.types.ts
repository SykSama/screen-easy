export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      membership_roles: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      organization_memberships: {
        Row: {
          created_at: string
          organization_id: string
          profile_id: string
          role_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          organization_id: string
          profile_id: string
          role_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          organization_id?: string
          profile_id?: string
          role_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_memberships_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_memberships_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_memberships_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "membership_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_plans: {
        Row: {
          created_at: string
          id: string
          name: string
          stripe_monthly_price_id: string
          stripe_product_id: string
          stripe_yearly_price_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          name: string
          stripe_monthly_price_id: string
          stripe_product_id: string
          stripe_yearly_price_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          stripe_monthly_price_id?: string
          stripe_product_id?: string
          stripe_yearly_price_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      organizations: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          plan_id: string
          slug: string
          stripe_customer_id: string
          stripe_subscription_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          plan_id?: string
          slug?: string
          stripe_customer_id: string
          stripe_subscription_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          plan_id?: string
          slug?: string
          stripe_customer_id?: string
          stripe_subscription_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "organizations_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "organization_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      pdf_batch_jobs: {
        Row: {
          completed_files: number
          created_at: string
          error_message: string | null
          failed_files: number
          id: string
          job_type: Database["public"]["Enums"]["job_type"]
          organization_id: string
          profile_id: string
          status: Database["public"]["Enums"]["job_status"]
          total_files: number
          updated_at: string
        }
        Insert: {
          completed_files?: number
          created_at?: string
          error_message?: string | null
          failed_files?: number
          id?: string
          job_type: Database["public"]["Enums"]["job_type"]
          organization_id: string
          profile_id: string
          status?: Database["public"]["Enums"]["job_status"]
          total_files: number
          updated_at?: string
        }
        Update: {
          completed_files?: number
          created_at?: string
          error_message?: string | null
          failed_files?: number
          id?: string
          job_type?: Database["public"]["Enums"]["job_type"]
          organization_id?: string
          profile_id?: string
          status?: Database["public"]["Enums"]["job_status"]
          total_files?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pdf_batch_jobs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pdf_batch_jobs_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pdf_job_results: {
        Row: {
          created_at: string
          file_path: string
          filename: string
          id: string
          job_id: string
          metadata: Json | null
          size_bytes: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          file_path: string
          filename: string
          id?: string
          job_id: string
          metadata?: Json | null
          size_bytes: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          file_path?: string
          filename?: string
          id?: string
          job_id?: string
          metadata?: Json | null
          size_bytes?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pdf_job_results_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "pdf_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      pdf_jobs: {
        Row: {
          batch_id: string
          created_at: string
          error_message: string | null
          id: string
          original_file_path: string
          original_filename: string
          processing_config: Json
          status: Database["public"]["Enums"]["job_status"]
          trigger_run_id: string | null
          updated_at: string
        }
        Insert: {
          batch_id: string
          created_at?: string
          error_message?: string | null
          id?: string
          original_file_path: string
          original_filename: string
          processing_config: Json
          status?: Database["public"]["Enums"]["job_status"]
          trigger_run_id?: string | null
          updated_at?: string
        }
        Update: {
          batch_id?: string
          created_at?: string
          error_message?: string | null
          id?: string
          original_file_path?: string
          original_filename?: string
          processing_config?: Json
          status?: Database["public"]["Enums"]["job_status"]
          trigger_run_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pdf_jobs_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "pdf_batch_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      nanoid: {
        Args: {
          size?: number
          alphabet?: string
        }
        Returns: string
      }
    }
    Enums: {
      job_status: "pending" | "processing" | "completed" | "failed"
      job_type: "split" | "fill-form"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

