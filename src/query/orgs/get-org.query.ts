"use server";

import { UnauthorizedError } from "@/lib/errors/errors";
import { logger } from "@/lib/logger";
import type { Tables } from "@/types/database.generated.types";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { OrganizationMembershipRole } from "./orgs.type";

const log = logger.child({
  module: "getOrgQuery",
});

type IsUserAuthorizedParams = {
  userId: string;
  orgId: string;
  roles: OrganizationMembershipRole[];
};

export const isUserAuthorized = async ({
  userId,
  orgId,
  roles,
}: IsUserAuthorizedParams) => {
  const supabase = await createClient();

  const { data } = await supabase
    .from("organization_memberships")
    .select("*")
    .eq("profile_id", userId)
    .eq("organization_id", orgId)
    .in("role_id", roles)
    .limit(1)
    .single();

  if (!data) {
    throw new UnauthorizedError();
  }

  return { role: data.role_id };
};

export const getOrgQuery = async (
  slug: string,
): Promise<Tables<"organizations">> => {
  const supabase = await createClient();

  try {
    const { data } = await supabase
      .from("organizations")
      .select("*")
      .eq("slug", slug)
      .limit(1)
      .single()
      .throwOnError();

    if (!data) {
      notFound();
    }

    return data;
  } catch (err) {
    log.error(err);
    throw err;
  }
};

export const getOrgSlugFromUrl = async () => {
  const headerList = await headers();
  const xURL = headerList.get("x-url");

  if (!xURL) {
    return null;
  }

  // get the parameters after /orgs/ or /organizations/ and before a / or ? (if there are params)
  const match = xURL.match(/\/(?:orgs|organizations)\/([^/?]+)(?:[/?]|$)/);

  if (!match) {
    return null;
  }

  const organizationSlug = match[1];

  if (!organizationSlug) {
    return null;
  }

  return organizationSlug;
};
