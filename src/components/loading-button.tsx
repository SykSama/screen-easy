"use client";

import type { ButtonProps } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Icons } from "./ui/icons";

type LoadingButtonProps = ButtonProps & {
  isLoading?: boolean;
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
