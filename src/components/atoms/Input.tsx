import React, { forwardRef } from "react";
import clsx from "clsx";
import { InputProps } from "@/types/input.types";

const getInputClassName = ({
  leftIcon,
  rightIcon,
  errorMessage,
  isDisabled,
  isReadOnly,
}: InputProps) =>
  clsx(
    "w-full px-3 py-2 border transition-all focus:outline-none focus:ring-2",
    leftIcon && "pl-10",
    rightIcon && "pr-10",
    errorMessage
      ? "border-red-500 focus:ring-red-300"
      : "border-gray-300 focus:ring-blue-400",
    isDisabled && "opacity-50 cursor-not-allowed",
    isReadOnly && "bg-gray-100"
  );

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      errorMessage,
      leftIcon,
      rightIcon,
      isDisabled,
      isReadOnly,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}

        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            disabled={isDisabled}
            readOnly={isReadOnly}
            className={clsx(
              getInputClassName({
                leftIcon,
                rightIcon,
                errorMessage,
                isDisabled,
                isReadOnly,
              }),
              className
            )}
            {...props}
          />

          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2">
              {rightIcon}
            </span>
          )}
        </div>

        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
