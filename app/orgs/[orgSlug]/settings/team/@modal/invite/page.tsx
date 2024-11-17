import { Suspense } from "react";
import { PageContent } from "./page-content";

export default async function InviteMemberModal() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
