"use server";

import { orgAction } from "@/lib/actions/safe-actions";
import { InviteMemberSchema } from "./invite-member.schema";

export const inviteMemberAction = orgAction
  .schema(InviteMemberSchema)
  .metadata({ actionName: "inviteMember", roles: ["OWNER"] })
  .action(async ({ parsedInput }) => {
    console.log("Invite member:", parsedInput);
    // TODO: Implement actual invitation logic
  });
