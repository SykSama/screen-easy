import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

// TODO: add actual subscription plan data
export default function OrgSubscriptionPlan() {
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
              <p className="text-2xl font-semibold text-emerald-500">FREE</p>
            </div>
            <Button size="xs">Change subscription plan</Button>
            <div className="flex w-full flex-col">
              <div className="flex justify-between space-x-8 pb-1 align-baseline">
                <p>Current billing cycle (Oct 25 - Nov 25)</p>
                <p>4 days remaining</p>
              </div>
              {/* TODO: Add progress bar */}
              <Progress value={85} className="h-1 bg-slate-100" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
