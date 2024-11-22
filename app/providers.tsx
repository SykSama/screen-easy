"use client";

import { Toaster } from "@/components/ui/sonner";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CheckCircle2Icon, XCircleIcon } from "lucide-react";
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <Toaster
          // className="bg-black"
          duration={300000}
          position="top-right"
          closeButton={true}
          toastOptions={{
            className: "gap-4",
          }}
          icons={{
            success: <CheckCircle2Icon />,
            error: <XCircleIcon />,
            // close: <XIcon className="size-8" />,
          }}
        />
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
};
