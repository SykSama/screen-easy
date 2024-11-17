import { Separator } from "@radix-ui/react-separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { SidebarTrigger } from "./ui/sidebar";

export type NavBreadcrumbProps = {
  breadcrumbs: {
    name: string;
    url: string;
  }[];
};

export const NavBreadcrumb = ({ breadcrumbs }: NavBreadcrumbProps) => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb separator={<BreadcrumbSeparator />}>
          <BreadcrumbList key="breadcrumb-list">
            {breadcrumbs.map((item, index) => (
              <BreadcrumbItem
                key={`bitem-${index}`}
                className="hidden md:block"
              >
                <BreadcrumbLink key={`blink-${index}`} href={item.url}>
                  {item.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};
