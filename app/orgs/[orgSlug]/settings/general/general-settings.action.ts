"use server";

import { action, ActionError } from "@/lib/actions/safe-actions";
import { logger } from "@/lib/logger";
import { updateOrganizationQuery } from "@/query/orgs/update-org.query";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

import {
  DeleteOrgSchema,
  GeneralSettingsFormSchema,
} from "./general-settings-form.schema";

const log = logger.child({
  module: "updateOrgSettingsAction",
});

export const updateOrgSettingsAction = action
  .schema(GeneralSettingsFormSchema)
  .metadata({ actionName: "updateOrgSettingsAction" })
  .action(async ({ parsedInput: { name, orgId } }) => {
    try {
      const org = await updateOrganizationQuery({
        id: orgId,
        organization: { name },
      });

      revalidatePath(`/orgs/${org.slug}`);
    } catch (error) {
      throw new ActionError("Error updating organization", {
        cause: error,
      });
    }
  });

export const deleteOrgAction = action
  .schema(DeleteOrgSchema)
  .action(async ({ parsedInput: { orgId } }) => {
    const supabase = await createClient();

    const { error } = await supabase
      .from("organizations")
      .delete()
      .eq("id", orgId);

    if (error) {
      log.error("Error deleting organization", error);
      throw new Error("Failed to delete organization");
    }

    return { success: true };
  });
