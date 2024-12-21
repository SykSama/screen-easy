import { CollectionsSelectorDialog } from "@/features/collections/collections-selector/collections-selector-dialog";
import type { PageParams } from "@/types/next";

export default async function TestPage({
  params,
}: PageParams<{ orgSlug: string }>) {
  const { orgSlug } = await params;

  return (
    <div className="p-8">
      <h1 className="mb-8 text-2xl font-bold">Test Collections Selector</h1>
      <CollectionsSelectorDialog />
    </div>
  );
}
