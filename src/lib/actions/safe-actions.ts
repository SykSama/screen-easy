import { getOrganizationProfileRoleQuery } from "@/queries/orgs/get-organization-profile-role.query";
import { getOrganizationSlugFromUrl } from "@/queries/orgs/get-organization.query";

import { OrganizationMembershipRole } from "@/queries/orgs/organization.type";
import { createClient } from "@/utils/supabase/server";
import { StorageApiError, StorageUnknownError } from "@supabase/storage-js";
import {
  createMiddleware,
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";
import {
  ActionError,
  OrganizationNotFoundError,
  SupabasePostgrestActionError,
  SupabaseStorageActionError,
  UnauthorizedError,
} from "../errors/errors";
import { logger } from "../logger";

const log = logger.child({
  module: "ServerAction",
});

type HandleServerErrorUtils = {
  ctx: object;
  metadata: {
    actionName?: string | undefined;
    roles?: OrganizationMembershipRole[];
  };
};

type HandleServerError = (
  error: Error,
  utils: HandleServerErrorUtils,
) => string;

const handleServerError: HandleServerError = (e, { ctx, metadata }) => {
  log.error(
    {
      actionName: metadata.actionName,
      roles: metadata.roles,
      error: e,
      ctx: ctx,
    },
    "Action server error occurred",
  );

  if (e instanceof ActionError) {
    return e.message;
  }

  if (e instanceof SupabaseStorageActionError) {
    if (e.storageError instanceof StorageApiError) {
      return e.storageError.message;
    }

    if (e.storageError instanceof StorageUnknownError) {
      return e.storageError.message;
    }

    return e.message;
  }

  if (e instanceof SupabasePostgrestActionError) {
    if (e.postgrestError.code === "PGRST116") {
      return "You are not authorized to update this resource.";
    }

    return e.message;
  }

  if (e instanceof UnauthorizedError) {
    return "You are not authorized to access this resource.";
  }

  if (e instanceof OrganizationNotFoundError) {
    return redirect("/orgs");
  }

  return DEFAULT_SERVER_ERROR_MESSAGE;
};

export const action = createSafeActionClient({
  defineMetadataSchema: () => {
    return z.object({
      actionName: z.string().optional(),
    });
  },
  handleServerError: (e, { ctx, metadata }) => {
    return handleServerError(e, { ctx, metadata });
  },
});

const authMiddleware = createMiddleware().define(async ({ next }) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  return next({ ctx: { user } });
});

export const authAction = action.use(authMiddleware);

export const orgProfileAction = createSafeActionClient({
  defineMetadataSchema: () => {
    return z.object({
      actionName: z.string().optional(),
      roles: z.array(OrganizationMembershipRole),
    });
  },
  handleServerError: (e, { ctx, metadata }) => {
    return handleServerError(e, { ctx, metadata });
  },
})
  .use(authMiddleware)
  .use(async ({ next, ctx: { user }, metadata: { roles } }) => {
    const organizationSlug = await getOrganizationSlugFromUrl();

    if (!organizationSlug) {
      notFound();
    }

    const { organization, profile, role } =
      await getOrganizationProfileRoleQuery({
        profile_id: user.id,
        slug: organizationSlug,
        roles,
      });

    return next({ ctx: { organization, profile: { ...profile, role } } });
  });
