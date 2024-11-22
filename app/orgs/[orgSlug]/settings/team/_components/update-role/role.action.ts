"use server";

import { orgProfileAction } from "@/lib/actions/safe-actions";

import { revalidatePath } from "next/cache";

import { updateMemberRoleQuery } from "@/query/orgs/update-member-role.query";

import { z } from "zod";

const RoleSchema = z.object({
  userId: z.string(),
  roleId: z.string(),
});

export const updateRoleAction = orgProfileAction
  .schema(RoleSchema)
  .metadata({ actionName: "updateRole", roles: ["OWNER", "ADMIN"] })
  .action(async ({ parsedInput, ctx: { organization } }) => {
    await updateMemberRoleQuery({
      orgId: organization.id,
      userId: parsedInput.userId,
      roleId: parsedInput.roleId,
    });

    revalidatePath(`/orgs/${organization.slug}/settings/team`);
  });
