"use server";

import { requiredAuth } from "@/features/auth/helper";
import { action } from "@/lib/actions/safe-actions";
import { logger } from "@/lib/logger";
import { returnValidationErrors } from "next-safe-action";
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
  .action(async ({ parsedInput: { name, orgId } }) => {
    const { supabase } = await requiredAuth();

    log.info(`Updating organization ${name} with id ${orgId}`);

    const { data: org, error } = await supabase
      .from("organizations")
      .update({ name })
      .eq("id", orgId)
      .select()
      .single();

    if (error) {
      log.error("Error updating organization", error);
      returnValidationErrors(GeneralSettingsFormSchema, {
        _errors: ["Unexpected error occurred while updating organization"],
      });
    }

    revalidatePath(`/orgs/${org.slug}`);

    return { success: "Organization updated successfully" };
  });

export const deleteOrgAction = action
  .schema(DeleteOrgSchema)
  .action(async ({ parsedInput: { orgId } }) => {
    const { supabase } = await requiredAuth();

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
