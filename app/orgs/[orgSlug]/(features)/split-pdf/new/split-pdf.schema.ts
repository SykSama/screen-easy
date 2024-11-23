import { z } from "zod";
import { zfd } from "zod-form-data";

export const SplitPdfSchema = zfd
  .formData({
    files: z.array(zfd.file()),
    splittingMethod: z.enum(["bookmarks", "ai"]),
    aiSplittingCriteria: z.string().optional(),
    renamingMethod: z.enum(["manual", "ai"]),
    manualRenameTemplate: z.string().optional(),
    aiRenamingCriteria: z.string().optional(),
    aiRenamingExample: z.string().optional(),
    saveAsZip: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (data.splittingMethod === "ai") {
        return !!data.aiSplittingCriteria;
      }

      return true;
    },
    {
      message:
        "AI splitting criteria is required when using AI splitting method",
    },
  )
  .refine(
    (data) => {
      switch (data.renamingMethod) {
        case "manual":
          return !!data.manualRenameTemplate;
        case "ai":
          return !!data.aiRenamingCriteria && !!data.aiRenamingExample;
        default:
          return true;
      }
    },
    { message: "Required fields missing for selected renaming method" },
  );

export type SplitPdfFormValues = z.infer<typeof SplitPdfSchema>;
