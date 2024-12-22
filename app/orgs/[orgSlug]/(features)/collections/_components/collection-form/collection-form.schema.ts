import { MediaInCollectionSchema } from "@/features/medias/types";
import { z } from "zod";

export const CollectionFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "You need to give a name to your collection"),
  description: z.string().optional(),
  medias: z.array(MediaInCollectionSchema).default([]),
});

export type CreateCollectionFormValues = z.infer<typeof CollectionFormSchema>;
