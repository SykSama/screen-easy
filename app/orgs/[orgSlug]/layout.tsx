import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { requiredAuth } from "@/features/auth/helper";
import { logger } from "@/lib/logger";
import { getProfileOrgsQuery } from "@/query/orgs/get-users-orgs.query";
import type { LayoutParams } from "@/types/next";
import { Command } from "lucide-react";

export default async function RouteLayout(
  props: LayoutParams<{ orgSlug: string }>,
) {
  const { user } = await requiredAuth();

  //TODO: For now, i don't care about the performance, but this query should be cached
  const orgs = await getProfileOrgsQuery(user.id);

  const { orgSlug } = await props.params;

  const orgWithRoles = orgs.find((org) => org.organizations.slug === orgSlug);

  if (!orgWithRoles) {
    logger.error("Unauthorized");
    throw new Error("Unauthorized");
  }

  const sidebarOrgs = orgs.map((org) => ({
    name: org.organizations.name,
    logo: <Command className="size-4 shrink-0" />,
    plan: org.membership_roles.name,
    slug: org.organizations.slug,
    isActive: org.organizations.slug === orgSlug,
  }));

  const sidebarUser = {
    name: user.email?.split("@")[0] ?? "",
    email: user.email ?? "",
    avatar: "/avatars/shadcn.jpg",
  };

  return (
    <SidebarProvider>
      <AppSidebar orgs={sidebarOrgs} user={sidebarUser} orgSlug={orgSlug} />
      <SidebarInset>{props.children}</SidebarInset>
    </SidebarProvider>
  );
}
