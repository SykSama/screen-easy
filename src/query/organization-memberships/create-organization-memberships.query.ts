import { ActionError } from "@/lib/actions/safe-actions";
import type { TablesInsert } from "@/types/database.generated.types";
import { createClient } from "@/utils/supabase/server";

export const createOrganizationMembershipsQuery = async (
  organizationMemberships: TablesInsert<"organization_memberships">,
) => {
  const supabase = await createClient();

  const { data: memberships } = await supabase
    .from("organization_memberships")
    .insert(organizationMemberships)
    .select()
    .throwOnError();

  if (!memberships) {
    throw new ActionError("Failed to give user organization permissions");
  }

  return memberships;
};
