import type { PropsWithChildren } from "react";

const FormLayout = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};

const FormSectionLayout = ({ children }: PropsWithChildren) => {
  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-12 sm:gap-8">
      {children}
    </section>
  );
};

type FormInformationLayoutProps = {
  title?: string;
  description?: string;
} & PropsWithChildren;

const FormInformationLayout = ({
  children,
  title,
  description,
}: FormInformationLayoutProps) => {
  return (
    <div className="space-y-1 sm:col-span-4">
      {title && <h2 className="text-base/7 font-semibold">{title}</h2>}
      {description && (
        <p data-slot="text" className="text-base/6 text-muted-foreground">
          {description}
        </p>
      )}
      {children}
    </div>
  );
};

const FormActionsLayout = ({ children }: PropsWithChildren) => {
  return <div className="space-y-1 sm:col-span-8">{children}</div>;
};

FormLayout.Section = FormSectionLayout;
FormLayout.Information = FormInformationLayout;
FormLayout.Actions = FormActionsLayout;

export default FormLayout;
