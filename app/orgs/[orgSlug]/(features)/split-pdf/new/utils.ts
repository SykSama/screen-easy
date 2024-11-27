import type { RenamingMethod, SplittingMethod } from "@/features/jobs/types";

export const formatSplittingMethod = (
  input: SplittingMethod,
): SplittingMethod => {
  if (input.splittingMethod === "ai") {
    return {
      splittingMethod: input.splittingMethod,
      aiSplittingCriteria: input.aiSplittingCriteria,
    };
  }

  return {
    splittingMethod: input.splittingMethod,
  };
};

export const formatRenamingMethod = (input: RenamingMethod): RenamingMethod => {
  if (input.renamingMethod === "ai") {
    return {
      renamingMethod: input.renamingMethod,
      aiRenamingCriteria: input.aiRenamingCriteria,
      aiRenamingExample: input.aiRenamingExample,
    };
  }

  return {
    renamingMethod: input.renamingMethod,
    manualRenameTemplate: input.manualRenameTemplate,
  };
};
