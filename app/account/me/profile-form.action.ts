"use server";

import { authAction } from "@/lib/actions/safe-actions";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { ProfileFormSchema } from "./profile-form.schema";

export const updateProfileAction = authAction
  .schema(ProfileFormSchema)
  .metadata({ actionName: "updateProfileAction" })
  .action(async ({ parsedInput: { email } }) => {
    const supabase = await createClient();

    const { error } = await supabase.auth.updateUser({
      email: email,
    });

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/account/me");
  });
