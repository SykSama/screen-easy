import {
  getOrgQuery,
  getOrgSlugFromUrl,
  isUserAuthorized,
} from "@/query/orgs/get-org.query";
import { OrganizationMembershipRole } from "@/query/orgs/orgs.type";
import { createClient } from "@/utils/supabase/server";
import {
  createMiddleware,
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";
import { OrganizationNotFoundError, UnauthorizedError } from "../errors/errors";
import { logger } from "../logger";

export class ActionError extends Error {}

export class SupabaseError extends Error {
  details: string;
  hint: string;
  code: string;

  constructor(context: {
    message: string;
    details: string;
    hint: string;
    code: string;
  }) {
    super(context.message);
    this.name = "PostgrestError";
    this.details = context.details;
    this.hint = context.hint;
    this.code = context.code;
  }
}

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

//PGRST116
const handleServerError: HandleServerError = (e, { ctx, metadata }) => {
  log.error(
    {
      message: e.message,
      cause: e.cause?.toString(),
      actionName: metadata.actionName,
      roles: metadata.roles,
      ctx: ctx,
    },
    "Action server error occurred",
  );

  if (e instanceof ActionError) {
    return e.message;
  }

  if (e instanceof SupabaseError) {
    if (e.code === "PGRST116") {
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

// TODO: This middleware should be removed from orgAction to avoid the double call to select org
const orgContextMiddleware = createMiddleware().define(async ({ next }) => {
  const orgSlug = await getOrgSlugFromUrl();

  if (!orgSlug) {
    //TODO: notFound() or redirect to /orgs ?
    notFound();
  }

  const org = await getOrgQuery(orgSlug);

  return next({ ctx: { org } });
});

export const orgAction = createSafeActionClient({
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
  .use(orgContextMiddleware)
  .use(async ({ next, ctx: { org, user }, metadata: { roles } }) => {
    try {
      await isUserAuthorized({
        userId: user.id,
        orgId: org.id,
        roles,
      });

      return next();
    } catch {
      throw new UnauthorizedError();
    }
  });
