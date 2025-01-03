import { LoadingButton } from "@/components/loading-button";
import type { SubscriptionWithProduct } from "@/features/pricing/queries/queries";
import {
  formatDate,
  numberOfDaysRemaining,
  pourcentageOfDaysRemaining,
} from "@/lib/format-date";
import { Progress } from "@radix-ui/react-progress";

export type OrganizationWithSubscriptionProps = {
  subscription: SubscriptionWithProduct;
};

export const OrganizationWithSubscription = ({
  subscription,
}: OrganizationWithSubscriptionProps) => {
  const subscriptionPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: subscription.prices?.currency ?? "USD",
    minimumFractionDigits: 0,
  }).format((subscription.prices?.unit_amount ?? 0) / 100);

  return (
    <div>
      <p className="text-sm">This organization is currently on the plan:</p>
      <p className="text-2xl font-semibold text-emerald-500">
        {subscription.prices?.products?.name}
      </p>
      <LoadingButton>Change subscription plan</LoadingButton>
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
    </div>
  );
};
