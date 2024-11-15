import type { PageParams } from "@/types/next";

export default async function RoutePage(
  props: PageParams<{ orgSlug: string }>,
) {
  return <div>General</div>;
}
