import { loadStripe } from "@stripe/stripe-js";
import type Stripe from "stripe";

let stripePromise: Promise<Stripe | null>;

export const getStripe = async () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE ??
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ??
        "",
    );
  }

  return stripePromise;
};
