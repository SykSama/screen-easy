import { splittingProcessingConfigSchema } from "@/features/jobs/types";
import { z } from "zod";
import { zfd } from "zod-form-data";

export const SplitPdfSchema = zfd
  .formData({
    files: z.array(zfd.file()),
  })
  .and(splittingProcessingConfigSchema);

export type SplitPdfFormValues = z.infer<typeof SplitPdfSchema>;
