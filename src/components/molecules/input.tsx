import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { disabledStyles } from "@/styles/styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error = "false", className, disabled, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={props.id}
            className={cn(
              "text-sm font-medium text-primary",
              disabled && "text-disabled",
            )}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full px-4 py-2 border rounded-md text-primary bg-primary",
            `focus-visible:ring-4 
            focus-visible:ring-[#2563eb] 
              focus-visible:ring-offset-2 
            focus-visible:ring-offset-white 
              focus-visible:outline-none`,
            disabled && `${disabledStyles}`,
            error && "text-danger",
            className,
          )}
          disabled={disabled}
          {...props}
        />
        {error && <p className="text-sm text-danger">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
