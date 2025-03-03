import { IconButtonProps } from "@/types/IconButton.types";
import clsx from "clsx";
import React from "react";

const getIconButtonClassName = ({
  variant,
  size,
  isLoading,
  disabled,
  className,
}: IconButtonProps) =>
  clsx(
    "flex items-center justify-center rounded-full transition-all focus:outline-none focus:ring-2 focus-visible:ring-offset-2",
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
      sm: "w-8 h-8 p-1",
      md: "w-10 h-10 p-2",
      lg: "w-12 h-12 p-3",
    }[size || "md"],
    (disabled || isLoading) && "opacity-50 cursor-not-allowed",
    className
  );

export const IconButton = ({
  icon,
  variant = "primary",
  size = "md",
  isLoading,
  disabled,
  className,
  ...props
}: IconButtonProps) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={getIconButtonClassName({
        icon,
        variant,
        size,
        isLoading,
        disabled,
        className,
        "aria-label": props["aria-label"],
      })}
      {...props}
    >
      {isLoading ? (
        <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
      ) : (
        <span className="flex items-center justify-center">{icon}</span>
      )}
    </button>
  );
};
