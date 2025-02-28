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
      role="region"
      aria-labelledby={title ? `card-title-${title}` : undefined}
      className={cn(
        "rounded-md border border-primary bg-primary p-4 shadow-cast-16 transition",
        "hover:shadow-cast-24",
        { [disabledStyles]: disabled }, // ✅ undefined 방지
        className,
      )}
    >
      {(title || description) && (
        <div className="mb-2">
          {title && (
            <h2
              id={`card-title-${title}`}
              className="text-lg font-semibold text-primary"
            >
              {title}
            </h2>
          )}
          {description && (
            <p className="text-sm text-secondary">{description}</p>
          )}
        </div>
      )}
      {children && <div className="mt-2">{children}</div>}
    </div>
  );
};
