"use server";

import { orgProfileAction } from "@/lib/actions/safe-actions";
import { createCollectionQuery } from "@/queries/collections/create-collection.query";
import { addMediasToCollectionQuery } from "@/queries/media/add-medias-to-collection.query";
import { OrganizationMembershipRole } from "@/queries/orgs/organization.type";
import { redirect } from "next/navigation";
import { CreateCollectionFormSchema } from "./create-collection.schema";

export const createCollectionAction = orgProfileAction
  .schema(CreateCollectionFormSchema)
  .metadata({
    actionName: "createCollectionAction",
    roles: OrganizationMembershipRole.options,
  })
  .action(async ({ parsedInput, ctx: { organization } }) => {
    const collection = await createCollectionQuery({
      name: parsedInput.name,
      description: parsedInput.description,
      organization_id: organization.id,
    });

    const { medias } = parsedInput;

    await addMediasToCollectionQuery({
      collectionId: collection.id,
      medias: medias.map((media, index) => ({
        media_id: media.id,
        display_order: index,
        duration: media.duration,
      })),
    });

    redirect(`/orgs/${organization.slug}/collections`);
  });
