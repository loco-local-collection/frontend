// 📌 Button.tsx
import { ButtonProps } from "@/types/Button.types";
import clsx from "clsx";

const getButtonClassName = (
  variant: ButtonProps["variant"],
  size: ButtonProps["size"],
  disabled: boolean,
  isLoading: boolean
) => {
  return clsx(
    "flex items-center justify-center rounded-md font-medium transition-all focus:outline-none",
    "focus-visible:ring-2 focus-visible:ring-offset-2",
    {
      primary:
        "bg-blue-500 text-white hover:bg-blue-600 focus-visible:ring-blue-400",
      secondary:
        "bg-gray-300 text-gray-700 hover:bg-gray-400 focus-visible:ring-gray-400",
      outline:
        "border border-gray-500 text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500",
      danger:
        "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-400",
    }[variant || "primary"],
    {
      sm: "px-2 py-1 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    }[size || "md"],
    (disabled || isLoading) && "opacity-50 cursor-not-allowed"
  );
};

const getButtonContent = (
  isLoading: boolean,
  leftIcon?: React.ReactNode,
  rightIcon?: React.ReactNode,
  children?: React.ReactNode
) => {
  if (isLoading) {
    return (
      <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
    );
  }
  return (
    <>
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </>
  );
};

export const Button = ({
  variant = "primary",
  size = "md",
  disabled = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={clsx(
        getButtonClassName(variant, size, disabled, isLoading),
        className
      )}
      {...props}
    >
      {getButtonContent(isLoading, leftIcon, rightIcon, children)}
    </button>
  );
};
