import type { PropsWithChildren } from "react";

export type FormSectionProps = {
  title: string;
  description: string;
} & PropsWithChildren;

export const FormSection = ({
  title,
  description,
  children,
}: FormSectionProps) => {
  return (
    <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
      <div className="space-y-1">
        <h2 className="text-base/7 font-semibold">{title}</h2>
        <p data-slot="text" className="text-base/6 text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
};
