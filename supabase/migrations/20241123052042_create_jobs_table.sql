-- Create ENUMs for job statuses
CREATE TYPE "public"."job_status" AS ENUM (
  'pending',
  'processing',
  'completed',
  'failed'
);

CREATE TYPE "public"."job_type" AS ENUM (
  'split',
  'fill-form'
);

-- Create tables
CREATE TABLE "public"."pdf_batch_jobs" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "organization_id" uuid NOT NULL REFERENCES "organizations"(id),
  "profile_id" uuid NOT NULL REFERENCES "profiles"(id),
  "job_type" job_type NOT NULL,
  "status" job_status NOT NULL DEFAULT 'pending',
  "total_files" integer NOT NULL,
  "completed_files" integer NOT NULL DEFAULT 0,
  "failed_files" integer NOT NULL DEFAULT 0,
  "error_message" text,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE "public"."pdf_jobs" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "batch_id" uuid NOT NULL REFERENCES "pdf_batch_jobs"(id) ON DELETE CASCADE,
  "trigger_run_id" text,
  "status" job_status NOT NULL DEFAULT 'pending',
  "original_filename" text NOT NULL,
  "original_file_path" text NOT NULL,
  "processing_config" jsonb NOT NULL,
  "error_message" text,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE "public"."pdf_job_results" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "job_id" uuid NOT NULL REFERENCES "pdf_jobs"(id) ON DELETE CASCADE,
  "filename" text NOT NULL,
  "file_path" text NOT NULL,
  "size_bytes" integer NOT NULL,
  "metadata" jsonb,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_pdf_batch_jobs_org_profile ON pdf_batch_jobs(organization_id, profile_id);
CREATE INDEX idx_pdf_batch_jobs_status ON pdf_batch_jobs(status);
CREATE INDEX idx_pdf_jobs_batch_status ON pdf_jobs(batch_id, status);
CREATE INDEX idx_pdf_job_results_job_id ON pdf_job_results(job_id);

-- Enable RLS
ALTER TABLE "public"."pdf_batch_jobs" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."pdf_jobs" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."pdf_job_results" ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Organization members can view batch jobs" ON pdf_batch_jobs 
FOR SELECT USING (
  organization_id IN (
    SELECT organization_id FROM organization_memberships WHERE profile_id = auth.uid()
  )
);

CREATE POLICY "Organization members can create batch jobs" ON pdf_batch_jobs 
FOR INSERT WITH CHECK (
  organization_id IN (
    SELECT organization_id FROM organization_memberships WHERE profile_id = auth.uid()
  )
);

CREATE POLICY "Organization members can update their batch jobs" ON pdf_batch_jobs 
FOR UPDATE USING (
  organization_id IN (
    SELECT organization_id FROM organization_memberships WHERE profile_id = auth.uid()
  )
);

-- Jobs policies using batch_id for efficiency
CREATE POLICY "Organization members can view jobs" ON pdf_jobs 
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM pdf_batch_jobs b
    WHERE b.id = batch_id 
    AND b.organization_id IN (
      SELECT organization_id FROM organization_memberships WHERE profile_id = auth.uid()
    )
  )
);

CREATE POLICY "Organization members can create jobs" ON pdf_jobs 
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM pdf_batch_jobs b
    WHERE b.id = batch_id 
    AND b.organization_id IN (
      SELECT organization_id FROM organization_memberships WHERE profile_id = auth.uid()
    )
  )
);

CREATE POLICY "Organization members can update their jobs" ON pdf_jobs 
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM pdf_batch_jobs b
    WHERE b.id = batch_id 
    AND b.organization_id IN (
      SELECT organization_id FROM organization_memberships WHERE profile_id = auth.uid()
    )
  )
);

-- Results policies
CREATE POLICY "Organization members can view job results" ON pdf_job_results 
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM pdf_jobs j
    JOIN pdf_batch_jobs b ON b.id = j.batch_id
    WHERE j.id = job_id 
    AND b.organization_id IN (
      SELECT organization_id FROM organization_memberships WHERE profile_id = auth.uid()
    )
  )
);

-- Function to update batch status based on jobs status
CREATE OR REPLACE FUNCTION public.update_batch_status()
RETURNS TRIGGER AS $$
BEGIN
  -- Update completed/failed counts
  UPDATE pdf_batch_jobs
  SET 
    completed_files = (
      SELECT COUNT(*) FROM pdf_jobs 
      WHERE batch_id = NEW.batch_id AND status = 'completed'
    ),
    failed_files = (
      SELECT COUNT(*) FROM pdf_jobs 
      WHERE batch_id = NEW.batch_id AND status = 'failed'
    ),
    status = CASE
      WHEN (
        SELECT COUNT(*) FROM pdf_jobs 
        WHERE batch_id = NEW.batch_id AND status IN ('pending', 'processing')
      ) = 0 THEN
        CASE
          WHEN (
            SELECT COUNT(*) FROM pdf_jobs 
            WHERE batch_id = NEW.batch_id AND status = 'failed'
          ) > 0 THEN 'failed'
          ELSE 'completed'
        END
      ELSE 'processing'
    END,
    updated_at = now()
  WHERE id = NEW.batch_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for updating batch status
CREATE TRIGGER update_batch_status_on_job_update
  AFTER UPDATE OF status ON pdf_jobs
  FOR EACH ROW
  WHEN (NEW.status IS DISTINCT FROM OLD.status)
  EXECUTE FUNCTION update_batch_status();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER handle_pdf_batch_jobs_updated_at
  BEFORE UPDATE ON pdf_batch_jobs
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_pdf_jobs_updated_at
  BEFORE UPDATE ON pdf_jobs
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();