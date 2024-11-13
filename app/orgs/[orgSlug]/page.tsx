import type { PageParams } from "@/types/next";
import { redirect } from "next/navigation";

export default async function DashboardPage(
  props: PageParams<{ orgSlug: string }>,
) {
  const { orgSlug } = await props.params;
  redirect(`/orgs/${orgSlug}/dashboard`);
}
