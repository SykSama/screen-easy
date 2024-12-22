-- ** service_accounts **
create role "service_account";

grant service_account to authenticator;
grant anon to service_account;

create table public.service_accounts (
    id uuid not null,
    email text not null,
    organization_id uuid references public.organizations on delete cascade,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),

    constraint service_accounts_pkey primary key (id),
    constraint service_accounts_id_fkey foreign key (id) references auth.users (id) on delete cascade
);

alter table public.service_accounts enable row level security;

create policy "Service accounts are accessible by everyone" 
on public.service_accounts 
for all 
using (true);

create policy "Organization service account can view their files" on storage.objects
for select
to service_account
using (
  bucket_id = 'organizations' AND
  (storage.foldername(name))[1] IN (
    select organization_id::text 
    from service_accounts 
    where id = auth.uid()
  )
);

create trigger update_service_accounts_updated_at
before update on public.service_accounts
for each row
execute function public.update_updated_at();

create or replace function public.handle_new_service_account()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.service_accounts (id, email, organization_id)
  values (new.id, new.email, (new.raw_user_meta_data ->> 'organization_id')::uuid);
  return new;
end;
$$;

create trigger on_service_account_created
after insert on auth.users
for each row
when (coalesce((new.raw_user_meta_data ->> 'service_account')::boolean, false))
execute function public.handle_new_service_account();

create or replace trigger on_auth_user_created
after insert on auth.users
for each row
when (coalesce((new.raw_user_meta_data ->> 'service_account')::boolean, false) = false)
execute function public.handle_new_user();

create or replace trigger on_auth_user_updated
after update on auth.users
for each row
when (coalesce((new.raw_user_meta_data ->> 'service_account')::boolean, false) = false)
execute function public.handle_update_user();

-- ** Other tables names