import { z } from "zod";

export const UpdateMediaFormSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  collectionIds: z.array(z.string().uuid()),
});
