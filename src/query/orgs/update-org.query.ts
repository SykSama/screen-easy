import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables, TablesUpdate } from "@/types/database.generated.types";
import { createClient } from "@/utils/supabase/server";

export type UpdateOrganizationQueryProps = {
  id: string;
  organization: TablesUpdate<"organizations">;
};

export const updateOrganizationQuery = async ({
  id,
  organization,
}: UpdateOrganizationQueryProps): Promise<Tables<"organizations">> => {
  const supabase = await createClient();

  const { data: updatedOrganization, error } = await supabase
    .from("organizations")
    .update(organization)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return updatedOrganization;
};
