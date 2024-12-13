"use server";

import { orgProfileAction } from "@/lib/actions/safe-actions";
import { OrganizationMembershipRole } from "@/queries/orgs/organization.type";

import { ActionError, SupabaseAuthActionError } from "@/lib/errors/errors";
import { logger } from "@/lib/logger";
import { getServiceAccountsFromOrganizationQuery } from "@/queries/service-accounts/get-service-accounts-from-organization.query";
import { getWaitingDeviceQuery } from "@/queries/waiting-device/get-waiting-device.query";
import { updateWaitingDeviceQuery } from "@/queries/waiting-device/update-waiting-device.query";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { AddDeviceFormSchema } from "./add-device.schema";

export const addDeviceAction = orgProfileAction
  .schema(AddDeviceFormSchema)
  .metadata({
    actionName: "addDeviceAction",
    roles: OrganizationMembershipRole.options,
  })
  .action(async ({ parsedInput, ctx: { organization } }) => {
    const { code } = parsedInput;

    const waitingDevice = await getWaitingDeviceQuery(code);
    logger.info(waitingDevice, "Waiting device");

    const serviceAccounts = await getServiceAccountsFromOrganizationQuery({
      organization_id: organization.id,
    });

    if (serviceAccounts.length < 1) {
      throw new ActionError("No service account found");
    }

    const serviceAccount = serviceAccounts[0];

    logger.info(serviceAccount, "Service account");

    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      email: serviceAccount.email,
      type: "magiclink",
    });

    if (error) {
      throw new SupabaseAuthActionError(error);
    }

    await updateWaitingDeviceQuery({
      id: waitingDevice.id,
      device: {
        organization_id: serviceAccount.organization_id,
        organization_email: serviceAccount.email,
        sign_in_otp_code: data.properties.email_otp,
      },
    });
  });
