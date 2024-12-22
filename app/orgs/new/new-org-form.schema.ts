import { z } from "zod";

export const NewOrgFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "This email is invalid" }),
});

export type NewOrgFormType = z.infer<typeof NewOrgFormSchema>;
