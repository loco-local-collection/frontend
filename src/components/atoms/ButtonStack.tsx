import { cn } from "@/lib/utils";
import React from "react";

type ButtonStackProps = {
  children: React.ReactNode;
  direction?: "horizontal" | "vertical";
  gap?: "small" | "medium" | "large";
  fullWidth?: boolean;
  className?: string;
};

const gapStyles = {
  small: "gap-2",
  medium: "gap-4",
  large: "gap-6",
};

export const ButtonStack = ({
  children,
  direction = "horizontal",
  gap = "medium",
  fullWidth = false,
  className,
}: ButtonStackProps) => {
  return (
    <div
      className={cn(
        "flex",
        direction === "vertical" ? "flex-col" : "flex-row",
        gapStyles[gap],
        { "w-full": fullWidth }, // 전체 너비 적용
        className,
      )}
    >
      {children}
    </div>
  );
};
