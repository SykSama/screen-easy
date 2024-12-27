import { BasePageLayout } from "@/components/layouts/base-page-layout";
import FormLayout from "@/components/layouts/form-layout";
import { getSubscription } from "@/features/pricing/queries/queries";
import { OrganizationWithSubscription } from "@/features/subscription/organization-with-subscription";
import { OrganizationWithoutSubscription } from "@/features/subscription/organization-without-subscription";
import { getOrganizationFromSlugQuery } from "@/queries/orgs/get-organization.query";
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
  const organization = await getOrganizationFromSlugQuery(orgSlug);
  const subscription = await getSubscription(organization.id);

  return subscription ? (
    <OrganizationWithSubscription subscription={subscription} />
  ) : (
    <OrganizationWithoutSubscription />
  );
};

// const plans: PricingCardProps[] = products.map((product, index) => {
//   return {
//     title: product.name ?? "Invalid title",
//     description: product.description ?? "No description",
//     monthlyPrice: (product.prices[0]?.unit_amount ?? 0) / 100,
//     yearlyPrice: (product.prices[1]?.unit_amount ?? 0) / 100,
//     exclusive: index === products.length - 1,
//     features: [
//       `${product.rules?.collections_allowed} collections`,
//       `${product.rules?.screens_allowed} screens`,
//       `${product.rules?.medias_per_collection_allowed} medias per collection`,
//     ],
//     actionLabel: "Get Started",
//   };
// });
