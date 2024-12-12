-- Create media types enum
CREATE TYPE "public"."media_type" AS ENUM (
    'image',
    'video'
);

-- Create media status enum
CREATE TYPE "public"."media_status" AS ENUM (
    'processing',
    'ready',
    'error'
);

-- Create media table
CREATE TABLE "public"."media" (
    "id" uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    "organization_id" uuid NOT NULL,
    "name" text NOT NULL,
    "description" text,
    "type" media_type NOT NULL,
    "status" media_status DEFAULT 'processing' NOT NULL,
    "path" text NOT NULL,
    "metadata" jsonb DEFAULT '{}'::jsonb,
    "video_duration" integer, -- in seconds, for videos
    "width" integer,
    "height" integer,
    "file_size" bigint, -- in bytes
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT "media_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "media_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX "idx_media_organization_id" ON "public"."media" ("organization_id");

-- Create updated_at triggers
CREATE TRIGGER "set_media_updated_at"
    BEFORE UPDATE ON "public"."media"
    FOR EACH ROW
    EXECUTE FUNCTION "public"."update_updated_at"();

-- Add RLS policies
ALTER TABLE "public"."media" ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow organization access to media"
    ON "public"."media"
    FOR ALL
    USING ("organization_id" IN (
        SELECT "organization_id"
        FROM "public"."organization_memberships"
        WHERE "profile_id" = auth.uid()
    )); 