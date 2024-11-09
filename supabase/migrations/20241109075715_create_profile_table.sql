-- Table for profiles
create table public.profiles (
    id uuid not null references auth.users (id) on delete cascade,
    created_at timestamp with time zone not null default now(),
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
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;

-- Trigger to handle new user and create profile
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();