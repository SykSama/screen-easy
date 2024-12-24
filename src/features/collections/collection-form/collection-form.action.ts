"use server";

import { orgProfileAction } from "@/lib/actions/safe-actions";

import { upsertCollectionQuery } from "@/queries/collections/upsert-collection.query";
import { deleteMediasFromCollectionQuery } from "@/queries/media/delete-medias-from-collection.query";
import { upsertMediasToCollectionQuery } from "@/queries/media/upsert-medias-to-collection.query";
import { OrganizationMembershipRole } from "@/queries/orgs/organization.type";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CollectionFormSchema } from "./collection-form.schema";

//TODO: [AR] Put this in rpc function because a lot of db queries are done here
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
        resize_mode: media.resize_mode,
      })),
    });

    // If it's an update, we need to delete the medias that are not in the parsedInput
    await deleteMediasFromCollectionQuery({
      collectionId: collection.id,
      mediasToNotDeleteIds: collectionMedias.map((media) => media.media_id),
    });

    revalidatePath(`/orgs/${organization.slug}/collections`);
    redirect(`/orgs/${organization.slug}/collections`);
  });
