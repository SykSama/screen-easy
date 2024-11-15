"use server";

import { requiredAuth } from "@/features/auth/helper";
import { action } from "@/lib/actions/safe-actions";

import { logger } from "@/lib/logger";
import { returnValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";
import { NewOrgFormSchema } from "./new-org-form.schema";

const log = logger.child({
  module: "createOrgAction",
});

export const createOrgAction = action
  .schema(NewOrgFormSchema)
  .action(async ({ parsedInput: { name, email, planId } }) => {
    const { user, supabase } = await requiredAuth();

    const { data: org, error: orgError } = await supabase
      .from("organizations")
      .insert({
        name,
        email,
        plan_id: planId,
      })
      .select()
      .single();

    if (orgError) {
      log.error("Error creating organization", orgError);
      returnValidationErrors(NewOrgFormSchema, {
        _errors: ["Unexpected error occurred while creating organization"],
      });
    }

    const { error: membershipError } = await supabase
      .from("organization_memberships")
      .insert({
        organization_id: org.id,
        profile_id: user.id,
        role_id: "OWNER",
      });

    if (membershipError) {
      log.error(`Error creating organization membership ${membershipError}`, {
        error: membershipError,
      });
      returnValidationErrors(NewOrgFormSchema, {
        _errors: ["Failed to setup organization permissions"],
      });
    }

    return redirect(`/orgs/${org.slug}`);
  });
