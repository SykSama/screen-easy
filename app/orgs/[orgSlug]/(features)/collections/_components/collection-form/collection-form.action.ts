"use server";

import { orgProfileAction } from "@/lib/actions/safe-actions";

import { upsertCollectionQuery } from "@/queries/collections/upsert-collection.query";
import { deleteMediasFromCollectionQuery } from "@/queries/media/delete-medias-from-collection.query";
import { upsertMediasToCollectionQuery } from "@/queries/media/upsert-medias-to-collection.query";
import { OrganizationMembershipRole } from "@/queries/orgs/organization.type";
import { redirect } from "next/navigation";
import { CollectionFormSchema } from "./collection-form.schema";

export const collectionFormAction = orgProfileAction
  .schema(CollectionFormSchema)
  .metadata({
    actionName: "collectionFormAction",
    roles: OrganizationMembershipRole.options,
  })
  .action(async ({ parsedInput, ctx: { organization } }) => {
    const collection = await upsertCollectionQuery({
      id: parsedInput.id,
      name: parsedInput.name,
      description: parsedInput.description,
      organization_id: organization.id,
    });

    const { medias } = parsedInput;

    const collectionMedias = await upsertMediasToCollectionQuery({
      collectionId: collection.id,
      medias: medias.map((media, index) => ({
        media_id: media.id,
        display_order: index,
        duration: media.duration,
      })),
    });

    // If it's an update, we need to delete the medias that are not in the parsedInput
    await deleteMediasFromCollectionQuery({
      collectionId: collection.id,
      mediasToNotDeleteIds: collectionMedias.map((media) => media.media_id),
    });

    redirect(`/orgs/${organization.slug}/collections`);
  });
