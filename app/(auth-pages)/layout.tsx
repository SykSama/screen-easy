export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-1">
      <main className="border-default flex flex-1 shrink-0 flex-col items-center border-r px-5 pb-8 pt-16 shadow-lg">
        {children}
        <div className="sm:text-center">
          <p className="text-foreground-lighter text-xs sm:mx-auto sm:max-w-sm">
            By continuing, you agree to Screen Easy's{" "}
            <a
              className="hover:text-foreground-light underline"
              href="https://supabase.com/terms"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              className="hover:text-foreground-light underline"
              href="https://supabase.com/privacy"
            >
              Privacy Policy
            </a>
            , and to receive periodic emails with updates.
          </p>
        </div>
      </main>
      <aside className="hidden flex-1 shrink basis-1/4 flex-col items-center justify-center xl:flex">
        Picture
      </aside>
    </div>
  );
}
