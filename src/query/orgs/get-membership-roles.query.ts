import type { Tables } from "@/types/database.generated.types";
import { createClient } from "@/utils/supabase/server";

export const getMembershipRolesQuery = async (): Promise<
  Tables<"membership_roles">[]
> => {
  const supabase = await createClient();

  const { data: roles } = await supabase
    .from("membership_roles")
    .select("*")
    .throwOnError();

  return roles ?? [];
};
