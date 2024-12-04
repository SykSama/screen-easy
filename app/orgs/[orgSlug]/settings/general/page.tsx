import { Separator } from "@/components/ui/separator";
import { getOrganizationFromSlugQuery } from "@/queries/orgs/get-organization.query";
import type { PageParams } from "@/types/next";
import { DeleteOrgForm } from "./delete-org-form";
import { UpdateOrgForm } from "./update-org-form";

export default async function GeneralSettingsPage({
  params,
}: PageParams<{ orgSlug: string }>) {
  const { orgSlug } = await params;
  const org = await getOrganizationFromSlugQuery(orgSlug);

  return (
    <div className="grow p-6 lg:rounded-lg lg:p-10 lg:shadow-sm">
      <div className="mx-auto max-w-6xl">
        <UpdateOrgForm initialData={org} />
        <Separator className="my-10" />
        <DeleteOrgForm />
      </div>
    </div>
  );
}
