"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import * as React from "react";

type LoadingButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  children: React.ReactNode;
};

export const LoadingButton = ({
  children,
  isLoading = false,
  disabled,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button disabled={disabled ?? isLoading} {...props}>
      {isLoading && <Icons.spinner className="mr-2 size-4 animate-spin" />}
      {children}
    </Button>
  );
};
