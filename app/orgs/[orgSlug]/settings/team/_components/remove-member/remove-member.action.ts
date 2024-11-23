"use server";

import { orgProfileAction } from "@/lib/actions/safe-actions";
import { ActionError } from "@/lib/errors/errors";
import { deleteOrganizationMembership } from "@/query/organization-memberships/delete-organization-memberships.query";
import { OrganizationMembershipRole } from "@/query/orgs/orgs.type";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const RemoveMemberSchema = z.object({
  memberId: z.string(),
});

export const removeMemberAction = orgProfileAction
  .schema(RemoveMemberSchema)
  .metadata({ actionName: "removeMemberAction", roles: ["OWNER", "ADMIN"] })
  .action(
    async ({ parsedInput: { memberId }, ctx: { organization, profile } }) => {
      const supabase = await createClient();

      const { data: members } = await supabase
        .from("organization_memberships")
        .select("profile_id, role_id")
        .eq("organization_id", organization.id)
        .in("profile_id", [profile.id, memberId]);

      const { data: owners } = await supabase
        .from("organization_memberships")
        .select("profile_id, role_id")
        .eq("organization_id", organization.id)
        .eq("role_id", OrganizationMembershipRole.Enum.OWNER);

      if (!members) {
        throw new ActionError("Failed to fetch members");
      }

      const memberToDelete = members.find(
        (member) => member.profile_id !== profile.id,
      );

      if (!memberToDelete) {
        throw new ActionError("Member to delete not found");
      }

      const memberWhoDelete = members.find(
        (member) => member.profile_id === profile.id,
      );

      if (!memberWhoDelete) {
        throw new ActionError(
          "You are not known as a member of this organization",
        );
      }

      if (
        memberWhoDelete.role_id === "ADMIN" &&
        memberToDelete.role_id === "OWNER"
      ) {
        throw new ActionError("An admin can't delete a owner");
      }

      if (
        memberToDelete.role_id === "OWNER" &&
        (!owners || owners.length <= 1)
      ) {
        throw new ActionError("You can't delete the last owner");
      }

      await deleteOrganizationMembership({
        organizationId: organization.id,
        userId: memberToDelete.profile_id,
      });

      revalidatePath(`/orgs/${organization.slug}/settings/team`);
    },
  );
