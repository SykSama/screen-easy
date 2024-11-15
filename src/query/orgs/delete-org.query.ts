import { logger } from "@/lib/logger";
import { createClient } from "@/utils/supabase/server";

const log = logger.child({
  module: "deleteOrganizationQuery",
});

export type DeleteOrganizationQueryProps = {
  id: string;
};

export const deleteOrganizationQuery = async ({
  id,
}: DeleteOrganizationQueryProps): Promise<void> => {
  const supabase = await createClient();

  try {
    await supabase.from("organizations").delete().eq("id", id).throwOnError();
  } catch (error) {
    log.error("Error deleting organization", error);
    throw error;
  }
};
