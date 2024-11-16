import { NavBreadcrumb } from "@/components/nav-breadcrumb";

export default async function MePage() {
  return (
    <>
      <NavBreadcrumb
        breadcrumbs={[
          { name: "Settings", url: "/account" },
          { name: "Preferences", url: "/account/me" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h1>Dashboard for User</h1>
      </div>
    </>
  );
}
