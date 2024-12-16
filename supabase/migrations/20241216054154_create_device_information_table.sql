create table public.device_information (
    id uuid not null default extensions.uuid_generate_v4(),

    device_brand text null,
    device_name text null,
    device_os text null,
    device_os_version text null,
    screen_width double precision null,
    screen_height double precision null,
    screen_scale double precision null,

    constraint device_information_pkey primary key (id)
);

alter table public.device_information enable row level security;

create policy "Device information can be selected, inserted, updated, and deleted by everyone" 
on public.device_information
for all
to authenticated, anon
using (true)
with check (true);