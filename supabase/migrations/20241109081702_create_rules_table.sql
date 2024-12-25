/** 
* Rules
* Note: rules need to be manualy edited in the database.
*/
create table rules (
  -- Product ID from Stripe, e.g. prod_1234.
  product_id text primary key references public.products(id) on delete cascade,

  -- Rate limiting number of collections. null means unlimited.
  collections_allowed integer,

  -- Rate limiting number of screens. null means unlimited.
  screens_allowed integer,

  -- Rate limiting number of medias per collection. null means unlimited.
  medias_per_collection_allowed integer,

  -- Created at timestamp
  created_at timestamp with time zone not null default current_timestamp,

  -- Updated at timestamp
  updated_at timestamp with time zone not null default current_timestamp
);

alter table rules enable row level security;
create policy "Allow public read-only access." on rules for select using (true);

create trigger update_rules_updated_at
before update on public.rules
for each row
execute function public.update_updated_at();