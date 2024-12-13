import { MediaInCollectionSchema } from "@/features/medias/types";
import { z } from "zod";

export const CollectionFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  medias: z.array(MediaInCollectionSchema).default([]),
});

export type CreateCollectionFormValues = z.infer<typeof CollectionFormSchema>;
