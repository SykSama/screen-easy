import { getMembershipRolesQuery } from "@/queries/membership-roles/get-membership-roles.query";
import { InviteMemberDialog } from "./invite-member-dialog";

export const PageContent = async () => {
  const roles = await getMembershipRolesQuery();
  return <InviteMemberDialog roles={roles} />;
};
