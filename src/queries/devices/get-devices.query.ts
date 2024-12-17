import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export type GetDevicesInput = Pick<Tables<"devices">, "organization_id"> & {
  search?: string;
};

export type GetDevicesOutput = Tables<"devices"> & {
  // This should not be null, but i don't want to put an !inner in the database query i case of
  device_information: Tables<"device_information"> | null;
  collections: Pick<Tables<"collections">, "name" | "description"> | null;
};

export const getDevicesQuery = async ({
  organization_id,
  search,
}: GetDevicesInput): Promise<GetDevicesOutput[]> => {
  const supabase = await createClient();

  let query = supabase
    .from("devices")
    .select("*, device_information(*), collections(name, description)")
    .eq("organization_id", organization_id)
    .order("created_at", { ascending: false });

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};
