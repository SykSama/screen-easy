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
    <div className="flex flex-col space-y-6 p-4 pt-0">
      <UpdateOrgForm initialData={org} />
      <Separator />
      <DeleteOrgForm />
    </div>
  );
}
