"use client";

import { Page400 } from "@/features/pages/Page400";
import { logger } from "@/lib/logger";

import { useEffect } from "react";

export default function RouteError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Log only serializable properties
    logger.error({
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });
  }, [error]);

  return <Page400 />;
}
