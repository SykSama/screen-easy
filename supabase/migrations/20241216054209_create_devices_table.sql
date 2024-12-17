create table public.devices (
    id uuid not null default extensions.uuid_generate_v4(),
    organization_id uuid not null,
    device_group_id uuid null,
    collection_id uuid null,
    device_information_id uuid null,

    name text not null,
    description text null,
    last_ping timestamp with time zone null,
    orientation text not null default 'landscape'::text,
    resolution_width integer null,
    resolution_height integer null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),

    constraint devices_pkey primary key (id),
    constraint devices_organization_id_fkey foreign key (organization_id) references organizations (id) on delete cascade,
    constraint devices_device_group_id_fkey foreign key (device_group_id) references device_groups (id) on delete set null,
    constraint devices_collection_id_fkey foreign key (collection_id) references collections (id) on delete set null,
    constraint devices_device_information_id_fkey foreign key (device_information_id) references device_information (id) on delete set null
);

create index idx_devices_organization_id on public.devices using btree (organization_id);
create index idx_devices_device_group_id on public.devices using btree (device_group_id);
create index idx_devices_collection_id on public.devices using btree (collection_id);

alter table "public"."devices" enable row level security;

create policy "Allow user to select, update, insert device for their organization"
on public.devices
for all
to authenticated
using (
    organization_id in (
        select organization_id
        from public.organization_memberships
        where profile_id = ( select auth.uid() )
    )
)
with check (
    organization_id in (
        select organization_id
        from public.organization_memberships
        where profile_id = ( select auth.uid() )
    )
);

create policy "Allow service account to select, update, insert device for their organization"
on public.devices
for all
to service_account
using (
    organization_id in (
        select organization_id
        from public.service_accounts
        where id = ( select auth.uid() )
    )
)
with check (
    organization_id in (
        select organization_id
        from public.service_accounts
        where id = ( select auth.uid() )
    )
);

-- Function to handle new user and create profiles
create or replace function public.handle_new_device()
returns trigger
language plpgsql
security definer
as $$
begin
  delete from public.device_waiting where device_id = new.id;
  return new;
end;
$$;

create trigger "remove_waiting_device_on_insert"
after insert on "public"."devices"
for each row
execute function "public"."handle_new_device"();

create trigger "set_devices_updated_at"
before update on "public"."devices"
for each row
execute function "public"."update_updated_at"();

create or replace function new_device(device_id uuid, name text)
returns json
language plpgsql
security definer
as $$
declare
  organization_id uuid;
  device_information_id uuid;
  inserted_device json;
begin
    -- Get organization_id and device_information_id from waiting_device
    select 
        w.organization_id,
        w.device_information_id
    into 
        organization_id,
        device_information_id
    from public.device_waiting w
    where w.device_id = device_id;

    if organization_id is null then
        raise exception 'Device not found in waiting list';
    end if;

    -- Insert the new device
    insert into public.devices (
        id,
        name,
        organization_id,
        device_information_id
    )
    values (
        device_id,
        name,
        organization_id,
        device_information_id
    )
    returning row_to_json(devices.*) into inserted_device;

    return inserted_device;
end;
$$;
