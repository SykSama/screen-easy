"use server";

import { orgProfileAction } from "@/lib/actions/safe-actions";
import { OrganizationMembershipRole } from "@/query/orgs/orgs.type";
import { createBatchJobQuery } from "@/query/pdf-batch-jobs/create-batch-job.query";
import { createPdfJobsQuery } from "@/query/pdf-jobs/create-pdf-jobs.query";
import { uploadFileQuery } from "@/query/storage/upload-file.query";
import type { TablesInsert } from "@/types/database.types";
import { startSplitPdfJob } from "../utils";
import { SplitPdfSchema } from "./split-pdf.schema";
import { formatRenamingMethod, formatSplittingMethod } from "./utils";

export const splitPdfAction = orgProfileAction
  .schema(SplitPdfSchema)
  .metadata({
    actionName: "splitPdfAction",
    roles: OrganizationMembershipRole.options,
  })
  .action(async ({ parsedInput, ctx: { organization, profile } }) => {
    // Create batch job
    const batchJob = await createBatchJobQuery({
      organization_id: organization.id,
      profile_id: profile.id,
      job_type: "split",
      total_files: parsedInput.files.length,
      status: "pending",
    });

    // Upload files
    const uploadPromises = parsedInput.files.map(async (file) => {
      const storagePath = `${organization.id}/batches/${batchJob.id}/originals/${file.name}`;

      const { storagePath: uploadedPath } = await uploadFileQuery({
        file,
        path: storagePath,
      });

      return {
        originalName: file.name,
        storagePath: uploadedPath,
      };
    });

    const uploadedFiles = await Promise.all(uploadPromises);

    // Create PDF jobs
    const jobs: TablesInsert<"pdf_jobs">[] = uploadedFiles.map(function (file) {
      const splittingMethodJson = formatSplittingMethod({
        ...parsedInput,
      });

      const renamingMethodJson = formatRenamingMethod({ ...parsedInput });

      return {
        batch_id: batchJob.id,
        original_filename: file.originalName,
        original_file_path: file.storagePath,
        status: "pending",
        processing_config: {
          ...splittingMethodJson,
          ...renamingMethodJson,
        },
      };
    });

    const createdJobs = await createPdfJobsQuery(jobs);

    const promises = createdJobs.map(async (job) => startSplitPdfJob(job.id));

    await Promise.all(promises);
  });
