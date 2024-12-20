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

-- service account can view their files
create policy "Organization service account can view their files" on storage.objects
for select to service_account
using (
  bucket_id = 'organizations' AND
  (storage.foldername(name))[1] IN (
    select organization_id::text 
    from service_accounts 
    where id = auth.uid()
  )
);

-- Storage bucket policy
-- create policy "Organization service account can upload files" on storage.objects
-- for insert to service_account
-- WITH CHECK (
--   bucket_id = 'organizations' AND
--   (storage.foldername(name))[1] IN (
--     select organization_id::text 
--     from service_accounts 
--     where id = auth.uid()
--   )
-- );

-- -- Storage bucket policy
-- create policy "Organization service account can update files" on storage.objects
-- for update to service_account
-- using (
--   bucket_id = 'organizations' AND
--   (storage.foldername(name))[1] IN (
--     select organization_id::text 
--     from service_accounts 
--     where id = auth.uid()
--   )
-- );