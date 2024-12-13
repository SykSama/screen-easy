create table public.profiles (
    id uuid not null references auth.users on delete cascade,
    email text not null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    primary key (id)
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profiles."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update their own profiles."
  on profiles for update
  using ( auth.uid() = id );

-- Function to handle new user and create profiles
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

-- Function to handle update user and update profiles
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

-- Trigger to handle new user and create profile
create trigger on_auth_user_created
after insert on auth.users
for each row
when (NEW.raw_user_meta_data->>'service_account' is null)
execute function public.handle_new_user();

-- Trigger to handle update user and update profile
create trigger on_auth_user_updated
after update on auth.users
for each row
when (NEW.raw_user_meta_data->>'service_account' is null)
execute function public.handle_update_user();

create trigger update_updated_at
before update on public.profiles
for each row
execute function public.update_updated_at();
