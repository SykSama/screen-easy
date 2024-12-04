"use server";

import { CreateCollectionFormSchema } from "@/app/orgs/[orgSlug]/(features)/collections/new/create-collection.schema";
import { orgProfileAction } from "@/lib/actions/safe-actions";
import { createCollectionQuery } from "@/queries/collections/create-collection.query";
import { OrganizationMembershipRole } from "@/queries/orgs/organization.type";
import { redirect } from "next/navigation";

export const createCollectionAction = orgProfileAction
  .schema(CreateCollectionFormSchema)
  .metadata({
    actionName: "createCollectionAction",
    roles: OrganizationMembershipRole.options,
  })
  .action(async ({ parsedInput, ctx: { organization } }) => {
    await createCollectionQuery({
      ...parsedInput,
      organization_id: organization.id,
    });

    redirect(`/orgs/${organization.slug}/collections`);
  });
