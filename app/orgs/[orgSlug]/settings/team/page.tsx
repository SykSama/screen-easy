import { NavBreadcrumb } from "@/components/nav-breadcrumb";
import { getOrgQuery } from "@/query/orgs/get-org.query";
import type { PageParams } from "@/types/next";

export default async function TeamSettingsPage({
  params,
}: PageParams<{ orgSlug: string }>) {
  const { orgSlug } = await params;
  const org = await getOrgQuery(orgSlug);

  return (
    <>
      <NavBreadcrumb
        breadcrumbs={[
          { name: "Settings", url: `/orgs/${orgSlug}/settings` },
          { name: "General", url: `/orgs/${orgSlug}/settings/team` },
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h1 className="text-2xl font-bold">{org.name} team settings</h1>
        <div className="flex flex-col gap-6"></div>
      </div>
    </>
  );
}
