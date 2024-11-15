import { z } from "zod";

export const GeneralSettingsFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  slug: z.string().optional(),
  orgId: z.string().uuid(),
});

export const DeleteOrgSchema = z.object({
  orgId: z.string().uuid(),
});
