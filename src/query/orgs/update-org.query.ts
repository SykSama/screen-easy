import { logger } from "@/lib/logger";
import type { Tables, TablesUpdate } from "@/types/database.generated.types";
import { createClient } from "@/utils/supabase/server";

class NotFoundError extends Error {}

const log = logger.child({
  module: "updateOrganizationQuery",
});

export type UpdateOrganizationQueryProps = {
  id: string;
  organization: TablesUpdate<"organizations">;
};

export const updateOrganizationQuery = async ({
  id,
  organization,
}: UpdateOrganizationQueryProps): Promise<Tables<"organizations">> => {
  const supabase = await createClient();

  try {
    const { data: updatedOrganization } = await supabase
      .from("organizations")
      .update(organization)
      .eq("id", id)
      .select()
      .single()
      .throwOnError();

    if (!updatedOrganization) {
      throw new NotFoundError("Organization not found");
    }

    return updatedOrganization;
  } catch (error) {
    log.error("Error updating organization", error);
    throw error;
  }
};
