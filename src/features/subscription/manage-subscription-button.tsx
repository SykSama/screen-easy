"use client";

import { LoadingButton } from "@/components/loading-button";
import { createStripePortal } from "@/utils/stripe/server";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";

export const ManageSubscriptionButton = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStripePortalRequest = async () => {
    setIsSubmitting(true);
    const redirectUrl = await createStripePortal(currentPath);
    setIsSubmitting(false);
    return router.push(redirectUrl);
  };

  return (
    <LoadingButton
      size="xs"
      onClick={handleStripePortalRequest}
      isLoading={isSubmitting}
    >
      Change subscription plan
    </LoadingButton>
  );
};
