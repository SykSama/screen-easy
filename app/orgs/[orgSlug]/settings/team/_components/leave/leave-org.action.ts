"use server";

import { orgProfileAction } from "@/lib/actions/safe-actions";
import { deleteOrganizationMembershipQuery } from "@/queries/organization-memberships/delete-organization-memberships.query";

import { OrganizationMembershipRole } from "@/queries/orgs/organization.type";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { isLastOwner } from "./is-last-owner";

const LeaveOrgSchema = z.object({});

export const leaveOrgAction = orgProfileAction
  .schema(LeaveOrgSchema)
  .metadata({
    actionName: "leaveOrgAction",
    roles: OrganizationMembershipRole.options,
  })
  .action(async ({ ctx: { organization, profile } }) => {
    if (profile.role.id === "OWNER") {
      await isLastOwner({
        orgId: organization.id,
        userId: profile.id,
      });
    }

    await deleteOrganizationMembershipQuery({
      organization_id: organization.id,
      profile_id: profile.id,
    });

    revalidatePath(`/orgs/${organization.slug}/settings/team`);
    redirect("/");
  });
