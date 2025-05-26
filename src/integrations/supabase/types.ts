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
      site_settings: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          site_name: string
          site_logo: string | null
          site_favicon: string | null
          primary_color: string | null
          secondary_color: string | null
          contact_email: string | null
          contact_phone: string | null
          social_links: Json | null
          meta_title: string | null
          meta_description: string | null
          footer_text: string | null
          header_scripts: string | null
          footer_scripts: string | null
          is_maintenance_mode: boolean | null
          maintenance_message: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          site_name?: string
          site_logo?: string | null
          site_favicon?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          social_links?: Json | null
          meta_title?: string | null
          meta_description?: string | null
          footer_text?: string | null
          header_scripts?: string | null
          footer_scripts?: string | null
          is_maintenance_mode?: boolean | null
          maintenance_message?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          site_name?: string
          site_logo?: string | null
          site_favicon?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          social_links?: Json | null
          meta_title?: string | null
          meta_description?: string | null
          footer_text?: string | null
          header_scripts?: string | null
          footer_scripts?: string | null
          is_maintenance_mode?: boolean | null
          maintenance_message?: string | null
        }
        Relationships: []
      },
      about_content: {
        Row: {
          content_data: Json | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          order_index: number | null
          section_type: string
          title: string
          updated_at: string
          year: string | null
        }
        Insert: {
          content_data?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          section_type: string
          title: string
          updated_at?: string
          year?: string | null
        }
        Update: {
          content_data?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          section_type?: string
          title?: string
          updated_at?: string
          year?: string | null
        }
        Relationships: []
      }
      activity_log: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          entity_type: string | null
          id: number
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          entity_type?: string | null
          id?: number
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          entity_type?: string | null
          id?: number
          user_id?: string | null
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          created_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string | null
          category: string | null
          content: string | null
          created_at: string | null
          excerpt: string | null
          featured_image: string | null
          id: number
          meta_description: string | null
          meta_title: string | null
          published: boolean | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: number
          meta_description?: string | null
          meta_title?: string | null
          published?: boolean | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: number
          meta_description?: string | null
          meta_title?: string | null
          published?: boolean | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      comments: {
        Row: {
          author_id: string | null
          content: string
          created_at: string
          id: number
          parent_id: number | null
          post_id: number
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string
          id?: number
          parent_id?: number | null
          post_id: number
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string
          id?: number
          parent_id?: number | null
          post_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          }
        ]
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: number
          message: string
          name: string
          phone: string | null
          responded: boolean
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          message: string
          name: string
          phone?: string | null
          responded?: boolean
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          message?: string
          name?: string
          phone?: string | null
          responded?: boolean
          subject?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string | null
          role: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          phone?: string | null
          role?: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
          role?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: {
          category: string
          client: string | null
          created_at: string
          description: string
          featured: boolean
          id: string
          image: string | null
          order_index: number
          slug: string
          technologies: string[] | null
          testimonial: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          client?: string | null
          created_at?: string
          description: string
          featured?: boolean
          id?: string
          image?: string | null
          order_index?: number
          slug: string
          technologies?: string[] | null
          testimonial?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          client?: string | null
          created_at?: string
          description?: string
          featured?: boolean
          id?: string
          image?: string | null
          order_index?: number
          slug?: string
          technologies?: string[] | null
          testimonial?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string
          featured: boolean
          icon: string | null
          id: string
          image: string | null
          order_index: number
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          featured?: boolean
          icon?: string | null
          id?: string
          image?: string | null
          order_index?: number
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          featured?: boolean
          icon?: string | null
          id?: string
          image?: string | null
          order_index?: number
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author: string
          company: string | null
          content: string
          created_at: string
          featured: boolean
          id: string
          image: string | null
          order_index: number
          position: string | null
          rating: number | null
          updated_at: string
        }
        Insert: {
          author: string
          company?: string | null
          content: string
          created_at?: string
          featured?: boolean
          id?: string
          image?: string | null
          order_index?: number
          position?: string | null
          rating?: number | null
          updated_at?: string
        }
        Update: {
          author?: string
          company?: string | null
          content?: string
          created_at?: string
          featured?: boolean
          id?: string
          image?: string | null
          order_index?: number
          position?: string | null
          rating?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      what_we_do: {
        Row: {
          created_at: string
          description: string
          featured: boolean
          icon: string | null
          id: string
          image: string | null
          order_index: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          featured?: boolean
          icon?: string | null
          id?: string
          image?: string | null
          order_index?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          featured?: boolean
          icon?: string | null
          id?: string
          image?: string | null
          order_index?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
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
