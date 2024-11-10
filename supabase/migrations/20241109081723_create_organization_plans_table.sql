create table public.organization_plans (
    id text primary key,
    name text not null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now()
);

alter table public.organization_plans enable row level security;

create policy "Organization plans are viewable by everyone."
  on organization_plans for select
  using ( true );

create trigger update_updated_at
before update on public.organization_plans
for each row
execute function public.update_updated_at();
