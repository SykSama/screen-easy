import { AccountSidebar } from "@/components/account-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { requiredAuth } from "@/features/auth/helper";
import type { LayoutParams } from "@/types/next";

export default async function AccountLayout(props: LayoutParams) {
  await requiredAuth();

  return (
    <SidebarProvider>
      <AccountSidebar />
      <SidebarInset>{props.children}</SidebarInset>
    </SidebarProvider>
  );
}
