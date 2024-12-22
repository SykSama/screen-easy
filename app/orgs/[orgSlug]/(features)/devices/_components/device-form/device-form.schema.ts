import { z } from "zod";

export const DeviceFormSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Name is required"),
  description: z.string().nullable(),
  device_group_id: z.string().uuid().nullable(),
  collection_id: z.string().uuid().nullable(),
});

export type DeviceFormValues = z.infer<typeof DeviceFormSchema>;
