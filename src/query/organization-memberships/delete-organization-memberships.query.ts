import { createClient } from "@/utils/supabase/server";

type DeleteOrganizationMembershipParams = {
  organizationId: string;
  userId: string;
};

export const deleteOrganizationMembership = async ({
  organizationId,
  userId,
}: DeleteOrganizationMembershipParams) => {
  const supabase = await createClient();

  await supabase
    .from("organization_memberships")
    .delete()
    .eq("organization_id", organizationId)
    .eq("profile_id", userId)
    .throwOnError();
};
