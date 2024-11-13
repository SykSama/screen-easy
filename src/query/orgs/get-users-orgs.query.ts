"use server";

import type { Tables } from "@/types/database.generated.types";
import { createClient } from "@/utils/supabase/server";

type MembershipWithOrganizationAndRole = Tables<"organization_memberships"> & {
  organizations: Tables<"organizations">;
  membership_roles: Tables<"membership_roles">;
};

export const getProfileOrgsQuery = async (
  profileId: string,
): Promise<MembershipWithOrganizationAndRole[]> => {
  const supabase = await createClient();

  try {
    const { data } = await supabase
      .from("organization_memberships")
      .select("*, organizations!inner(*), membership_roles!inner(*)")
      .eq("profile_id", profileId)
      .returns<MembershipWithOrganizationAndRole[]>()
      .throwOnError();

    return data ?? [];
  } catch (err) {
    console.error(err);
    throw err;
  }
};
