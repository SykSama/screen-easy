create table public.organization_memberships (
    role_id text not null references public.membership_roles(id),
    profile_id uuid not null references public.profiles(id),
    organization_id uuid not null references public.organizations(id),
    created_at timestamp with time zone not null default current_timestamp,
    updated_at timestamp with time zone not null default current_timestamp,
    primary key (role_id, profile_id, organization_id)
);

create trigger update_updated_at
before update on public.organization_memberships
for each row
execute function public.update_updated_at();
