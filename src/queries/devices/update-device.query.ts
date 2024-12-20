import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { TablesUpdate } from "@/types";
import { createClient } from "@/utils/supabase/server";

export type UpdateDeviceInput = {
  id: string;
  device: TablesUpdate<"devices">;
};

export const updateDeviceQuery = async ({ id, device }: UpdateDeviceInput) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("devices")
    .update(device)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};
