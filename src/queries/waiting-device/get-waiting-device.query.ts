import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables } from "@/types";
import { createClient } from "@/utils/supabase/server";

export const getWaitingDeviceQuery = async (
  otp_code: Tables<"device_waiting">["otp_code"],
): Promise<Tables<"device_waiting">> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("device_waiting")
    .select()
    .eq("otp_code", otp_code)
    .single();

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};
