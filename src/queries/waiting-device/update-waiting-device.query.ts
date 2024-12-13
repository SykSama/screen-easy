import { createClient } from "@/utils/supabase/server";

import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables, TablesUpdate } from "@/types";

export type UpdateWaitingDeviceInput = {
  id: Tables<"device_waiting">["id"];
  device: TablesUpdate<"device_waiting">;
};

export const updateWaitingDeviceQuery = async ({
  device,
  id,
}: UpdateWaitingDeviceInput): Promise<Tables<"device_waiting">> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("device_waiting")
    .update(device)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};
