import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { GeistSans } from "geist/font/sans";

import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex min-h-screen flex-col items-center">
            <div className="flex w-full flex-1 flex-col items-center gap-20">
              <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
                <div className="flex w-full max-w-5xl items-end justify-end space-x-2 p-3 px-5 text-sm">
                  <Button asChild>
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/sign-up">Sign Up</Link>
                  </Button>
                </div>
              </nav>
              <div className="flex max-w-5xl flex-col gap-20 p-5">
                {children}
              </div>

              <footer className="mx-auto flex w-full items-center justify-center gap-8 border-t py-16 text-center text-xs">
                <ThemeSwitcher />
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
