"use client";

import { Page400 } from "@/features/pages/Page400";
import type { ErrorParams } from "@/types/next";
import { Layout } from "lucide-react";
import { useEffect } from "react";

export default function RouteError({ error }: ErrorParams) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Layout>
      <Page400 />
    </Layout>
  );
}
