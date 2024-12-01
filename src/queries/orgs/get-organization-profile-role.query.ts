import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";
import type { OrganizationMembershipRole } from "./organization.type";

type GetOrganizationProfileRoleProps = Pick<
  Tables<"organization_memberships">,
  "profile_id"
> & {
  roles: OrganizationMembershipRole[];
} & Pick<Tables<"organizations">, "slug">;

export const getOrganizationProfileRoleQuery = async ({
  profile_id,
  slug,
  roles,
}: GetOrganizationProfileRoleProps): Promise<{
  organization: Tables<"organizations">;
  profile: Tables<"profiles">;
  role: Tables<"membership_roles">;
}> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("organization_memberships")
    .select(
      "*, organizations!inner(*), membership_roles!inner(*), profiles!inner(*)",
    )
    .eq("profile_id", profile_id)
    .eq("organizations.slug", slug)
    .in("role_id", roles)
    .limit(1)
    .single();

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return {
    organization: data.organizations,
    profile: data.profiles,
    role: data.membership_roles,
  };
};
