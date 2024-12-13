import { z } from "zod";

export const AddDeviceFormSchema = z.object({
  code: z
    .string()
    .min(6, "Code must be 6 characters")
    .max(6, "Code must be 6 characters"),
});

export type AddDeviceFormValues = z.infer<typeof AddDeviceFormSchema>;
