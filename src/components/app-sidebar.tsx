"use client";

import {
  ChartArea,
  CreditCard,
  File,
  Home,
  Image,
  LifeBuoy,
  ScreenShare,
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
  projects: [
    {
      name: "General",
      url: "/orgs/general",
      icon: Settings,
    },
    {
      name: "Team",
      url: "/orgs/team",
      icon: User,
    },
    {
      name: "Billing",
      url: "/orgs/billing",
      icon: CreditCard,
    },
    {
      name: "Usage",
      url: "/orgs/usage",
      icon: ChartArea,
    },
    {
      name: "Invoices",
      url: "/orgs/invoices",
      icon: File,
    },
  ],
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
    // {
    //   name: "Usage",
    //   url: `/orgs/${orgSlug}/settings/usage`,
    //   icon: ChartArea,
    // },
    {
      name: "Invoices",
      url: `/orgs/${orgSlug}/settings/invoices`,
      icon: File,
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
              title: "Screens",
              url: `/orgs/${orgSlug}/screens`,
              icon: ScreenShare,
            },
            {
              title: "Images",
              url: `/orgs/${orgSlug}/images`,
              icon: Image,
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
