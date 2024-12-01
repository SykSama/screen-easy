import { z } from "zod";

const OrganizationMembershipRoleValues = ["OWNER", "ADMIN", "MEMBER"] as const;
export const OrganizationMembershipRole = z.enum(
  OrganizationMembershipRoleValues,
);
export type OrganizationMembershipRole = z.infer<
  typeof OrganizationMembershipRole
>;
