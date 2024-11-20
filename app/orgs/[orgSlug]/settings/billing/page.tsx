import { getOrgQuery } from "@/query/orgs/get-org.query";
import type { PageParams } from "@/types/next";
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

  return (
    <div className="space-y-8">
      <OrgSubscriptionPlan />
    </div>
  );
};
