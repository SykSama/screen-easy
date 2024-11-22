import type { PageParams } from "@/types/next";
import { SplitPdfForm } from "../_components/split-pdf-form";

export default async function NewSplitPdfPage(
  props: PageParams<{ orgSlug: string }>,
) {
  return (
    <div className="flex flex-1 flex-col gap-4  p-4 pt-0">
      <SplitPdfForm />
    </div>
  );
}
