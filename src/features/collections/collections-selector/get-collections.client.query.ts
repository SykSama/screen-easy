import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import { getOrganizationFromSlugQuery } from "@/queries/orgs/get-organization.query";
import { createClient } from "@/utils/supabase/client";
import type { CollectionSelector } from "./collection-selector.type";

export type getCollectionsClientQueryFilters = {
  search?: string;
};

export type GetCollectionsClientQueryProps = {
  orgSlug: string;
  filters: getCollectionsClientQueryFilters;
};

export const getCollectionsClientQuery = async ({
  orgSlug,
  filters,
}: GetCollectionsClientQueryProps): Promise<CollectionSelector[]> => {
  const supabase = createClient();

  const organization = await getOrganizationFromSlugQuery(orgSlug);

  const query = supabase
    .from("collections")
    .select("id, name, description")
    .eq("organization_id", organization.id);

  if (filters.search) {
    query.ilike("name", `%${filters.search}%`);
  }

  const { data, error } = await query;

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};
