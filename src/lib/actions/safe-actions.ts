import { AuthError } from "@/features/auth/helper";
import { createSafeActionClient } from "next-safe-action";

export class ActionError extends Error {
  constructor(message: string) {
    super(message);
  }
}

type handleServerError = (e: Error) => string;

const handleServerError: handleServerError = (e) => {
  if (e instanceof ActionError) {
    // logger.info("[DEV] - Action Error", e.message);
    return e.message;
  }

  if (e instanceof AuthError) {
    // logger.info("[DEV] - Auth Error", e.message);
    return e.message;
  }

  // logger.info("[DEV] - Unknown Error", e);

  return "An unexpected error occurred.";
};

export const action = createSafeActionClient({
  handleServerError,
});
