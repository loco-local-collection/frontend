export type InputProps = {
  label?: string;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
