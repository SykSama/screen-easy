"use server";

import { orgProfileAction } from "@/lib/actions/safe-actions";
import { OrganizationMembershipRole } from "@/query/orgs/orgs.type";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { SplitPdfSchema } from "./split-pdf.schema";

export const splitPdfAction = orgProfileAction
  .schema(SplitPdfSchema)
  .metadata({
    actionName: "splitPdfAction",
    roles: OrganizationMembershipRole.options,
  })
  .action(async ({ parsedInput: { files }, ctx: { organization } }) => {
    const supabase = await createClient();

    // const promises = files.map(async (file) => {
    //   const { data, error } = await supabase.storage
    //     .from(organization.slug)
    //     .upload(file.name, file);

    //   return { data, error };
    // });

    // const results = await Promise.all(promises);

    throw new Error("Not implemented");

    revalidatePath(`/orgs/${organization.slug}/split-pdf`);
  });
