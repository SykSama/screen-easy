"use server";
import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

export const getOrganizationFromSlugQuery = async (
  slug: string,
): Promise<Tables<"organizations">> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("organizations")
    .select("*")
    .eq("slug", slug)
    .limit(1)
    .single();

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};

export const getOrganizationSlugFromUrl = async () => {
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
