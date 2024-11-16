import { ActionError } from "@/lib/actions/safe-actions";
import { OrganizationNotFoundError } from "@/lib/errors/errors";
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

  const { data: updatedOrganization, count } = await supabase
    .from("organizations")
    .update(organization)
    .eq("id", id)
    .select()
    .single()
    .throwOnError();

  if (count === 0) {
    throw new ActionError("No rows updated");
  }

  if (!updatedOrganization) {
    throw new OrganizationNotFoundError();
  }

  return updatedOrganization;
};
