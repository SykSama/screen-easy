import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Pricing } from "../pricing/pricing";

type OrgSlug = {
  orgSlug: string;
};

export const OrganizationWithoutSubscription = ({ orgSlug }: OrgSlug) => {
  return (
    <div className="">
      <p className="mb-2 text-sm">
        You are not currently subscribed to any plan.
      </p>
      <OrganizationWithoutSubscriptionSheet orgSlug={orgSlug} />
    </div>
  );
};

export const OrganizationWithoutSubscriptionSheet = ({ orgSlug }: OrgSlug) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Subscribe now</Button>
      </SheetTrigger>
      <SheetContent className="w-[90vw] sm:max-w-[1000px]">
        <SheetHeader>
          <SheetTitle>Simple, transparent pricing</SheetTitle>
          <SheetDescription>
            Choose the plan that best suits your needs. All plans include full
            access to our platform.
          </SheetDescription>
        </SheetHeader>
        <Pricing orgSlug={orgSlug} />
      </SheetContent>
    </Sheet>
  );
};
