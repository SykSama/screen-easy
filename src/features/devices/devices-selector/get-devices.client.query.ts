import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import { getOrganizationFromSlugQuery } from "@/queries/orgs/get-organization.query";
import { createClient } from "@/utils/supabase/client";
import type { DeviceSelector } from "./devices-selector.type";

export type GetDevicesClientQueryFilters = {
  search?: string;
};

export type GetDevicesClientQueryProps = {
  orgSlug: string;
  filters: GetDevicesClientQueryFilters;
};

export const getDevicesClientQuery = async ({
  orgSlug,
  filters,
}: GetDevicesClientQueryProps): Promise<DeviceSelector[]> => {
  const supabase = createClient();

  const organization = await getOrganizationFromSlugQuery(orgSlug);

  const query = supabase
    .from("devices")
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
