"use server";

import { orgProfileAction } from "@/lib/actions/safe-actions";
import { updateOrganizationQuery } from "@/queries/orgs/update-org.query";
import { revalidatePath } from "next/cache";

import { deleteOrganizationQuery } from "@/queries/orgs/delete-org.query";
import {
  DeleteOrgSchema,
  GeneralSettingsFormSchema,
} from "./general-settings-form.schema";

export const updateOrgSettingsAction = orgProfileAction
  .schema(GeneralSettingsFormSchema)
  .metadata({ actionName: "updateOrgSettingsAction", roles: ["OWNER"] })
  .action(async ({ parsedInput: { name }, ctx: { organization } }) => {
    const updatedOrg = await updateOrganizationQuery({
      id: organization.id,
      organization: { name },
    });

    revalidatePath(`/orgs/${updatedOrg.slug}`);
  });

export const deleteOrgAction = orgProfileAction
  .schema(DeleteOrgSchema)
  .metadata({ actionName: "deleteOrgAction", roles: ["OWNER"] })
  .action(async ({ ctx: { organization } }) => {
    await deleteOrganizationQuery({ id: organization.id });
  });
