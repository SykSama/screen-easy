create table public.organizations (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    slug char(20) not null unique default nanoid(20, 'abcdefghijklmnopqrstuvwxyz'),
    email text not null,
    stripe_customer_id text not null unique,
    created_at timestamp with time zone not null default current_timestamp,
    updated_at timestamp with time zone not null default current_timestamp
);

create unique index "organizations_slug_idx" on public.organizations("slug");

alter table public.organizations enable row level security;

create policy "Enable insert for authenticated users only"
on public.organizations
for insert to authenticated
with check (true);

create policy "Enable select for authenticated users only"
on public.organizations
for select to authenticated
using (true);

create trigger update_updated_at
before update on public.organizations
for each row
execute function public.update_updated_at();