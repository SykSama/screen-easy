import { auth } from "@/features/auth/helper";
import { getProfileOrganizationsRolesQuery } from "@/queries/orgs/get-profile-organizations-roles.query";

import { getServerUrl } from "@/utils/server-url";
import { NextResponse } from "next/server";

export const GET = async () => {
  const { user } = await auth();

  if (!user) {
    return NextResponse.redirect(`${getServerUrl()}/sign-in`);
  }

  const profileWithOrgs = await getProfileOrganizationsRolesQuery({
    profile_id: user.id,
  });

  if (profileWithOrgs.length === 0) {
    return NextResponse.redirect(new URL("/orgs/new", getServerUrl()));
  }

  const url = new URL(
    `/orgs/${profileWithOrgs[0].organizations.slug}/dashboard`,
    getServerUrl(),
  );

  return NextResponse.redirect(url);
};
