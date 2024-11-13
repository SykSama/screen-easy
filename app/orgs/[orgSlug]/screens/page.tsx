import { NavBreadcrumb } from "@/components/nav-breadcrumb";
import type { PageParams } from "@/types/next";

export default async function ScreensPage(
  props: PageParams<{ orgSlug: string }>,
) {
  const { orgSlug } = await props.params;

  return (
    <>
      <NavBreadcrumb breadcrumbs={[{ name: "Screens", url: "/" }]} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h1>Screens for {orgSlug}</h1>
      </div>
    </>
  );
}
