import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/utils/supabase/server";
import type Stripe from "stripe";

export async function findOrganizationFromCustomer(
  stripeCustomer: string | Stripe.Customer | Stripe.DeletedCustomer | null,
) {
  let stripeCustomerId: string;

  if (typeof stripeCustomer === "string") {
    stripeCustomerId = stripeCustomer;
  } else if (stripeCustomer) {
    stripeCustomerId = stripeCustomer.id;
  } else {
    throw new Error("Invalid customer");
  }

  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from("organizations")
    .select("*")
    .eq("stripe_customer_id", stripeCustomerId)
    .limit(1)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export const getPlanFromLineItem = async (
  lineItems?:
    | Stripe.LineItem[]
    | Stripe.InvoiceLineItem[]
    | Stripe.SubscriptionItem[],
): Promise<string> => {
  if (!lineItems) {
    return "FREE";
  }

  const lineItem = lineItems[0];

  const productOrAnything = lineItem.price?.product;

  if (!productOrAnything) {
    return "FREE";
  }

  const product = await stripe.products.retrieve(productOrAnything as string);

  const supabase = await createAdminClient();

  const { data } = await supabase
    .from("organization_plans")
    .select("id")
    .eq("stripe_product_id", product.id)
    .limit(1)
    .single()
    .throwOnError();

  return data?.id ?? "FREE";
};

export const upgradeUserToPlan = async (orgId: string, plan: string) => {
  const supabase = await createAdminClient();

  await supabase
    .from("organizations")
    .update({
      plan_id: plan,
    })
    .eq("id", orgId)
    .throwOnError();
};

export const downgradeUserFromPlan = async (orgId: string) => {
  const supabase = await createAdminClient();

  await supabase
    .from("organizations")
    .update({
      plan_id: "FREE",
    })
    .eq("id", orgId)
    .throwOnError();
};
