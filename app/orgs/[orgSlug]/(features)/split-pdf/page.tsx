import { Button } from "@/components/ui/button";
import type { PageParams } from "@/types/next";
import Link from "next/link";

export default async function RoutePage(
  props: PageParams<{ orgSlug: string }>,
) {
  const { orgSlug } = await props.params;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Split PDF</h1>
          <p className="text-muted-foreground">
            Split and rename your PDF files
          </p>
        </div>
        <Button asChild>
          <Link href={`/orgs/${orgSlug}/split-pdf/new`}>Split New PDF</Link>
        </Button>
      </div>
    </div>
  );
}
