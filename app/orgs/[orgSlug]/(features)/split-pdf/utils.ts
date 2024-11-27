"use server";

import { ActionError } from "@/lib/errors/errors";
import { logger } from "@/lib/logger";
import { getServerUrl } from "@/utils/server-url";
import { cookies } from "next/headers";

export const startSplitPdfJob = async (jobId: string) => {
  const cookieStore = await cookies();

  logger.info(`Starting split PDF job for job ${jobId}`);

  try {
    await fetch(`${getServerUrl()}/api/jobs/split-pdf`, {
      method: "POST",
      body: JSON.stringify({ jobId }),
      headers: {
        cookie: cookieStore.toString(),
      },
    });
  } catch (error) {
    throw new ActionError("Something went wrong while starting the job", {
      cause: error,
    });
  }
};
