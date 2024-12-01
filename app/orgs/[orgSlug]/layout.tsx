import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { requiredAuth } from "@/features/auth/helper";
import { logger } from "@/lib/logger";
import { getProfileOrganizationsRolesQuery } from "@/queries/orgs/get-profile-organizations-roles.query";

import type { LayoutParams } from "@/types/next";
import { Command } from "lucide-react";

export default async function RouteLayout(
  props: LayoutParams<{ orgSlug: string }> & { breadcrumb: React.ReactNode },
) {
  const { user } = await requiredAuth();

  //TODO: For now, i don't care about the performance, but this query should be cached
  const profileWithOrgs = await getProfileOrganizationsRolesQuery({
    profile_id: user.id,
  });

  const { orgSlug } = await props.params;

  const activeOrg = profileWithOrgs.find(
    (profile) => profile.organizations.slug === orgSlug,
  );

  if (!activeOrg) {
    logger.error("Unauthorized");
    throw new Error("Unauthorized");
  }

  const sidebarOrgs = profileWithOrgs.map((profile) => ({
    name: profile.organizations.name,
    logo: <Command className="size-4 shrink-0" />,
    plan: profile.membership_roles.name,
    slug: profile.organizations.slug,
    isActive: profile.organizations.slug === orgSlug,
  }));

  const sidebarUser = {
    name: user.email?.split("@")[0] ?? "",
    email: user.email ?? "",
    avatar: "/avatars/shadcn.jpg",
  };

  return (
    <SidebarProvider>
      <AppSidebar orgs={sidebarOrgs} user={sidebarUser} orgSlug={orgSlug} />
      <SidebarInset>
        {props.breadcrumb}
        {props.children}
      </SidebarInset>
    </SidebarProvider>
  );
}
