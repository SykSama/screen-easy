import { BasePageLayout } from "@/components/layouts/base-page-layout";
import FormLayout from "@/components/layouts/form-layout";
import { OrganizationWithoutSubscriptionSheet } from "@/features/subscription/organization-without-subscription";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import type { OrganizationPageParams } from "../../types";

export default async function BillingPage({ params }: OrganizationPageParams) {
  const { orgSlug } = await params;

  return (
    <BasePageLayout title="Billing">
      <FormLayout>
        <FormLayout.Section>
          <FormLayout.Information>
            <h2 className="text-2xl font-semibold">Subscription Plan</h2>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">More information</p>
              <Link
                href="#"
                className="flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-primary"
              >
                Pricing
                <ExternalLink className="size-3" />
              </Link>
            </div>
          </FormLayout.Information>
          <FormLayout.Actions>
            <Suspense fallback={<div>Loading...</div>}>
              <BillingPageContent orgSlug={orgSlug} />
            </Suspense>
          </FormLayout.Actions>
        </FormLayout.Section>
      </FormLayout>
    </BasePageLayout>
  );
}

const BillingPageContent = async ({ orgSlug }: { orgSlug: string }) => {
  return <OrganizationWithoutSubscriptionSheet orgSlug={orgSlug} />;

  // return subscription ? (
  //   <OrganizationWithSubscription subscription={subscription} />
  // ) : (
  //   <OrganizationWithoutSubscriptionSheet />
  // );
};
