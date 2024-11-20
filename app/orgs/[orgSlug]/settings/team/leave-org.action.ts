"use server";

import { orgAction } from "@/lib/actions/safe-actions";
import { deleteOrganizationMembership } from "@/query/organization-memberships/delete-organization-memberships.query";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { isLastOwner } from "./is-last-owner";
import { redirect } from "next/navigation";

const LeaveOrgSchema = z.object({});

export const leaveOrgAction = orgAction
  .schema(LeaveOrgSchema)
  .metadata({
    actionName: "leaveOrgAction",
    roles: ["OWNER", "MEMBER", "ADMIN"],
  })
  .action(async ({ ctx: { org, user, userOrgRole } }) => {
    if (userOrgRole === "OWNER") {
      await isLastOwner({
        orgId: org.id,
        userId: user.id,
      });
    }

    await deleteOrganizationMembership({
      organizationId: org.id,
      userId: user.id,
    });

    revalidatePath(`/orgs/${org.slug}/settings/team`);
    redirect("/");
  });
