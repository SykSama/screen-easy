import { createClient } from "@/utils/supabase/server";

export type UpdateMemberRoleProps = {
  orgId: string;
  userId: string;
  roleId: string;
};

export const updateMemberRoleQuery = async ({
  orgId,
  userId,
  roleId,
}: UpdateMemberRoleProps) => {
  const supabase = await createClient();

  const { data } = await supabase
    .from("organization_memberships")
    .update({ role_id: roleId })
    .eq("organization_id", orgId)
    .eq("profile_id", userId)
    .select()
    .single()
    .throwOnError();

  return data;
};
