"use server";

import { authAction } from "@/lib/actions/safe-actions";

import { stripe } from "@/lib/stripe";
import { createOrganizationMembershipsQuery } from "@/queries/organization-memberships/create-organization-memberships.query";
import { getOrganizationPlanQuery } from "@/queries/organization-plans/get-organization-plan.query";

import { createOrganizationQuery } from "@/queries/orgs/create-organizations.query";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { redirect } from "next/navigation";
import { NewOrgFormSchema } from "./new-org-form.schema";

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

    //TODO: change this to be a trigger in the database
    const emailDomain = email.split("@")[1];
    const emailForServiceAccount = `${org.slug}@${emailDomain}`;

    const { error } = await supabaseAdmin.auth.admin.createUser({
      email: emailForServiceAccount,
      email_confirm: true,
      user_metadata: {
        organization_id: org.id,
        service_account: true,
      },
    });

    return redirect(`/orgs/${org.slug}/dashboard`);
  });
