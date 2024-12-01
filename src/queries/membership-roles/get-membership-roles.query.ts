import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export const getMembershipRolesQuery = async (): Promise<
  Tables<"membership_roles">[]
> => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("membership_roles").select();

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};
