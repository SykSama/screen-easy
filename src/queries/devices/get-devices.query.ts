import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export type GetDevicesInput = Pick<Tables<"devices">, "organization_id"> & {
  search?: string;
};

export const getDevicesQuery = async ({
  organization_id,
  search,
}: GetDevicesInput) => {
  const supabase = await createClient();

  let query = supabase
    .from("devices")
    .select()
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
