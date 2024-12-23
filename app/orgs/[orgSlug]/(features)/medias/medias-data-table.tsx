import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { getOrganizationMediasQuery } from "@/queries/media/get-organization-medias.query";
import { getOrganizationFromSlugQuery } from "@/queries/orgs/get-organization.query";
import { columns } from "./media-columns";

export type MediasDataTableProps = {
  organizationSlug: string;
  query?: string;
};

export const MediasDataTable = async ({
  organizationSlug,
  query,
}: MediasDataTableProps) => {
  const organization = await getOrganizationFromSlugQuery(organizationSlug);
  const medias = await getOrganizationMediasQuery({
    organization_id: organization.id,
    query,
  });

  return (
    <Card>
      <CardContent className="p-0">
        <DataTable columns={columns} data={medias} />
      </CardContent>
    </Card>
  );
};
