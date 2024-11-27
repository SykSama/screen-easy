import { z } from "zod";

export const splittingMethodSchema = z.discriminatedUnion("splittingMethod", [
  z.object({ splittingMethod: z.literal("bookmarks") }),
  z.object({
    splittingMethod: z.literal("ai"),
    aiSplittingCriteria: z.string().min(1),
  }),
]);

export type SplittingMethod = z.infer<typeof splittingMethodSchema>;

export const renamingMethodSchema = z.discriminatedUnion("renamingMethod", [
  z.object({
    renamingMethod: z.literal("manual"),
    manualRenameTemplate: z.string().min(1),
  }),
  z.object({
    renamingMethod: z.literal("ai"),
    aiRenamingCriteria: z.string().min(1),
    aiRenamingExample: z.string().min(1),
  }),
]);

export type RenamingMethod = z.infer<typeof renamingMethodSchema>;

export const splittingProcessingConfigSchema = z
  .object({})
  .and(splittingMethodSchema)
  .and(renamingMethodSchema);

export type SplittingProcessingConfig = z.infer<
  typeof splittingProcessingConfigSchema
>;
