import { createClient } from "@/utils/supabase/server";

export type DeleteOrganizationQueryProps = {
  id: string;
};

export const deleteOrganizationQuery = async ({
  id,
}: DeleteOrganizationQueryProps): Promise<void> => {
  const supabase = await createClient();
  await supabase.from("organizations").delete().eq("id", id).throwOnError();
};
