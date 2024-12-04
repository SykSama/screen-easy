"use server";

import { orgProfileAction } from "@/lib/actions/safe-actions";
import { createMediaCollectionsQuery } from "@/queries/media/create-media-collections.query";
import { createMediaQuery } from "@/queries/media/create-media.query";
import { OrganizationMembershipRole } from "@/queries/orgs/organization.type";
import { uploadMediaQuery } from "@/queries/storage/upload-media.query";
import { redirect } from "next/navigation";
import { CreateMediaFormSchema } from "./create-media.schema";

export const createMediaAction = orgProfileAction
  .schema(CreateMediaFormSchema)
  .metadata({
    actionName: "createMediaAction",
    roles: OrganizationMembershipRole.options,
  })
  .action(async ({ parsedInput, ctx: { organization } }) => {
    const { name, description, files, collectionIds } = parsedInput;
    const file: File = files[0];

    const { mediaPath, generatedMediaId } = await uploadMediaQuery({
      file,
      organization_id: organization.id,
    });

    const media = await createMediaQuery({
      id: generatedMediaId,
      name,
      description,
      organization_id: organization.id,
      type: file.type.startsWith("image/") ? "image" : "video",
      url: mediaPath,
      file_size: file.size,
    });

    if (collectionIds.length > 0) {
      await createMediaCollectionsQuery({
        media_id: media.id,
        collection_ids: collectionIds,
      });
    }

    redirect(`/orgs/${organization.slug}/medias`);
  });
