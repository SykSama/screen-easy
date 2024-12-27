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

export const OrganizationWithoutSubscription = () => {
  return (
    <div className="">
      <p className="mb-2 text-sm">
        You are not currently subscribed to any plan.
      </p>
      <OrganizationWithoutSubscriptionSheet />
    </div>
  );
};

export const OrganizationWithoutSubscriptionSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Subscribe now</Button>
      </SheetTrigger>
      <SheetContent className="w-[90vw] sm:max-w-[1000px]">
        <SheetHeader>
          <SheetTitle>Choose a plan</SheetTitle>
          <SheetDescription>Choose a plan to subscribe to.</SheetDescription>
        </SheetHeader>
        <Pricing plans={plans} />
      </SheetContent>
    </Sheet>
  );
};

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
