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
      device: {
        name: parsedInput.name,
        description: parsedInput.description,
        device_group_id: parsedInput.device_group_id,
        collection_id: parsedInput.collection?.id ?? null,
      },
    });

    revalidatePath(`/orgs/${organization.slug}/devices/${parsedInput.id}`);
    redirect(`/orgs/${organization.slug}/devices`);
  });
