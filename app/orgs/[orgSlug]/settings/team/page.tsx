import type { PageParams } from "@/types/next";
import { Suspense } from "react";
import { PageContent } from "./page-content";

// TODO: remove a person from organization
// TODO: Leav organization
export default async function TeamSettingsPage({
  params,
}: PageParams<{ orgSlug: string }>) {
  const { orgSlug } = await params;

  return (
    <div className="flex flex-1 flex-col gap-4 p-8 pt-4">
      <Suspense fallback={<div>Loading...</div>}>
        <PageContent orgSlug={orgSlug} />
      </Suspense>
    </div>
  );
}
