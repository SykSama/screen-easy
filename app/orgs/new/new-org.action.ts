"use server";

import { authAction } from "@/lib/actions/safe-actions";

import { stripe } from "@/lib/stripe";
import { createOrganizationMembershipsQuery } from "@/queries/organization-memberships/create-organization-memberships.query";
import { getOrganizationPlanQuery } from "@/queries/organization-plans/get-organization-plan.query";

import { logger } from "@/lib/logger";
import { createOrganizationQuery } from "@/queries/orgs/create-organizations.query";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { redirect } from "next/navigation";
import { NewOrgFormSchema } from "./new-org-form.schema";

//TODO: [AR] - Optimize this action to be trigger and database trigger
export const createOrgAction = authAction
  .schema(NewOrgFormSchema)
  .metadata({
    actionName: "createOrgAction",
  })
  .action(async ({ parsedInput: { name, email }, ctx: { user } }) => {
    const stripeCustomer = await stripe.customers.create({
      email,
    });

    const plan = await getOrganizationPlanQuery("FREE");

    const stripeSubscription = await stripe.subscriptions.create({
      customer: stripeCustomer.id,
      items: [{ price: plan.stripe_monthly_price_id }],
    });

    const org = await createOrganizationQuery({
      name,
      email,
      stripe_customer_id: stripeCustomer.id,
      stripe_subscription_id: stripeSubscription.id,
      plan_id: plan.id,
    });

    await createOrganizationMembershipsQuery({
      organization_id: org.id,
      profile_id: user.id,
      role_id: "OWNER",
    });

    try {
      //TODO: [AR] - change this to be a trigger in the database
      const emailDomain = email.split("@")[1];
      const emailForServiceAccount = `${org.slug}@${emailDomain}`;

      await supabaseAdmin.auth.admin.createUser({
        email: emailForServiceAccount,
        email_confirm: true,
        role: "service_account",
        user_metadata: {
          organization_id: org.id,
          service_account: true,
        },
      });
    } catch (error) {
      // So we don't fail the action if the service account creation fails
      logger.error(error);
    }

    return redirect(`/orgs/${org.slug}/dashboard`);
  });
