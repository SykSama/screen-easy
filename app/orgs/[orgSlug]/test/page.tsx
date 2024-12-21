import { CollectionsSelectorTable } from "@/features/collections/collections-selector/collections-selector-table";
import type { PageParams } from "@/types/next";

export default async function TestPage({
  params,
}: PageParams<{ orgSlug: string }>) {
  const { orgSlug } = await params;

  return (
    <div>
      <CollectionsSelectorTable />
    </div>
  );
}
