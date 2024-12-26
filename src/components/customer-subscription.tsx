"use client";

import {
  formatDate,
  numberOfDaysRemaining,
  pourcentageOfDaysRemaining,
} from "@/lib/format-date";
import type { Tables } from "@/types/database.types";
import { createStripePortal } from "@/utils/stripe/server";
import { Progress } from "@radix-ui/react-progress";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LoadingButton } from "./loading-button";

type Subscription = Tables<"subscriptions">;
type Price = Tables<"prices">;
type Product = Tables<"products">;

type SubscriptionWithPriceAndProduct = Subscription & {
  prices:
    | (Price & {
        products: Product | null;
      })
    | null;
};

type Props = {
  subscription: SubscriptionWithPriceAndProduct | null;
};

export const CustomerSubscription = ({ subscription }: Props) => {
  const router = useRouter();
  const currentPath = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: subscription.prices?.currency ?? "USD",
      minimumFractionDigits: 0,
    }).format((subscription.prices?.unit_amount ?? 0) / 100);

  const handleStripePortalRequest = async () => {
    setIsSubmitting(true);
    const redirectUrl = await createStripePortal(currentPath);
    setIsSubmitting(false);
    return router.push(redirectUrl);
  };

  return (
    <>
      <div>
        <p className="text-sm">This organization is currently on the plan:</p>
        <p className="text-2xl font-semibold text-emerald-500">
          {subscription?.prices?.products?.name}
        </p>
      </div>

      {subscription && (
        <OrganizationSubscriptionEnabled
          subscription={subscription}
          handleStripePortalRequest={handleStripePortalRequest}
        />
      )}
    </>
  );
};

export const OrganizationSubscriptionEnabled = ({
  subscription,
  handleStripePortalRequest,
}: {
  subscription: SubscriptionWithPriceAndProduct;
  handleStripePortalRequest: () => void;
}) => {
  return (
    <>
      <LoadingButton size="xs" onClick={handleStripePortalRequest}>
        Change subscription plan
      </LoadingButton>
      <div className="flex w-full flex-col">
        <div className="flex justify-between space-x-8 pb-1 align-baseline">
          <p>
            Current billing cycle (
            {formatDate(new Date(subscription.current_period_start))} -{" "}
            {formatDate(new Date(subscription.current_period_end))})
          </p>
          <p>
            {numberOfDaysRemaining(new Date(subscription.current_period_end))}
            days remaining
          </p>
        </div>
        <Progress
          value={pourcentageOfDaysRemaining(
            new Date(subscription.current_period_start),
            new Date(subscription.current_period_end),
          )}
          className="h-1 bg-slate-100"
        />
      </div>
    </>
  );
};
