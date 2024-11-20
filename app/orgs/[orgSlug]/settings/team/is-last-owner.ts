import { ActionError } from "@/lib/actions/safe-actions";
import { logger } from "@/lib/logger";
import { createClient } from "@/utils/supabase/server";

export type IsLastOwnerProps = {
  orgId: string;
  userId: string;
};

export const isLastOwner = async ({ orgId, userId }: IsLastOwnerProps) => {
  const supabase = await createClient();

  const { data: owners } = await supabase
    .from("organization_memberships")
    .select("profile_id, role_id")
    .eq("organization_id", orgId)
    .eq("role_id", "OWNER")
    .neq("profile_id", userId)
    .throwOnError();

  logger.info({ owners }, "Owners");

  if (!owners) {
    throw new ActionError("Failed to fetch owners");
  }

  if (owners.length < 1) {
    throw new ActionError("You can't leave as the last owner");
  }
};
