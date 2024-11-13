import { LandingHeader } from "@/features/landing/components/landing-header";

export default async function RootPage() {
  return (
    <>
      <LandingHeader />
      <main className="flex flex-1 flex-col gap-6 px-4">
        <div className="">Landing Page</div>
      </main>
    </>
  );
}
