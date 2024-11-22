"use server";

import { orgProfileAction } from "@/lib/actions/safe-actions";
import { logger } from "@/lib/logger";
import { getServerUrl } from "@/utils/server-url";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { revalidatePath } from "next/cache";
import { InviteMemberSchema } from "./invite-member.schema";

export const inviteMemberAction = orgProfileAction
  .schema(InviteMemberSchema)
  .metadata({ actionName: "inviteMember", roles: ["OWNER"] })
  .action(async ({ parsedInput: { email, roleId }, ctx: { organization } }) => {
    const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(
      email,
      {
        redirectTo: `${getServerUrl()}/reset-password`,
        data: {},
      },
    );

    if (error) {
      logger.error(error);
      throw error;
    }

    await supabaseAdmin.from("organization_memberships").insert({
      organization_id: organization.id,
      profile_id: data.user.id,
      role_id: roleId,
    });

    revalidatePath(`/orgs/${organization.slug}/settings/team`);
  });
