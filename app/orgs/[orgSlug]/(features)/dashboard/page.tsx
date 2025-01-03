import type { PageParams } from "@/types/next";

export default async function DashboardPage(
  props: PageParams<{ orgSlug: string }>,
) {
  const { orgSlug } = await props.params;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1>Dashboard for {orgSlug}</h1>
    </div>
  );
}
