"use server";

import { action } from "@/lib/actions/safe-actions";
import { createClient } from "@/utils/supabase/server";
import { returnValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";
import { SignInFormScheme } from "./sign-in-form.schema";

export const signInAction = action
  .schema(SignInFormScheme)
  .action(async ({ parsedInput: { email, password } }) => {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      return redirect("/orgs");
    }

    if (error.code == "email_exists") {
      returnValidationErrors(SignInFormScheme, {
        email: {
          _errors: ["Email already exists"],
        },
      });
    }

    if (error.code == "email_not_confirmed") {
      returnValidationErrors(SignInFormScheme, {
        email: {
          _errors: ["Email not confirmed"],
        },
      });
    }

    if (error.code == "invalid_credentials") {
      returnValidationErrors(SignInFormScheme, {
        _errors: ["Invalid email or password"],
      });
    }

    returnValidationErrors(SignInFormScheme, {
      _errors: ["Unexpected error"],
    });
  });
