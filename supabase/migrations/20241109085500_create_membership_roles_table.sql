create table public.membership_roles (
    id text primary key,
    name text not null
);

alter table public.membership_roles enable row level security;

create policy "Membership roles are viewable by everyone."
  on membership_roles for select
  using ( true );