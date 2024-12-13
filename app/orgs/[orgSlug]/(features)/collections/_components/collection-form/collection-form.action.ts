"use server";

import { orgProfileAction } from "@/lib/actions/safe-actions";

import { upsertCollectionQuery } from "@/queries/collections/upsert-collection.query";
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

    await upsertMediasToCollectionQuery({
      collectionId: collection.id,
      medias: medias.map((media, index) => ({
        media_id: media.id,
        display_order: index,
        duration: media.duration,
      })),
    });

    redirect(`/orgs/${organization.slug}/collections`);
  });
