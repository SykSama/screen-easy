import { z } from "zod";

export const GeneralSettingsFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  slug: z.string().optional(),
});

export const DeleteOrgSchema = z.object({});
