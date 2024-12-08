import { z } from "zod";

const MediaWithDurationSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  duration: z.number(),
});

export type MediaWithDuration = z.infer<typeof MediaWithDurationSchema>;

export const CreateCollectionFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  medias: z.array(MediaWithDurationSchema).default([]),
});

export type CreateCollectionFormValues = z.infer<
  typeof CreateCollectionFormSchema
>;
