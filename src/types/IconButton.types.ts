export type IconButtonProps = {
  icon: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  disabled?: boolean;
  "aria-label": string; // 필수: 접근성 고려
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
