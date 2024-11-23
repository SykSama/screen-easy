import type { StorageError } from "@supabase/storage-js";
import type { PostgrestError } from "@supabase/supabase-js";
import { DEFAULT_SERVER_ERROR_MESSAGE } from "next-safe-action";

export class UnauthenticatedError extends Error {}

export class OrganizationNotFoundError extends Error {}

export class UnauthorizedError extends Error {}

export class NotFoundError extends Error {}

// Server action errors
export class ActionError extends Error {}

export class SupabaseStorageActionError extends ActionError {
  storageError: StorageError;

  constructor(storageError: StorageError) {
    super(DEFAULT_SERVER_ERROR_MESSAGE);
    this.name = "SupabaseStorageActionError";
    this.storageError = storageError;
  }
}

export class SupabasePostgrestActionError extends ActionError {
  postgrestError: PostgrestError;

  constructor(postgrestError: PostgrestError) {
    super(postgrestError.message);
    this.name = "SupabasePostgrestActionError";
    this.postgrestError = postgrestError;
  }
}
