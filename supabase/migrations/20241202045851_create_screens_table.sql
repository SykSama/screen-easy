-- Create screen status enum
CREATE TYPE "public"."screen_status" AS ENUM (
    'online',
    'offline'
);

-- Create screen_groups table
CREATE TABLE "public"."screen_groups" (
    "id" uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    "organization_id" uuid NOT NULL,
    "name" text NOT NULL,
    "description" text,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT "screen_groups_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "screen_groups_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE CASCADE
);

-- Create screens table
CREATE TABLE "public"."screens" (
    "id" uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    "organization_id" uuid NOT NULL,
    "screen_group_id" uuid,
    "collection_id" uuid,
    "name" text NOT NULL,
    "description" text,
    "status" screen_status DEFAULT 'offline' NOT NULL,
    "last_ping" timestamp with time zone,
    "orientation" text DEFAULT 'landscape' NOT NULL,
    "resolution_width" integer,
    "resolution_height" integer,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT "screens_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "screens_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE CASCADE,
    CONSTRAINT "screens_screen_group_id_fkey" FOREIGN KEY ("screen_group_id") REFERENCES "public"."screen_groups"("id") ON DELETE SET NULL,
    CONSTRAINT "screens_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE SET NULL
);

-- Create indexes
CREATE INDEX "idx_screens_organization_id" ON "public"."screens" ("organization_id");
CREATE INDEX "idx_screens_screen_group_id" ON "public"."screens" ("screen_group_id");
CREATE INDEX "idx_screens_collection_id" ON "public"."screens" ("collection_id");
CREATE INDEX "idx_screen_groups_organization_id" ON "public"."screen_groups" ("organization_id");

-- Create updated_at triggers
CREATE TRIGGER "set_screen_groups_updated_at"
    BEFORE UPDATE ON "public"."screen_groups"
    FOR EACH ROW
    EXECUTE FUNCTION "public"."update_updated_at"();

CREATE TRIGGER "set_screens_updated_at"
    BEFORE UPDATE ON "public"."screens"
    FOR EACH ROW
    EXECUTE FUNCTION "public"."update_updated_at"();

-- Add RLS policies
ALTER TABLE "public"."screen_groups" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."screens" ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow organization access to screen_groups"
    ON "public"."screen_groups"
    FOR ALL
    USING ("organization_id" IN (
        SELECT "organization_id"
        FROM "public"."organization_memberships"
        WHERE "profile_id" = auth.uid()
    ));

CREATE POLICY "Allow organization access to screens"
    ON "public"."screens"
    FOR ALL
    USING ("organization_id" IN (
        SELECT "organization_id"
        FROM "public"."organization_memberships"
        WHERE "profile_id" = auth.uid()
    )); 