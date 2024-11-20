import { requiredAuth } from "@/features/auth/helper";
import { ResetPasswordForm } from "./reset-password-form";

export default async function ResetPasswordPage() {
  await requiredAuth();

  return <ResetPasswordForm />;
}
