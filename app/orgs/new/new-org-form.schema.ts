import { z } from "zod";

export const NewOrgFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  planId: z.string({ required_error: "Please select a plan" }),
});

export type NewOrgFormType = z.infer<typeof NewOrgFormSchema>;
