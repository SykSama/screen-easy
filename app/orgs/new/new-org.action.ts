"use server";

import { requiredAuth } from "@/features/auth/helper";
import { action } from "@/lib/actions/safe-actions";
import { returnValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";
import { NewOrgFormSchema } from "./new-org-form.schema";

export const createOrgAction = action
  .schema(NewOrgFormSchema)
  .action(async ({ parsedInput: { name, email, slug } }) => {
    const { user, supabase } = await requiredAuth();

    const { data: org, error: orgError } = await supabase
      .from("organizations")
      .insert({
        name,
        email,
        slug,
      })
      .select()
      .single();

    if (orgError) {
      console.error("Error creating organization", orgError);

      if (orgError.code === "23505") {
        returnValidationErrors(NewOrgFormSchema, {
          slug: {
            _errors: ["This slug is already taken"],
          },
        });
      }
      returnValidationErrors(NewOrgFormSchema, {
        _errors: ["Unexpected error occurred while creating organization"],
      });
    }

    const { error: membershipError } = await supabase
      .from("organization_memberships")
      .insert({
        organization_id: org.id,
        profile_id: user.id,
        role_id: "owner",
      });

    if (membershipError) {
      console.error("Error creating organization membership", membershipError);

      returnValidationErrors(NewOrgFormSchema, {
        _errors: ["Failed to setup organization permissions"],
      });
    }

    return redirect(`/orgs/${slug}`);
  });
