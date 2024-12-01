import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

type ProfileWithOrganizationAndRole = Tables<"organization_memberships"> & {
  organizations: Tables<"organizations">;
  membership_roles: Tables<"membership_roles">;
};

export type GetProfileOrganizationsRolesQueryProps = Pick<
  Tables<"organization_memberships">,
  "profile_id"
>;

//TODO: For now, i don't care about the performance, but this query should be cached when called in the layout `orgs/[orgSlug]/layout.tsx`
export const getProfileOrganizationsRolesQuery = async ({
  profile_id,
}: GetProfileOrganizationsRolesQueryProps): Promise<
  ProfileWithOrganizationAndRole[]
> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("organization_memberships")
    .select("*, organizations!inner(*), membership_roles!inner(*)")
    .eq("profile_id", profile_id)
    .returns<ProfileWithOrganizationAndRole[]>();

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};
