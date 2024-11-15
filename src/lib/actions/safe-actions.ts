import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { z } from "zod";
import { logger } from "../logger";

export class ActionError extends Error {}

const log = logger.child({
  module: "action",
});

export const action = createSafeActionClient({
  defineMetadataSchema: () => {
    return z.object({
      actionName: z.string().optional(),
    });
  },
  handleServerError: (e, { ctx, metadata }) => {
    log.error(
      {
        message: e.message,
        cause: e.cause?.toString(),
        actionName: metadata.actionName,
        ctx: ctx,
      },
      "Action server error occurred",
    );

    if (e instanceof ActionError) {
      console.log("e.cause", e.cause);
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});
