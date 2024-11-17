"use server";

import { orgAction } from "@/lib/actions/safe-actions";

import { revalidatePath } from "next/cache";

import { updateMemberRoleQuery } from "../../../../../query/orgs/update-member-role.query";
import { RoleSchema } from "./role.schema";

export const updateRoleAction = orgAction
  .schema(RoleSchema)
  .metadata({ actionName: "updateRole", roles: ["OWNER", "ADMIN"] })
  .action(async ({ parsedInput, ctx: { org } }) => {
    await updateMemberRoleQuery({
      orgId: org.id,
      userId: parsedInput.userId,
      roleId: parsedInput.roleId,
    });

    revalidatePath(`/orgs/${org.slug}/settings/team`);
  });
