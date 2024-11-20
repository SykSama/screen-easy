import type { TablesInsert } from "@/types/database.generated.types";
import { createClient } from "@/utils/supabase/server";

export const createMembershipRolesQuery = async (
  membershipRoles: TablesInsert<"membership_roles">,
) => {
  const supabase = await createClient();

  const { data: roles } = await supabase
    .from("membership_roles")
    .insert(membershipRoles)
    .select()
    .throwOnError();

  return roles;
};
