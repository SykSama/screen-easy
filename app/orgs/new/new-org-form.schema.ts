import { z } from "zod";

export const NewOrgFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters long" })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug can only contain lowercase letters, numbers, and hyphens",
    }),
});

export type NewOrgFormType = z.infer<typeof NewOrgFormSchema>;
