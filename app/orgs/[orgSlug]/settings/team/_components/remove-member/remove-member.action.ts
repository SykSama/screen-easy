"use server";

import { ActionError, orgAction } from "@/lib/actions/safe-actions";
import { deleteOrganizationMembership } from "@/query/organization-memberships/delete-organization-memberships.query";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const RemoveMemberSchema = z.object({
  memberId: z.string(),
});

export const removeMemberAction = orgAction
  .schema(RemoveMemberSchema)
  .metadata({ actionName: "removeMemberAction", roles: ["OWNER", "ADMIN"] })
  .action(async ({ parsedInput: { memberId }, ctx: { org, user } }) => {
    const supabase = await createClient();

    const { data: members } = await supabase
      .from("organization_memberships")
      .select("profile_id, role_id")
      .eq("organization_id", org.id)
      .in("profile_id", [user.id, memberId]);

    const { data: owners } = await supabase
      .from("organization_memberships")
      .select("profile_id, role_id")
      .eq("organization_id", org.id)
      .in("role_id", ["OWNER"]);

    if (!members) {
      throw new ActionError("Failed to fetch members");
    }

    const memberToDelete = members.find(
      (member) => member.profile_id !== user.id,
    );

    if (!memberToDelete) {
      throw new ActionError("Member to delete not found");
    }

    const memberWhoDelete = members.find(
      (member) => member.profile_id === user.id,
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

    if (memberToDelete.role_id === "OWNER" && (!owners || owners.length <= 1)) {
      throw new ActionError("You can't delete the last owner");
    }

    await deleteOrganizationMembership({
      organizationId: org.id,
      userId: memberToDelete.profile_id,
    });

    revalidatePath(`/orgs/${org.slug}/settings/team`);
  });
