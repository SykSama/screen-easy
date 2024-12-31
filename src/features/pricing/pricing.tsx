import { getOrganizationFromSlugQuery } from "@/queries/orgs/get-organization.query";
import { PricingSection } from "./pricing-section";
import { getProducts, getSubscription } from "./queries/queries";

export const getOrganizationOrNull = async (orgSlug?: string) => {
  if (!orgSlug) {
    return null;
  }

  return getOrganizationFromSlugQuery(orgSlug);
};

export const getSubscriptionOrNull = async (orgId: string | undefined) => {
  if (!orgId) {
    return null;
  }

  return getSubscription(orgId);
};

export const Pricing = async ({ orgSlug }: { orgSlug?: string }) => {
  const [organization, products] = await Promise.all([
    getOrganizationOrNull(orgSlug),
    getProducts(),
  ]);

  if (!products) {
    return <div>No products found</div>;
  }

  const subscription = await getSubscriptionOrNull(organization?.id);

  return <PricingSection products={products} />;
};
