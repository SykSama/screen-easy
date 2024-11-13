import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { requiredAuth } from "@/features/auth/helper";
import { getProfileOrgsQuery } from "@/query/orgs/get-users-orgs.query";
import type { LayoutParams } from "@/types/next";
import { Command } from "lucide-react";

export default async function RouteLayout(
  props: LayoutParams<{ orgSlug: string }>,
) {
  const { user } = await requiredAuth();
  const orgs = await getProfileOrgsQuery(user.id);

  const sidebarOrgs = orgs.map((org) => ({
    name: org.organizations.name,
    logo: <Command className="size-4 shrink-0" />,
    plan: org.membership_roles.name,
  }));

  return (
    <SidebarProvider>
      <AppSidebar orgs={sidebarOrgs} />
      {props.children}
    </SidebarProvider>
  );
}
