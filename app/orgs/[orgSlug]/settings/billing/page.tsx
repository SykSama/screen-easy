import { BasePageLayout } from "@/components/layouts/base-page-layout";
import FormLayout from "@/components/layouts/form-layout";
import { getSubscription } from "@/features/pricing/queries/queries";
import { getOrganizationFromSlugQuery } from "@/queries/orgs/get-organization.query";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import type { OrganizationPageParams } from "../../types";
import { OrganizationWIthSubscription } from "./organization-with-subscription";
import { OrganizationWIthoutSubscription } from "./organization-without-subscription";

const plans = [
  {
    title: "Basic",
    monthlyPrice: 10,
    yearlyPrice: 100,
    description: "Essential features you need to get started",
    features: [
      "Example Feature Number 1",
      "Example Feature Number 2",
      "Example Feature Number 3",
    ],
    actionLabel: "Get Started",
  },
  {
    title: "Pro",
    monthlyPrice: 25,
    yearlyPrice: 250,
    description: "Perfect for owners of small & medium businessess",
    features: [
      "Example Feature Number 1",
      "Example Feature Number 2",
      "Example Feature Number 3",
    ],
    actionLabel: "Get Started",
    popular: true,
  },
  {
    title: "Enterprise",
    price: "Custom",
    description: "Dedicated support and infrastructure to fit your needs",
    features: [
      "Example Feature Number 1",
      "Example Feature Number 2",
      "Example Feature Number 3",
      "Super Exclusive Feature",
    ],
    actionLabel: "Contact Sales",
    exclusive: true,
  },
];

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
    <OrganizationWIthSubscription subscription={subscription} />
  ) : (
    <OrganizationWIthoutSubscription />
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
