"use server";

import { orgAction } from "@/lib/actions/safe-actions";
import { logger } from "@/lib/logger";
import { getServerUrl } from "@/utils/server-url";
import { createAdminClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { InviteMemberSchema } from "./invite-member.schema";

export const inviteMemberAction = orgAction
  .schema(InviteMemberSchema)
  .metadata({ actionName: "inviteMember", roles: ["OWNER"] })
  .action(async ({ parsedInput: { email, roleId }, ctx: { org } }) => {
    const supabase = await createAdminClient();

    const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
      redirectTo: `${getServerUrl()}/reset-password`,
      data: {},
    });

    if (error) {
      logger.error(error);
      throw error;
    }

    await supabase.from("organization_memberships").insert({
      organization_id: org.id,
      profile_id: data.user.id,
      role_id: roleId,
    });

    revalidatePath(`/orgs/${org.slug}/settings/team`);
  });
