import type { PropsWithChildren } from "react";

import { cn } from "@/utils/cn";
import { Typography } from "./ui/typography";

export const FormSection = (props: PropsWithChildren) => {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-14 xl:px-24 2xl:px-32">
      <div className="flex flex-col gap-3 py-6 md:grid-cols-12 lg:grid lg:py-8">
        {props.children}
      </div>
    </div>
  );
};

export type FormSectionSideProps = {
  col?: 4 | 8 | 12;
} & PropsWithChildren &
  React.HTMLAttributes<HTMLDivElement>;

export const FormSectionSide = (props: FormSectionSideProps) => {
  return (
    <div className={cn(`col-span-${props.col}`, props.className)}>
      {props.children}
    </div>
  );
};

export type FormSectionHeaderProps = {
  title: string;
  description: string;
} & PropsWithChildren;

export const FormSectionHeader = (props: FormSectionHeaderProps) => {
  return (
    <div className="sticky top-12 space-y-2">
      <Typography variant="h3">{props.title}</Typography>
      <Typography variant="muted">{props.description}</Typography>
    </div>
  );
};
