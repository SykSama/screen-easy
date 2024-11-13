import { requiredAuth } from "@/features/auth/helper";
import { NewOrgForm } from "./new-org-form";

export default async function NewOrgPage() {
  //TODO: Add default param in organization
  //TODO: Add filter in sync with url
  //TODO: better UI

  await requiredAuth();
  return <NewOrgForm />;
}
