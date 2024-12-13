"use server";

import { orgProfileAction } from "@/lib/actions/safe-actions";
import { OrganizationMembershipRole } from "@/queries/orgs/organization.type";
import { AddDeviceFormSchema } from "./add-device.schema";

export const addDeviceAction = orgProfileAction
  .schema(AddDeviceFormSchema)
  .metadata({
    actionName: "addDeviceAction",
    roles: OrganizationMembershipRole.options,
  })
  .action(async ({ parsedInput, ctx: { organization } }) => {
    // TODO: Implement device creation
    throw new Error("Not implemented");
  });
