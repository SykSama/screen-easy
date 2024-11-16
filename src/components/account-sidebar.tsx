"use client";

import { LifeBuoy, Send, Settings } from "lucide-react";
import * as React from "react";

import { NavSecondary } from "@/components/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { NavOrgSettings } from "./nav-org-settings";
import { Button } from "./ui/button";

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

export type AccountSidebarProps = React.ComponentProps<typeof Sidebar>;

export function AccountSidebar({ ...props }: AccountSidebarProps) {
  const settings = [
    {
      name: "Preferences",
      url: `/account/me`,
      icon: Settings,
    },
  ];

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <Button asChild>
          <Link href="/orgs">Go back to Dashboard</Link>
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <NavOrgSettings settings={settings} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  );
}
