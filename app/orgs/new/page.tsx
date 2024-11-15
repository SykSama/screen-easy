import { requiredAuth } from "@/features/auth/helper";
import { NewOrgForm } from "./new-org-form";
import { generateDefaultOrgName, getOrganizationPlans } from "./new-org.utils";

export default async function NewOrgPage() {
  const { user } = await requiredAuth();
  const plans = await getOrganizationPlans();
  const defaultOrgName = generateDefaultOrgName(user.email ?? "");

  return (
    <NewOrgForm
      userEmail={user.email ?? ""}
      defaultOrgName={defaultOrgName}
      plans={plans}
    />
  );
}
