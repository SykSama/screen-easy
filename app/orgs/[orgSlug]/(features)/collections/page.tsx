import { Button } from "@/components/ui/button";
import type { PageParams } from "@/types/next";
import Link from "next/link";
import { Suspense } from "react";
import { SearchInput } from "../../settings/team/_components/search/search-input";
import { CollectionsDataTable } from "./collections-data-table";

export default async function CollectionsPage({
  params,
  searchParams,
}: PageParams<{ orgSlug: string }>) {
  const { orgSlug } = await params;
  const { searchQuery } = await searchParams;

  return (
    <div className="pt-4">
      <Suspense fallback={<div>Loading...</div>}>
        <PageContent
          orgSlug={orgSlug}
          searchQuery={searchQuery as string | undefined}
        />
      </Suspense>
    </div>
  );
}

type PageContentProps = {
  orgSlug: string;
  searchQuery?: string;
};

const PageContent = async ({ orgSlug, searchQuery }: PageContentProps) => {
  return (
    <div className="container mx-auto flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <SearchInput placeholder="Find a collection" />
        <div className="flex gap-2">
          <Button asChild size={"xs"}>
            <Link href={`/orgs/${orgSlug}/collections/new`}>Add</Link>
          </Button>
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <CollectionsDataTable organizationSlug={orgSlug} />
      </Suspense>
    </div>
  );
};
