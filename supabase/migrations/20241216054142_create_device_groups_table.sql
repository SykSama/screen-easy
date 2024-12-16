create table public.device_groups (
    id uuid not null default extensions.uuid_generate_v4 (),
    organization_id uuid not null,
    name text not null,
    description text null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),

    constraint device_groups_pkey primary key (id),
    constraint device_groups_organization_id_fkey foreign key (organization_id) references organizations (id) on delete cascade
  );

create index if not exists idx_device_groups_organization_id on public.device_groups using btree (organization_id);

alter table "public"."device_groups" enable row level security;

create policy "Enable select, insert, update for organization members"
on "public"."device_groups"
for all
using (
    organization_id in (
        select organization_id
        from public.organization_memberships
        where profile_id = (select auth.uid())
    )
)
with check (
    organization_id in (
        select organization_id
        from public.organization_memberships
        where profile_id = ( select auth.uid() )
    )
);

create trigger set_device_groups_updated_at before
update on device_groups for each row
execute function update_updated_at ();