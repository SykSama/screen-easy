create table public.profiles (
    id uuid not null,
    email text not null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),

    constraint profiles_pkey primary key (id),
    constraint profiles_id_fkey foreign key (id) references auth.users (id) on delete cascade
);

-- RLS
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles 
  for select
  to anon, authenticated
  using ( true );

create policy "Users can update their own profiles."
  on profiles 
  for update
  to anon, authenticated
  using ( (select auth.uid()) = id );

create policy "Users can insert their own profiles."
  on profiles 
  for insert
  to anon, authenticated
  with check ( (select auth.uid()) = user_id);

-- Function for profiles
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);

  return new;
end;
$$;

create or replace function public.handle_update_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  update public.profiles
  set email = new.email
  where id = new.id;

  return new;
end;
$$;

-- Profiles trigger
create trigger on_auth_user_created
after insert on auth.users
for each row
when (coalesce((new.raw_user_meta_data ->> 'service_account')::boolean, false) = false)
execute function public.handle_new_user();

create trigger on_auth_user_updated
after update on auth.users
for each row
when (coalesce((new.raw_user_meta_data ->> 'service_account')::boolean, false) = false)
execute function public.handle_update_user();

create trigger update_updated_at
before update on public.profiles
for each row
execute function public.update_updated_at();
