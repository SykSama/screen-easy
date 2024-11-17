import { NavBreadcrumb } from "@/components/nav-breadcrumb";
import type { PageParams } from "@/types/next";
import { Suspense } from "react";
import { PageContent } from "./page-content";

export default async function TeamSettingsPage({
  params,
}: PageParams<{ orgSlug: string }>) {
  const { orgSlug } = await params;

  return (
    <>
      <NavBreadcrumb
        breadcrumbs={[
          { name: "Settings", url: `/orgs/${orgSlug}/settings` },
          { name: "Team", url: `/orgs/${orgSlug}/settings/team` },
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-8 pt-4">
        <Suspense fallback={<div>Loading...</div>}>
          <PageContent orgSlug={orgSlug} />
        </Suspense>
      </div>
    </>
  );
}
