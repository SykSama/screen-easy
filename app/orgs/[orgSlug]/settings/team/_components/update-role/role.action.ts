"use server";

import { orgProfileAction } from "@/lib/actions/safe-actions";
import { updateOrganizationMembershipsQuery } from "@/queries/organization-memberships/update-organization-memberships.query";

import { revalidatePath } from "next/cache";

import { z } from "zod";

const RoleSchema = z.object({
  userId: z.string(),
  roleId: z.string(),
});

export const updateRoleAction = orgProfileAction
  .schema(RoleSchema)
  .metadata({ actionName: "updateRole", roles: ["OWNER", "ADMIN"] })
  .action(async ({ parsedInput, ctx: { organization } }) => {
    await updateOrganizationMembershipsQuery({
      organization_id: organization.id,
      profile_id: parsedInput.userId,
      role_id: parsedInput.roleId,
    });

    revalidatePath(`/orgs/${organization.slug}/settings/team`);
  });
