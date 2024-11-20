"use server";

import { authAction } from "@/lib/actions/safe-actions";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ResetPasswordSchema } from "./reset-password.schema";

export const resetPasswordAction = authAction
  .schema(ResetPasswordSchema)
  .metadata({
    actionName: "resetPassword",
  })
  .action(async ({ parsedInput: { password } }) => {
    const supabase = await createClient();

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      throw error;
    }

    return redirect("/orgs");
  });
