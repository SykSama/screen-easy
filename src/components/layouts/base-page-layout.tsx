import { Separator } from "@radix-ui/react-separator";
import type { PropsWithChildren } from "react";

type BasePageLayoutProps = PropsWithChildren & {
  title?: string;
};

export const BasePageLayout = ({ children, title }: BasePageLayoutProps) => {
  return (
    <div className="grow px-6 py-2 lg:rounded-lg lg:p-6 lg:shadow-sm">
      <div className="mx-auto max-w-6xl">
        {title && (
          <>
            <h1 className="text-2xl font-bold">{title}</h1>
            <Separator className="my-10 mt-6" />
          </>
        )}
        {children}
      </div>
    </div>
  );
};
