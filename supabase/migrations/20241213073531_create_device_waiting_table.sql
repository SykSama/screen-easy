create table public.device_waiting (
    id uuid not null primary key default gen_random_uuid(),
    otp_code text not null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),

    -- Used to sign in the screen
    organization_id uuid references public.organizations on delete cascade,
    organization_email text,
    sign_in_otp_code text
);

alter table public.device_waiting enable row level security;

create policy "Device waiting is accessible by everyone" on public.device_waiting 
for all
using (true);

-- Add the table to the realtime publication
alter publication supabase_realtime add table public.device_waiting;

create trigger update_updated_at
before update on public.device_waiting
for each row
execute function public.update_updated_at();