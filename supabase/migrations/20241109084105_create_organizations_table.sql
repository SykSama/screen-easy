create table public.organizations (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    slug text not null unique,
    plan_id text not null default 'FREE' references public.organization_plans(id),
    email text not null,
    -- stripe_customer_id text,
    created_at timestamp with time zone not null default current_timestamp,
    updated_at timestamp with time zone not null default current_timestamp
);

create unique index "organizations_slug_idx" on public.organizations("slug");

alter table public.organizations enable row level security;

create policy "Organizations can be created by authenticated users."
  on organizations for insert
  to authenticated
  with check ( true );

create trigger update_updated_at
before update on public.organizations
for each row
execute function public.update_updated_at();