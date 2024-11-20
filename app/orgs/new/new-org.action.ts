"use server";

import { authAction } from "@/lib/actions/safe-actions";

import { stripe } from "@/lib/stripe";
import { createOrganizationMembershipsQuery } from "@/query/organization-memberships/create-organization-memberships.query";
import { getPlanQuery } from "@/query/organization-plans/get-organization-plan.query";
import { createOrgQuery } from "@/query/orgs/create-org.query";
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

    const plan = await getPlanQuery("FREE");

    const stripeSubscription = await stripe.subscriptions.create({
      customer: stripeCustomer.id,
      items: [{ price: plan.stripe_monthly_price_id }],
    });

    const org = await createOrgQuery({
      organization: {
        name,
        email,
        stripe_customer_id: stripeCustomer.id,
        stripe_subscription_id: stripeSubscription.id,
        plan_id: plan.id,
      },
    });

    await createOrganizationMembershipsQuery({
      organization_id: org.id,
      profile_id: user.id,
      role_id: "OWNER",
    });

    return redirect(`/orgs/${org.slug}`);
  });
