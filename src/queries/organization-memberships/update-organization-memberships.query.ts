import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export type UpdateOrganizationMembershipsQueryProps = Pick<
  Tables<"organization_memberships">,
  "organization_id" | "profile_id" | "role_id"
>;

export const updateOrganizationMembershipsQuery = async ({
  organization_id,
  profile_id,
  role_id,
}: UpdateOrganizationMembershipsQueryProps): Promise<
  Tables<"organization_memberships">
> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("organization_memberships")
    .update({ role_id: role_id })
    .eq("organization_id", organization_id)
    .eq("profile_id", profile_id)
    .select()
    .single();

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};
