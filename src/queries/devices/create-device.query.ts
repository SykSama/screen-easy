import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables, TablesInsert } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export const createDeviceQuery = async (
  device: TablesInsert<"devices">,
): Promise<Tables<"devices">[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("devices")
    .insert(device)
    .select();

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};
