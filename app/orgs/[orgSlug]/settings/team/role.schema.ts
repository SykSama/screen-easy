import { z } from "zod";

export const RoleSchema = z.object({
  userId: z.string(),
  roleId: z.string(),
});

export type RoleFormData = z.infer<typeof RoleSchema>;
