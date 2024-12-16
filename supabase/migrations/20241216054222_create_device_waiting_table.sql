create table public.device_waiting (
    id uuid not null default gen_random_uuid(),
    nanoid character(6) not null default nanoid (6, 'abcdefghijklmnopqrstuvwxyz0123456789'::text),
    organization_id uuid null,
    organization_email text null,
    sign_in_otp_code text null,
    device_information_id uuid null,

    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),

    constraint device_waiting_pkey primary key (id),
    constraint device_waiting_nanoid_key unique (nanoid),
    constraint device_waiting_organization_id_fkey foreign key (organization_id) references organizations (id) on delete cascade,
    constraint device_waiting_device_information_id_fkey foreign key (device_information_id) references device_information (id) on delete set null
  );

create unique index "idx_device_waiting_nanoid" on public.device_waiting using btree ("nanoid");
create index "idx_device_waiting_organization_id" on public.device_waiting using btree ("organization_id");
create index "idx_device_waiting_device_information_id" on public.device_waiting using btree ("device_information_id");

alter publication supabase_realtime add table public.device_waiting;

alter table public.device_waiting enable row level security;

create policy "Device waiting is accessible by everyone" on public.device_waiting 
for all
using (true);

create trigger update_updated_at
before update on public.device_waiting
for each row
execute function public.update_updated_at();