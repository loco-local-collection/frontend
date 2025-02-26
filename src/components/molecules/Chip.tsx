import { cn } from "@/lib/utils";

type ChipVariant = "default" | "primary" | "success" | "warning" | "danger";
type ChipSize = "sm" | "md" | "lg";

interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: ChipVariant;
  size?: ChipSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

const chipStyles = {
  default: "bg-gray-200 text-gray-800",
  primary: "bg-blue-500 text-white",
  success: "bg-green-500 text-white",
  warning: "bg-yellow-500 text-gray-900",
  danger: "bg-red-500 text-white",
};

const chipSizeStyles = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-3 py-1",
  lg: "text-base px-4 py-2",
};

export const Chip = ({
  variant = "default",
  size = "md",
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}: ChipProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium gap-2",
        chipStyles[variant],
        chipSizeStyles[size],
        className,
      )}
      {...props}
    >
      {leftIcon && <span>{leftIcon}</span>}
      {children}
      {rightIcon && <span>{rightIcon}</span>}
    </span>
  );
};
