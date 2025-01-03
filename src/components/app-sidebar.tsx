"use client";

import {
  CreditCard,
  Home,
  Image,
  Images,
  LifeBuoy,
  Monitor,
  Send,
  Settings,
  User,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";

import { NavSecondary } from "@/components/nav-secondary";
import type { NavUserProps } from "@/components/nav-user";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavOrgSettings } from "./nav-org-settings";
import type { OrgSwitcherProps } from "./org-switcher";
import { OrgSwitcher } from "./org-switcher";

const data = {
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

export type AppSidebarProps = React.ComponentProps<typeof Sidebar> &
  OrgSwitcherProps &
  NavUserProps & {
    orgSlug: string;
  };

export function AppSidebar({ orgs, user, orgSlug, ...props }: AppSidebarProps) {
  const settings = [
    {
      name: "General",
      url: `/orgs/${orgSlug}/settings/general`,
      icon: Settings,
    },
    {
      name: "Team",
      url: `/orgs/${orgSlug}/settings/team`,
      icon: User,
    },
    {
      name: "Billing",
      url: `/orgs/${orgSlug}/settings/billing`,
      icon: CreditCard,
    },
  ];

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <OrgSwitcher orgs={orgs} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={[
            {
              title: "Dashboard",
              url: `/orgs/${orgSlug}/dashboard`,
              icon: Home,
            },
            {
              title: "Medias",
              url: `/orgs/${orgSlug}/medias`,
              icon: Image,
            },
            {
              title: "Collections",
              url: `/orgs/${orgSlug}/collections`,
              icon: Images,
            },
            {
              title: "Devices",
              url: `/orgs/${orgSlug}/devices`,
              icon: Monitor,
            },
          ]}
        />
        <NavOrgSettings settings={settings} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
