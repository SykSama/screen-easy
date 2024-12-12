import type { Tables } from "@/types/database.types";
import { z } from "zod";

type MediaWithDuration = Tables<"media"> & { duration: number };

const MediaWithDurationSchema: z.ZodType<MediaWithDuration> = z.any();

export const CreateCollectionFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  medias: z.array(MediaWithDurationSchema).default([]),
});

export type CreateCollectionFormValues = z.infer<
  typeof CreateCollectionFormSchema
>;
