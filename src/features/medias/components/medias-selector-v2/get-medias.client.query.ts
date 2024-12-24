import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import { getOrganizationFromSlugQuery } from "@/queries/orgs/get-organization.query";
import { createClient } from "@/utils/supabase/client";
import type { MediasSelector } from "./medias-selector.type";

export type GetMediasClientQueryFilters = {
  search?: string;
};

export type GetMediasClientQueryProps = {
  orgSlug: string;
  filters: GetMediasClientQueryFilters;
};

export const getMediasClientQuery = async ({
  orgSlug,
  filters,
}: GetMediasClientQueryProps): Promise<MediasSelector[]> => {
  const supabase = createClient();

  const organization = await getOrganizationFromSlugQuery(orgSlug);

  const query = supabase
    .from("media")
    .select("id, name, description, path")
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
