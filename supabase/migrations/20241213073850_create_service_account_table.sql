create role "service_account";

grant service_account to authenticator;
grant anon to service_account;

create table public.service_accounts (
    id uuid not null references auth.users on delete cascade,
    email text not null,
    organization_id uuid references public.organizations on delete cascade,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now()
);

alter table public.service_accounts enable row level security;

create policy "Service accounts are accessible by everyone" 
on public.service_accounts 
for all 
using (true);

create trigger update_updated_at
before update on public.service_accounts
for each row
execute function public.update_updated_at();

-- Function to handle new user and create profiles
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
