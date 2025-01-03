import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables, TablesInsert } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export const createMembershipRolesQuery = async (
  membershipRoles: TablesInsert<"membership_roles">,
): Promise<Tables<"membership_roles">[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("membership_roles")
    .insert(membershipRoles)
    .select();

  if (error) throw new SupabasePostgrestActionError(error);

  return data;
};
