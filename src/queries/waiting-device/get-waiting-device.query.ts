import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables } from "@/types";
import { createClient } from "@/utils/supabase/server";

export const getWaitingDeviceQuery = async (
  nanoid: Tables<"device_waiting">["nanoid"],
): Promise<Tables<"device_waiting">> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("device_waiting")
    .select()
    .eq("nanoid", nanoid)
    .single();

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};
