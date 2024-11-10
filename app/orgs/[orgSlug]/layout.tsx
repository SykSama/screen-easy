import type { LayoutParams } from "@/types/next";

export default async function RouteLayout(
  props: LayoutParams<{ orgSlug: string }>,
) {
  return <div>{props.children}</div>;
}
