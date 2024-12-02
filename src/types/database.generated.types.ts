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
      collection_media: {
        Row: {
          collection_id: string
          created_at: string
          display_from: string | null
          display_order: number
          display_until: string | null
          duration: number
          media_id: string
          transition_duration: number
        }
        Insert: {
          collection_id: string
          created_at?: string
          display_from?: string | null
          display_order: number
          display_until?: string | null
          duration?: number
          media_id: string
          transition_duration?: number
        }
        Update: {
          collection_id?: string
          created_at?: string
          display_from?: string | null
          display_order?: number
          display_until?: string | null
          duration?: number
          media_id?: string
          transition_duration?: number
        }
        Relationships: [
          {
            foreignKeyName: "collection_media_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_media_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      collections: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          organization_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          organization_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          organization_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "collections_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      media: {
        Row: {
          created_at: string
          description: string | null
          duration: number | null
          file_size: number | null
          height: number | null
          id: string
          metadata: Json | null
          name: string
          organization_id: string
          status: Database["public"]["Enums"]["media_status"]
          thumbnail_url: string | null
          type: Database["public"]["Enums"]["media_type"]
          updated_at: string
          url: string
          width: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration?: number | null
          file_size?: number | null
          height?: number | null
          id?: string
          metadata?: Json | null
          name: string
          organization_id: string
          status?: Database["public"]["Enums"]["media_status"]
          thumbnail_url?: string | null
          type: Database["public"]["Enums"]["media_type"]
          updated_at?: string
          url: string
          width?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          duration?: number | null
          file_size?: number | null
          height?: number | null
          id?: string
          metadata?: Json | null
          name?: string
          organization_id?: string
          status?: Database["public"]["Enums"]["media_status"]
          thumbnail_url?: string | null
          type?: Database["public"]["Enums"]["media_type"]
          updated_at?: string
          url?: string
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "media_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
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
      screen_groups: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          organization_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          organization_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          organization_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "screen_groups_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      screens: {
        Row: {
          collection_id: string | null
          created_at: string
          description: string | null
          id: string
          last_ping: string | null
          name: string
          organization_id: string
          orientation: string
          resolution_height: number | null
          resolution_width: number | null
          screen_group_id: string | null
          status: Database["public"]["Enums"]["screen_status"]
          updated_at: string
        }
        Insert: {
          collection_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          last_ping?: string | null
          name: string
          organization_id: string
          orientation?: string
          resolution_height?: number | null
          resolution_width?: number | null
          screen_group_id?: string | null
          status?: Database["public"]["Enums"]["screen_status"]
          updated_at?: string
        }
        Update: {
          collection_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          last_ping?: string | null
          name?: string
          organization_id?: string
          orientation?: string
          resolution_height?: number | null
          resolution_width?: number | null
          screen_group_id?: string | null
          status?: Database["public"]["Enums"]["screen_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "screens_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "screens_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "screens_screen_group_id_fkey"
            columns: ["screen_group_id"]
            isOneToOne: false
            referencedRelation: "screen_groups"
            referencedColumns: ["id"]
          },
        ]
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
      media_status: "processing" | "ready" | "error"
      media_type: "image" | "video"
      screen_status: "online" | "offline"
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

