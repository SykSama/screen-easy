import type { Tables } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

type Subscription = Tables<"subscriptions">;
type Product = Tables<"products">;
type Price = Tables<"prices">;
type Rules = Tables<"rules">;

export type ProductWithPrices = Product & {
  prices: Price[];
  rules: Rules | null;
};

export type PriceWithProduct = {
  products: Product | null;
} & Price;

export type SubscriptionWithProduct = {
  prices: PriceWithProduct | null;
} & Subscription;

export const getSubscription = cache(
  async (organization_id: string): Promise<SubscriptionWithProduct | null> => {
    const supabase = await createClient();

    const { data: subscription, error } = await supabase
      .from("subscriptions")
      .select("*, prices(*, products(*))")
      .eq("organization_id", organization_id)
      .in("status", ["trialing", "active"])
      .maybeSingle();

    return subscription;
  },
);

export const getProducts = cache(
  async (): Promise<ProductWithPrices[] | null> => {
    const supabase = await createClient();

    const { data: products, error } = await supabase
      .from("products")
      .select("*, prices(*), rules(*)")
      .eq("active", true)
      .eq("prices.active", true)
      .order("metadata->index")
      .order("unit_amount", { referencedTable: "prices" });

    return products;
  },
);
