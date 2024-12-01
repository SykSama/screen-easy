import { ActionError } from "@/lib/errors/errors";
import type { Tables, TablesInsert } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export type CreateOrgInput = {
  organization: TablesInsert<"organizations">;
};

export const createOrgQuery = async ({
  organization,
}: CreateOrgInput): Promise<Tables<"organizations">> => {
  const supabase = await createClient();

  const { data: org } = await supabase
    .from("organizations")
    .insert(organization)
    .select()
    .single()
    .throwOnError();

  if (!org) {
    throw new ActionError("Failed to create organization");
  }

  return org;
};
