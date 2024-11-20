import { stripe } from "@/lib/stripe";
import { getPlanQuery } from "@/query/organization-plans/get-organization-plan.query";
import { getOrgQuery } from "@/query/orgs/get-org.query";
import type { PageParams } from "@/types/next";
import { getServerUrl } from "@/utils/server-url";
import { Suspense } from "react";
import OrgSubscriptionPlan from "./org-subscription-plan";

export default async function BillingRoutePage({
  params,
}: PageParams<{ orgSlug: string }>) {
  const { orgSlug } = await params;

  return (
    <div className="flex flex-1 flex-col gap-4 p-8 pt-4">
      <Suspense fallback={<div>Loading...</div>}>
        <BillingPageContent orgSlug={orgSlug} />
      </Suspense>
    </div>
  );
}

type BillingPageContentProps = {
  orgSlug: string;
};

export const BillingPageContent = async ({
  orgSlug,
}: BillingPageContentProps) => {
  const organization = await getOrgQuery(orgSlug);
  const subscription = await stripe.subscriptions.retrieve(
    organization.stripe_subscription_id,
  );
  const plan = await getPlanQuery(organization.plan_id);
  const { url } = await stripe.billingPortal.sessions.create({
    customer: organization.stripe_customer_id,
    return_url: `${getServerUrl()}/orgs/${orgSlug}/settings/billing`,
  });

  return (
    <div className="space-y-8">
      <OrgSubscriptionPlan
        plan={plan}
        subscription={{
          periodStart: new Date(subscription.current_period_start * 1000),
          periodEnd: new Date(subscription.current_period_end * 1000),
        }}
        customerPortal={url}
      />
    </div>
  );
};
