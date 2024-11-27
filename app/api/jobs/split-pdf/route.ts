import { ActionError, UnauthenticatedError } from "@/lib/errors/errors";
import { logger } from "@/lib/logger";
import { createPdfJobResultsQuery } from "@/query/pdf-job-results/create-pdf-job-results.query";
import { getPdfJobQuery } from "@/query/pdf-jobs/get-pdf-job.query";
import { updatePdfJobQuery } from "@/query/pdf-jobs/update-pdf-job.query";
import { downloadFileQuery } from "@/query/storage/download-file.query";
import { uploadFileQuery } from "@/query/storage/upload-file.query";
import { createClient } from "@/utils/supabase/server";
import { waitUntil } from "@vercel/functions";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";

export const maxDuration = 300; // 5 minutes
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const schema = z.object({
  jobId: z.string(),
});

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new UnauthenticatedError();

  try {
    const bodyRaw = await request.json();
    const { jobId } = schema.parse(bodyRaw);

    waitUntil(processPdf(jobId));
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400, statusText: "Bad Request" },
    );
  }

  return NextResponse.json({ message: "Processing started" });
}

async function processPdf(jobId: string) {
  logger.info(`Processing split PDF job for job ${jobId}`);

  try {
    // Get job details
    const job = await getPdfJobQuery(jobId);

    // Update job status to processing
    await updatePdfJobQuery({
      jobId,
      pdfJob: { status: "processing" },
    });

    // Download file
    const fileData = await downloadFileQuery(job.original_file_path);

    const results = await (job.processing_config.splittingMethod === "bookmarks"
      ? splitPdfByBookmarks(fileData)
      : splitPdfByAI(fileData, job.processing_config.aiSplittingCriteria));

    // Upload results and prepare job results data
    const jobResults = await Promise.all(
      results.map(async (result) => {
        const resultPath = job.original_file_path.replace(
          "/originals/",
          "/results/",
        );

        await uploadFileQuery({
          file: new File([result.file], result.filename),
          path: resultPath,
        });

        return {
          job_id: jobId,
          filename: result.filename,
          file_path: resultPath,
          size_bytes: result.file.size,
          metadata: result.metadata,
        };
      }),
    );

    // Save results
    await createPdfJobResultsQuery(jobResults);

    // Update job status to completed
    await updatePdfJobQuery({
      jobId,
      pdfJob: { status: "completed", error_message: null },
    });
  } catch (error) {
    logger.warn({ error }, "Error processing split-pdf job");

    await updatePdfJobQuery({
      jobId,
      pdfJob: {
        status: "failed",
        error_message: error instanceof Error ? error.message : "Unknown error",
      },
    });

    throw error;
  }
}

async function splitPdfByAI(
  fileData: Blob,
  aiSplittingCriteria: string,
): Promise<
  {
    filename: string;
    file: Blob;
    metadata: Record<string, string>;
  }[]
> {
  throw new ActionError("Function not implemented.");
}

async function splitPdfByBookmarks(fileData: Blob): Promise<
  {
    filename: string;
    file: Blob;
    metadata: Record<string, string>;
  }[]
> {
  throw new Error("Function not implemented.");
}
