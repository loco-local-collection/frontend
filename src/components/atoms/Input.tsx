import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, disabled, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`; // ID 자동 생성

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium text-primary",
              disabled && "text-disabled cursor-not-allowed", // label도 비활성화 UI 반영
            )}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId} // 자동 생성된 ID 적용
          className={cn(
            "w-full px-4 py-2 border rounded-md text-primary bg-primary transition-all",
            "focus-visible:ring-4 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none",
            disabled && "cursor-not-allowed opacity-50", // disabled 상태 UX 개선
            error ? "border-danger text-danger" : "border-gray-300",
            className,
          )}
          disabled={disabled}
          aria-invalid={!!error} // 접근성(A11Y) 개선
          {...props}
        />
        {!!error && <p className="text-sm text-danger">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
