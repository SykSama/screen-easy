import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables, TablesInsert } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export const createOrganizationQuery = async (
  organization: TablesInsert<"organizations">,
): Promise<Tables<"organizations">> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("organizations")
    .insert(organization)
    .select()
    .single();

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};
