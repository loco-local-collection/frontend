import { cn } from "@/lib/utils";
import { disabledStyles } from "@/styles/styles";

type ButtonVariant = "primary" | "secondary" | "destructive";
type ButtonStyleType = "filled" | "outlined" | "transparent";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  styleType?: ButtonStyleType;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean; // 추가됨
}

const buttonStyles = {
  primary: {
    filled: cn(
      "bg-interactive-primary text-interactive-inverse",
      "hover:bg-interactive-primary-hovered active:bg-interactive-primary-pressed",
      "focus-visible:ring-4 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none",
    ),
    outlined: cn(
      "border border-interactive-primary text-interactive-primary",
      "hover:border-interactive-primary-hovered hover:bg-interactive-secondary-hovered",
      "active:border-interactive-primary-pressed active:bg-interactive-secondary-pressed",
      "focus-visible:ring-4 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none",
    ),
    transparent: cn(
      "text-interactive-primary hover:text-interactive-primary-hovered",
      "hover:bg-interactive-secondary-hovered active:bg-interactive-secondary-pressed",
      "focus-visible:ring-4 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none",
    ),
  },
  secondary: {
    filled: cn(
      "bg-interactive-secondary text-interactive-secondary ",
      "hover:text-interactive-secondary-hovered hover:bg-interactive-secondary-hovered ",
      "active:text-interactive-secondary-pressed active:bg-interactive-secondary-pressed",
      "focus-visible:ring-4 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none",
    ),
    outlined: cn(
      "border border-interactive-secondary text-interactive-secondary",
      "hover:border-interactive-secondary-hovered hover:bg-interactive-secondary-hovered",
      "active:border-interactive-secondary-pressed active:bg-interactive-secondary-pressed",
      "focus-visible:ring-4 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none",
    ),
    transparent: cn(
      "text-interactive-secondary ",
      "hover:text-interactive-secondary-hovered  hover:bg-interactive-secondary-hovered ",
      "active:text-interactive-secondary-pressed  active:bg-interactive-secondary-pressed",
      "focus-visible:ring-4 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none",
    ),
  },
  destructive: {
    filled: cn(
      "bg-interactive-danger text-interactive-inverse",
      "hover:bg-interactive-danger-hovered",
      "active:bg-interactive-danger-pressed",
      "focus-visible:ring-4 focus-visible:ring-[#dc2626] focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none",
    ),
    outlined: cn(
      "border border-interactive-danger text-interactive-danger",
      "hover:border-interactive-danger-hovered hover:bg-interactive-danger-hovered",
      "active:border-interactive-danger-pressed active:bg-interactive-danger-pressed",
      "focus-visible:ring-4 focus-visible:ring-[#dc2626] focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none",
    ),
    transparent: cn(
      "text-interactive-danger hover:text-interactive-danger-hovered",
      "hover:bg-interactive-secondary-hovered active:bg-interactive-secondary-pressed",
      "focus-visible:ring-4 focus-visible:ring-[#dc2626] focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none",
    ),
  },
};

export const Button = ({
  variant = "primary",
  styleType = "filled",
  leftIcon,
  rightIcon,
  disabled,
  isLoading,
  fullWidth = false, // 기본값 추가
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all",
        buttonStyles[variant]?.[styleType],
        {
          [disabledStyles]: disabled || isLoading,
          "pointer-events-none opacity-50": disabled || isLoading,
          "w-full": fullWidth, // fullWidth 적용
        },
        className,
      )}
      aria-disabled={disabled || isLoading}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="animate-spin w-4 h-4 border-2 border-t-transparent border-current rounded-full"></span>
      ) : (
        <>
          {leftIcon && <span>{leftIcon}</span>}
          {children}
          {rightIcon && <span>{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
