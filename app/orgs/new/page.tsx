import { requiredAuth } from "@/features/auth/helper";
import { NewOrgForm } from "./new-org-form";

export default async function NewOrgPage() {
  await requiredAuth();
  return <NewOrgForm />;
}
