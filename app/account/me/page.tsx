import { NavBreadcrumb } from "@/components/nav-breadcrumb";
import { requiredAuth } from "@/features/auth/helper";
import { ProfileForm } from "./profile-form";

export default async function MePage() {
  const { user } = await requiredAuth();

  return (
    <>
      <NavBreadcrumb
        breadcrumbs={[
          { name: "Settings", url: "/account" },
          { name: "Profile", url: "/account/me" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h1 className="text-2xl font-bold">Profile Settings</h1>
        <div className="flex flex-col gap-6">
          <ProfileForm initialData={{ email: user.email ?? "" }} />
        </div>
      </div>
    </>
  );
}
