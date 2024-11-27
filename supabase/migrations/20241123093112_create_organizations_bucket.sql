-- Use Postgres to create a bucket.
insert into storage.buckets (id, name, public) 
values('organizations', 'organizations', false);

CREATE POLICY "Organization members can view their files" ON storage.objects
FOR SELECT TO authenticated
USING (
  bucket_id = 'organizations' AND
  (storage.foldername(name))[1] IN (
    SELECT organization_id::text 
    FROM organization_memberships 
    WHERE profile_id = auth.uid()
  )
);

-- Storage bucket policy
CREATE POLICY "Organization members can upload files" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'organizations' AND
  (storage.foldername(name))[1] IN (
    SELECT organization_id::text 
    FROM organization_memberships 
    WHERE profile_id = auth.uid()
  )
);

-- Storage bucket policy
CREATE POLICY "Organization members can update files" ON storage.objects
FOR UPDATE TO authenticated
USING (
  bucket_id = 'organizations' AND
  (storage.foldername(name))[1] IN (
    SELECT organization_id::text 
    FROM organization_memberships 
    WHERE profile_id = auth.uid()
  )
);
