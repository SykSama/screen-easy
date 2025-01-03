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
          resize_mode: Database["public"]["Enums"]["resize_mode"]
        }
        Insert: {
          collection_id: string
          created_at?: string
          display_from?: string | null
          display_order: number
          display_until?: string | null
          duration?: number
          media_id: string
          resize_mode?: Database["public"]["Enums"]["resize_mode"]
        }
        Update: {
          collection_id?: string
          created_at?: string
          display_from?: string | null
          display_order?: number
          display_until?: string | null
          duration?: number
          media_id?: string
          resize_mode?: Database["public"]["Enums"]["resize_mode"]
        }
        Relationships: [
          {
            foreignKeyName: "collection_media_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collection_with_medias_v"
            referencedColumns: ["id"]
          },
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
      device_groups: {
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
            foreignKeyName: "device_groups_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      device_information: {
        Row: {
          device_brand: string | null
          device_name: string | null
          device_os: string | null
          device_os_version: string | null
          id: string
          screen_height: number | null
          screen_scale: number | null
          screen_width: number | null
        }
        Insert: {
          device_brand?: string | null
          device_name?: string | null
          device_os?: string | null
          device_os_version?: string | null
          id?: string
          screen_height?: number | null
          screen_scale?: number | null
          screen_width?: number | null
        }
        Update: {
          device_brand?: string | null
          device_name?: string | null
          device_os?: string | null
          device_os_version?: string | null
          id?: string
          screen_height?: number | null
          screen_scale?: number | null
          screen_width?: number | null
        }
        Relationships: []
      }
      device_waiting: {
        Row: {
          created_at: string
          device_information_id: string | null
          id: string
          nanoid: string
          organization_email: string | null
          organization_id: string | null
          sign_in_otp_code: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          device_information_id?: string | null
          id?: string
          nanoid?: string
          organization_email?: string | null
          organization_id?: string | null
          sign_in_otp_code?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          device_information_id?: string | null
          id?: string
          nanoid?: string
          organization_email?: string | null
          organization_id?: string | null
          sign_in_otp_code?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "device_waiting_device_information_id_fkey"
            columns: ["device_information_id"]
            isOneToOne: false
            referencedRelation: "device_information"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "device_waiting_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      devices: {
        Row: {
          collection_id: string | null
          created_at: string
          description: string | null
          device_group_id: string | null
          device_information_id: string | null
          id: string
          last_ping: string | null
          name: string
          organization_id: string
          orientation: string
          resolution_height: number | null
          resolution_width: number | null
          updated_at: string
        }
        Insert: {
          collection_id?: string | null
          created_at?: string
          description?: string | null
          device_group_id?: string | null
          device_information_id?: string | null
          id?: string
          last_ping?: string | null
          name: string
          organization_id: string
          orientation?: string
          resolution_height?: number | null
          resolution_width?: number | null
          updated_at?: string
        }
        Update: {
          collection_id?: string | null
          created_at?: string
          description?: string | null
          device_group_id?: string | null
          device_information_id?: string | null
          id?: string
          last_ping?: string | null
          name?: string
          organization_id?: string
          orientation?: string
          resolution_height?: number | null
          resolution_width?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "devices_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collection_with_medias_v"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "devices_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "devices_device_group_id_fkey"
            columns: ["device_group_id"]
            isOneToOne: false
            referencedRelation: "device_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "devices_device_information_id_fkey"
            columns: ["device_information_id"]
            isOneToOne: false
            referencedRelation: "device_information"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "devices_organization_id_fkey"
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
          file_size: number | null
          height: number | null
          id: string
          metadata: Json | null
          name: string
          organization_id: string
          path: string
          status: Database["public"]["Enums"]["media_status"]
          type: Database["public"]["Enums"]["media_type"]
          updated_at: string
          video_duration: number | null
          width: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          file_size?: number | null
          height?: number | null
          id?: string
          metadata?: Json | null
          name: string
          organization_id: string
          path: string
          status?: Database["public"]["Enums"]["media_status"]
          type: Database["public"]["Enums"]["media_type"]
          updated_at?: string
          video_duration?: number | null
          width?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          file_size?: number | null
          height?: number | null
          id?: string
          metadata?: Json | null
          name?: string
          organization_id?: string
          path?: string
          status?: Database["public"]["Enums"]["media_status"]
          type?: Database["public"]["Enums"]["media_type"]
          updated_at?: string
          video_duration?: number | null
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
      organizations: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          slug: string
          stripe_customer_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          slug?: string
          stripe_customer_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          slug?: string
          stripe_customer_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      prices: {
        Row: {
          active: boolean | null
          currency: string | null
          description: string | null
          id: string
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count: number | null
          metadata: Json | null
          product_id: string | null
          trial_period_days: number | null
          type: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount: number | null
        }
        Insert: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Update: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean | null
          description: string | null
          id: string
          image: string | null
          metadata: Json | null
          name: string | null
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          id: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Update: {
          active?: boolean | null
          description?: string | null
          id?: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Relationships: []
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
      rules: {
        Row: {
          collections_allowed: number | null
          created_at: string
          medias_per_collection_allowed: number | null
          product_id: string
          screens_allowed: number | null
          updated_at: string
        }
        Insert: {
          collections_allowed?: number | null
          created_at?: string
          medias_per_collection_allowed?: number | null
          product_id: string
          screens_allowed?: number | null
          updated_at?: string
        }
        Update: {
          collections_allowed?: number | null
          created_at?: string
          medias_per_collection_allowed?: number | null
          product_id?: string
          screens_allowed?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rules_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      service_accounts: {
        Row: {
          created_at: string
          email: string
          id: string
          organization_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          organization_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          organization_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_accounts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created: string
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          id: string
          metadata: Json | null
          organization_id: string
          price_id: string | null
          quantity: number | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          trial_end: string | null
          trial_start: string | null
        }
        Insert: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id: string
          metadata?: Json | null
          organization_id: string
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
        }
        Update: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          organization_id?: string
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      collection_with_medias_v: {
        Row: {
          created_at: string | null
          description: string | null
          id: string | null
          is_active: boolean | null
          medias: Json | null
          name: string | null
          organization_id: string | null
          updated_at: string | null
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
    }
    Functions: {
      create_waiting_device_from_device_information: {
        Args: {
          device_info: Json
        }
        Returns: Json
      }
      nanoid: {
        Args: {
          size?: number
          alphabet?: string
        }
        Returns: string
      }
      new_device: {
        Args: {
          device_id: string
          name: string
        }
        Returns: Json
      }
    }
    Enums: {
      media_status: "processing" | "ready" | "error"
      media_type: "image" | "video"
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      resize_mode: "center" | "contain" | "cover" | "repeat" | "stretch"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
        | "paused"
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

