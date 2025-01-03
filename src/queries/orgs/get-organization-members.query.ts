import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export type MembersFromOrganization = Pick<
  Tables<"organization_memberships">,
  "organization_id"
> & {
  profiles: Tables<"profiles">;
  membership_roles: Tables<"membership_roles">;
};

export const getOrganizationMembersQuery = async (
  id: string,
  search?: string,
): Promise<MembersFromOrganization[]> => {
  const supabase = await createClient();

  let query = supabase
    .from("organization_memberships")
    .select("organization_id, profiles!inner(*), membership_roles!inner(*)")
    .eq("organization_id", id);

  if (search) {
    query = query.like("profiles.email", `%${search}%`);
  }

  query.returns<MembersFromOrganization[]>();

  const { data, error } = await query;

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};
