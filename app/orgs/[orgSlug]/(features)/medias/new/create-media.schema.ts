import { z } from "zod";
import { zfd } from "zod-form-data";

export const CreateMediaFormSchema = zfd.formData({
  name: zfd.text(),
  description: zfd.text().optional(),
  files: z.array(zfd.file()).min(1).max(1),
  collectionIds: z.array(z.string()).default([]),
});

export type CreateMediaFormValues = z.infer<typeof CreateMediaFormSchema>;
