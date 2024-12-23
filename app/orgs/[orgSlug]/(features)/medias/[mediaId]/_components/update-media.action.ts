"use server";

import { orgProfileAction } from "@/lib/actions/safe-actions";
import { updateMediaQuery } from "@/queries/media/update-media.query";
import { OrganizationMembershipRole } from "@/queries/orgs/organization.type";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UpdateMediaFormSchema } from "./update-media.schema";

export const updateMediaAction = orgProfileAction
  .schema(UpdateMediaFormSchema)
  .metadata({
    actionName: "updateMediaAction",
    roles: OrganizationMembershipRole.options,
  })
  .action(async ({ parsedInput, ctx: { organization } }) => {
    const { id, collectionIds, ...data } = parsedInput;

    await updateMediaQuery({
      id,
      data: {
        ...data,
        organization_id: organization.id,
      },
      collectionIds,
    });

    revalidatePath(`/orgs/${organization.slug}/medias`);
    redirect(`/orgs/${organization.slug}/medias`);
  });
