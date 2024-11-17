import { z } from "zod";

export const InviteMemberSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  roleId: z.string({ required_error: "Please select a role" }),
});

export type InviteMemberInput = z.infer<typeof InviteMemberSchema>;
