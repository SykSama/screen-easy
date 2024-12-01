import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables, TablesInsert } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export const createOrganizationMembershipsQuery = async (
  organizationMemberships: TablesInsert<"organization_memberships">,
): Promise<Tables<"organization_memberships">[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("organization_memberships")
    .insert(organizationMemberships)
    .select();

  if (error) throw new SupabasePostgrestActionError(error);

  return data;
};
