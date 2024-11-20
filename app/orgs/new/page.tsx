import { requiredAuth } from "@/features/auth/helper";
import { NewOrgForm } from "./new-org-form";
import { generateDefaultOrgName } from "./new-org.utils";

export default async function NewOrgPage() {
  const { user } = await requiredAuth();

  const defaultOrgName = generateDefaultOrgName(user.email ?? "");

  return (
    <NewOrgForm userEmail={user.email ?? ""} defaultOrgName={defaultOrgName} />
  );
}
