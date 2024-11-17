import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import React from "react";

import type { PageParams } from "@/types/next";

export default async function BreadcrumbSlot(
  props: PageParams<{ all: string[]; orgSlug: string }>,
) {
  const { all, orgSlug } = await props.params;
  const slugIndex = all.findIndex((item) => item === orgSlug);
  const breadcrumbs = all.slice(slugIndex + 1);

  const allItems = breadcrumbs.map((item, index) => {
    const previous = all.slice(0, index + slugIndex + 1);
    const href = `/${previous.join("/")}/${item}`;
    const isLastElement = index === breadcrumbs.length - 1;

    return (
      <React.Fragment key={href}>
        <BreadcrumbItem>
          <BreadcrumbLink href={href} className="capitalize">
            {item}
          </BreadcrumbLink>
        </BreadcrumbItem>
        {!isLastElement && <BreadcrumbSeparator />}
      </React.Fragment>
    );
  });

  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>{allItems}</BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
