import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  formatDate,
  numberOfDaysRemaining,
  pourcentageOfDaysRemaining,
} from "@/lib/format-date";
import type { Tables } from "@/types/database.generated.types";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

type OrgSubscriptionPlanProps = {
  plan: Tables<"organization_plans">;
  subscription: {
    periodStart: Date;
    periodEnd: Date;
  };
  customerPortal: string;
};

export default function OrgSubscriptionPlan({
  plan,
  subscription,
  customerPortal,
}: OrgSubscriptionPlanProps) {
  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-12 gap-8 p-6">
          <div className="col-span-4 flex items-start justify-between">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Subscription Plan</h2>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  More information
                </p>
                <Link
                  href="#"
                  className="flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                >
                  Pricing
                  <ExternalLink className="size-3" />
                </Link>
              </div>
            </div>
          </div>

          <div className="col-span-8 space-y-6">
            <div>
              <p className="text-sm">
                This organization is currently on the plan:
              </p>
              <p className="text-2xl font-semibold text-emerald-500">
                {plan.name}
              </p>
            </div>

            <Button size="xs" asChild>
              <Link href={customerPortal}>Change subscription plan</Link>
            </Button>
            <div className="flex w-full flex-col">
              <div className="flex justify-between space-x-8 pb-1 align-baseline">
                <p>
                  Current billing cycle ({formatDate(subscription.periodStart)}{" "}
                  - {formatDate(subscription.periodEnd)})
                </p>
                <p>
                  {numberOfDaysRemaining(subscription.periodEnd)} days remaining
                </p>
              </div>
              <Progress
                value={pourcentageOfDaysRemaining(
                  subscription.periodStart,
                  subscription.periodEnd,
                )}
                className="h-1 bg-slate-100"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
