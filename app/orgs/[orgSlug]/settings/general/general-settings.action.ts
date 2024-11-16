"use server";

import { orgAction } from "@/lib/actions/safe-actions";
import { updateOrganizationQuery } from "@/query/orgs/update-org.query";
import { revalidatePath } from "next/cache";

import { deleteOrganizationQuery } from "@/query/orgs/delete-org.query";
import {
  DeleteOrgSchema,
  GeneralSettingsFormSchema,
} from "./general-settings-form.schema";

export const updateOrgSettingsAction = orgAction
  .schema(GeneralSettingsFormSchema)
  .metadata({ actionName: "updateOrgSettingsAction", roles: ["OWNER"] })
  .action(async ({ parsedInput: { name }, ctx: { org } }) => {
    const updatedOrg = await updateOrganizationQuery({
      id: org.id,
      organization: { name },
    });

    revalidatePath(`/orgs/${updatedOrg.slug}`);
  });

export const deleteOrgAction = orgAction
  .schema(DeleteOrgSchema)
  .metadata({ actionName: "deleteOrgAction", roles: ["OWNER"] })
  .action(async ({ ctx: { org } }) => {
    await deleteOrganizationQuery({ id: org.id });
  });
