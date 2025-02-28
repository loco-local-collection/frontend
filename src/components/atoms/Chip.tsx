import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type ChipVariant = "default" | "primary" | "success" | "warning" | "danger";
type ChipSize = "sm" | "md" | "lg";

interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  label?: string;
  variant?: ChipVariant;
  size?: ChipSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  removable?: boolean; // 삭제 가능 여부 추가
  onRemove?: () => void; // 삭제 핸들러 추가
  className?: string;
}

const chipStyles = {
  default: "bg-gray-200 text-gray-800 border border-gray-300 shadow-sm",
  primary: "bg-blue-500 text-white border border-blue-600 shadow-sm",
  success: "bg-green-500 text-white border border-green-600 shadow-sm",
  warning: "bg-yellow-500 text-gray-900 border border-yellow-400 shadow-sm",
  danger: "bg-red-500 text-white border border-red-600 shadow-sm",
};

const chipSizeStyles = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-3 py-1",
  lg: "text-base px-4 py-2",
};

const iconSizeStyles = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export const Chip = ({
  label,
  variant = "default",
  size = "md",
  leftIcon,
  rightIcon,
  removable = false,
  onRemove,
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
      {leftIcon && (
        <span className={cn(iconSizeStyles[size])} aria-hidden="true">
          {leftIcon}
        </span>
      )}
      {label || children}
      {rightIcon && (
        <span className={cn(iconSizeStyles[size])} aria-hidden="true">
          {rightIcon}
        </span>
      )}

      {removable && onRemove && (
        <button
          onClick={onRemove}
          className="p-0.5 rounded-full hover:bg-opacity-20 transition focus:outline-none"
          aria-label="삭제"
        >
          <X size={14} className="text-current" />
        </button>
      )}
    </span>
  );
};
