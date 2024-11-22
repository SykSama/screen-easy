import { z } from "zod";
import { zfd } from "zod-form-data";

export const SplitPdfSchema = zfd.formData({
  files: z.array(zfd.file()),
  splittingMethod: z.enum(["bookmarks", "ai"]),
  aiSplittingCriteria: z.string().optional(),
  renamingMethod: z.enum(["manual", "ai"]),
  aiRenamingCriteria: z.string().optional(),
  manualRenameTemplate: z.string().optional(),
  aiRenamingExample: z.string().optional(),
  saveAsZip: z.boolean().default(false),
});

export type SplitPdfFormValues = z.infer<typeof SplitPdfSchema>;
