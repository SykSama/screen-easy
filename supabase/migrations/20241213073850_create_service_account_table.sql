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