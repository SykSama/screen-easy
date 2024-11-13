import { SidebarProvider } from "@/components/ui/sidebar";
import type { LayoutParams } from "@/types/next";

export default async function RouteLayout(
  props: LayoutParams<{ orgSlug: string }>,
) {
  return <SidebarProvider>{props.children}</SidebarProvider>;
}
