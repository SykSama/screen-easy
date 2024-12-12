import { MediaWithDurationSchema } from "@/features/medias/components/medias-selector";
import { z } from "zod";

export const CreateCollectionFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  medias: z.array(MediaWithDurationSchema).default([]),
});

export type CreateCollectionFormValues = z.infer<
  typeof CreateCollectionFormSchema
>;
