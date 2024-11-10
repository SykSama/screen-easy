import { auth } from "@/features/auth/helper";
import { getProfileOrgsQuery } from "@/query/orgs/get-users-orgs.query";
import { getServerUrl } from "@/utils/server-url";
import { NextResponse } from "next/server";

export const GET = async () => {
  const { user } = await auth();

  if (!user) {
    return NextResponse.redirect(`${getServerUrl()}/sign-in`);
  }

  const orgs = await getProfileOrgsQuery(user.id);

  if (orgs.length === 0) {
    return NextResponse.redirect(new URL("/orgs/new", getServerUrl()));
  }

  return NextResponse.redirect(
    new URL(`/orgs/${orgs[0].organizations.slug}`, getServerUrl()),
  );
};
