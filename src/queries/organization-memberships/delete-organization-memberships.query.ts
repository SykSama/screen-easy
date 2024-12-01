import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

type DeleteOrganizationMembershipProps = Pick<
  Tables<"organization_memberships">,
  "organization_id" | "profile_id"
>;

export const deleteOrganizationMembershipQuery = async ({
  organization_id,
  profile_id,
}: DeleteOrganizationMembershipProps): Promise<void> => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("organization_memberships")
    .delete()
    .eq("organization_id", organization_id)
    .eq("profile_id", profile_id);

  if (error) throw new SupabasePostgrestActionError(error);
};
