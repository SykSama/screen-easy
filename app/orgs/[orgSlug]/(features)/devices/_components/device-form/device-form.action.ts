"use server";

import { orgProfileAction } from "@/lib/actions/safe-actions";
import { updateDeviceQuery } from "@/queries/devices/update-device.query";
import { OrganizationMembershipRole } from "@/queries/orgs/organization.type";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DeviceFormSchema } from "./device-form.schema";

export const updateDeviceAction = orgProfileAction
  .schema(DeviceFormSchema)
  .metadata({
    actionName: "updateDeviceAction",
    roles: OrganizationMembershipRole.options,
  })
  .action(async ({ parsedInput, ctx: { organization } }) => {
    await updateDeviceQuery({
      id: parsedInput.id,
      device: parsedInput,
    });

    revalidatePath(`/orgs/${organization.slug}/devices/${parsedInput.id}`);
    redirect(`/orgs/${organization.slug}/devices/${parsedInput.id}`);
  });
