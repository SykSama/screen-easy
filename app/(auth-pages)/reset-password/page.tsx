import { requiredAuth } from "@/features/auth/helper";

export default async function SetPasswordRoutePage() {
  const { user } = await requiredAuth();

  return <div>{JSON.stringify(user)}</div>;
}
