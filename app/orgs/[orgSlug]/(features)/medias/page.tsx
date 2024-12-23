import type { PageParams } from "@/types/next";

import { Button } from "@/components/ui/button";
import { SearchInput } from "@/features/filters/components/search-input";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { MediasDataTable } from "./medias-data-table";

export default async function MediasPage({
  params,
  searchParams,
}: PageParams<{ orgSlug: string }, { query: string }>) {
  const { orgSlug } = await params;
  const { query } = await searchParams;

  return (
    <div className="pt-4">
      <div className="container mx-auto flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2">
          <SearchInput placeholder="Find a medias" />
          <div className="flex gap-2">
            <Button asChild size="sm" className="pr-3">
              <Link href={`/orgs/${orgSlug}/medias/new`}>
                <PlusIcon className="size-4" />
                Create
              </Link>
            </Button>
          </div>
        </div>

        <Suspense fallback={<div>Loading...</div>} key={query}>
          <MediasDataTable organizationSlug={orgSlug} query={query} />
        </Suspense>
      </div>
    </div>
  );
}
