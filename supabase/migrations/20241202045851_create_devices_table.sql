-- Create device status enum
CREATE TYPE "public"."device_status" AS ENUM (
    'online',
    'offline'
);

-- Create device_groups table
CREATE TABLE "public"."device_groups" (
    "id" uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    "organization_id" uuid NOT NULL,
    "name" text NOT NULL,
    "description" text,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT "device_groups_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "device_groups_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE CASCADE
);

-- Create devices table
CREATE TABLE "public"."devices" (
    "id" uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    "organization_id" uuid NOT NULL,
    "device_group_id" uuid,
    "collection_id" uuid,
    "name" text NOT NULL,
    "description" text,
    "status" device_status DEFAULT 'offline' NOT NULL,
    "last_ping" timestamp with time zone,
    "orientation" text DEFAULT 'landscape' NOT NULL,
    "resolution_width" integer,
    "resolution_height" integer,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT "devices_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "devices_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE CASCADE,
    CONSTRAINT "devices_device_group_id_fkey" FOREIGN KEY ("device_group_id") REFERENCES "public"."device_groups"("id") ON DELETE SET NULL,
    CONSTRAINT "devices_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE SET NULL
);

-- Create indexes
CREATE INDEX "idx_devices_organization_id" ON "public"."devices" ("organization_id");
CREATE INDEX "idx_devices_device_group_id" ON "public"."devices" ("device_group_id");
CREATE INDEX "idx_devices_collection_id" ON "public"."devices" ("collection_id");
CREATE INDEX "idx_device_groups_organization_id" ON "public"."device_groups" ("organization_id");

-- Create updated_at triggers
CREATE TRIGGER "set_device_groups_updated_at"
    BEFORE UPDATE ON "public"."device_groups"
    FOR EACH ROW
    EXECUTE FUNCTION "public"."update_updated_at"();

CREATE TRIGGER "set_devices_updated_at"
    BEFORE UPDATE ON "public"."devices"
    FOR EACH ROW
    EXECUTE FUNCTION "public"."update_updated_at"();

-- Add RLS policies
ALTER TABLE "public"."device_groups" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."devices" ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow organization access to device_groups"
    ON "public"."device_groups"
    FOR ALL
    USING ("organization_id" IN (
        SELECT "organization_id"
        FROM "public"."organization_memberships"
        WHERE "profile_id" = auth.uid()
    ));

CREATE POLICY "Allow organization access to devices"
    ON "public"."devices"
    FOR ALL
    USING ("organization_id" IN (
        SELECT "organization_id"
        FROM "public"."organization_memberships"
        WHERE "profile_id" = auth.uid()
    )); 