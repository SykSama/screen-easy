import { z } from "zod";

export const CreateCollectionFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

export type CreateCollectionFormValues = z.infer<
  typeof CreateCollectionFormSchema
>;
