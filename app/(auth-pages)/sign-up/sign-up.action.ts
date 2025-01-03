"use server";

import { action } from "@/lib/actions/safe-actions";
import { ActionError } from "@/lib/errors/errors";
import { createClient } from "@/utils/supabase/server";
import { returnValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";
import { SignUpFormScheme } from "./sign-up-form.schema";

export const signUpAction = action
  .schema(SignUpFormScheme)
  .metadata({
    actionName: "sign-up",
  })
  .action(async ({ parsedInput: { email, password } }) => {
    const supabase = await createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (!error) {
      return redirect("/orgs");
    }

    if (error.code == "email_exists") {
      returnValidationErrors(SignUpFormScheme, {
        email: {
          _errors: ["This email already exists"],
        },
      });
    }

    if (error.code == "email_not_confirmed") {
      returnValidationErrors(SignUpFormScheme, {
        email: {
          _errors: ["This email is not confirmed"],
        },
      });
    }

    if (error.code == "invalid_credentials") {
      throw new ActionError("Invalid email or password");
    }

    throw new ActionError("Unexpected error");
  });
