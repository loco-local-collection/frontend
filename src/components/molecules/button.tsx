import { cn } from "@/lib/utils";
import { disabledStyles, focusRing } from "@/styles/styles";

type ButtonVariant = "primary" | "secondary" | "destructive";
type ButtonStyleType = "filled" | "outlined" | "transparent";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  styleType?: ButtonStyleType;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
}

const buttonStyles = {
  primary: {
    filled: `      
      bg-interactive-primary 
      text-interactive-inverse
      hover:bg-interactive-primary-hovered 
      active:bg-interactive-primary-pressed
      ${focusRing}
    `,
    outlined: `
      border 
      border-interactive-primary
      text-interactive-primary
      hover:border-interactive-primary-hovered
      hover:bg-interactive-secondary-hovered
      hover:text-interactive-primary-hovered
      active:border-interactive-primary-pressed
      hover:bg-interactive-secondary-hovered
      active:text-interactive-primary-pressed
      ${focusRing}
    `,
    transparent: `      
      text-interactive-primary
      hover:text-interactive-primary-hovered 
      hover:bg-interactive-secondary-hovered 
      active:text-interactive-primary-pressed
      active:bg-interactive-secondary-pressed
      ${focusRing}
    `,
  },
  secondary: {
    filled: `      
      bg-interactive-secondary 
      text-interactive-secondary 
      hover:text-interactive-secondary-hovered 
      active:text-interactive-secondary-pressed 
      hover:bg-interactive-secondary-hovered 
      active:bg-interactive-secondary-pressed
      ${focusRing}
      `,
    outlined: `
      border 
      border-interactive-secondary
      text-interactive-secondary
      hover:border-interactive-secondary-hovered
      hover:bg-interactive-secondary-hovered
      active:border-interactive-secondary-pressed
      active:bg-interactive-secondary-pressed
      ${focusRing}
    `,
    transparent: `      
      text-interactive-secondary 
      hover:text-interactive-secondary-hovered 
      active:text-interactive-secondary-pressed 
      hover:bg-interactive-secondary-hovered 
      active:bg-interactive-secondary-pressed
      ${focusRing}
      `,
  },
  destructive: {
    filled: `      
      bg-interactive-danger 
      text-interactive-inverse 
      hover:bg-interactive-danger-hovered 
      active:bg-interactive-danger-pressed
      ${focusRing}
      `,
    outlined: "",
    transparent: "",
  },
};

const Button = ({
  variant = "primary",
  styleType = "filled",
  leftIcon,
  rightIcon,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all",
        buttonStyles[variant]?.[styleType],
        disabled && `${disabledStyles}`,
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span>{leftIcon}</span>}
      {children}
      {rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};

export default Button;
