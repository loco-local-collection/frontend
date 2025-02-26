import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { disabledStyles } from "@/styles/styles";

interface CardProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
}

export const Card = ({
  title,
  description,
  children,
  className,
  disabled,
}: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-md border border-primary bg-primary p-4 shadow-cast-16 transition",
        "hover:shadow-cast-24",
        disabled && `${disabledStyles}`,
        className,
      )}
    >
      {title && <h2 className="text-lg font-semibold text-primary">{title}</h2>}
      {description && <p className="text-sm text-secondary">{description}</p>}
      <div>{children}</div>
    </div>
  );
};
