-- create collections table
create table public.collections (
    id uuid default extensions.uuid_generate_v4() not null,
    organization_id uuid not null,
    name text not null,
    description text,
    is_active boolean default true not null,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null,

    constraint collections_pkey primary key (id),
    constraint collections_organization_id_fkey foreign key (organization_id) references public.organizations(id) on delete cascade
);

-- create collection_media table (junction table between collections and media)
create table public.collection_media (
    collection_id uuid not null,
    media_id uuid not null,
    display_order integer not null,
    duration integer default 10000 not null, -- display duration in milliseconds
    display_from timestamp with time zone, -- start date for displaying the media (null means no start restriction)
    display_until timestamp with time zone, -- end date for displaying the media (null means no end restriction)
    created_at timestamp with time zone default now() not null,

    constraint collection_media_pkey primary key (collection_id, media_id),
    constraint collection_media_collection_id_fkey foreign key (collection_id) references public.collections(id) on delete cascade,
    constraint collection_media_media_id_fkey foreign key (media_id) references public.media(id) on delete cascade,
    constraint collection_media_date_range_check check (
        (display_from is null and display_until is null) or -- no date restriction
        (display_from is null and display_until is not null) or -- only end date
        (display_from is not null and display_until is null) or -- only start date
        (display_from < display_until) -- valid date range
    )
);

-- create indexes
create index idx_collections_organization_id on public.collections(organization_id);

create index idx_collection_media_collection_id on public.collection_media(collection_id);
create index idx_collection_media_media_id on public.collection_media(media_id);
create index idx_collection_media_display_dates on public.collection_media(display_from, display_until);

-- create updated_at triggers
create trigger update_collections_updated_at
    before update on public.collections
    for each row
    execute function public.update_updated_at();

-- add rls policies
alter table public.collections enable row level security;
alter table public.collection_media enable row level security;

-- create policies
create policy "allow organization access to collections"
    on collections 
    for all
    to authenticated
    using (
        organization_id in (
            select organization_id
            from public.organization_memberships
            where profile_id = (select auth.uid())
        )
    );

create policy "allow organization access to collection_media"
    on collection_media
    for all
    to authenticated
    using (
        organization_id in (
            select id
            from public.collections
            where organization_id in (
                select organization_id
                from public.organization_memberships
                where profile_id = (select auth.uid())
            )
        )
    );

create policy "allow service account access to collections"
    on collections
    for select
    to service_account
    using (
        organization_id in (
            select organization_id
            from public.service_accounts
            where id = auth.uid()
        )
    );

create policy "allow service account access to collection_media"
    on collection_media
    for select
    to service_account
    using (
        collection_id in (
            select id
            from public.collections
            where organization_id in (
                select organization_id
                from public.service_accounts
                where id = auth.uid()
            )
        )
    );
