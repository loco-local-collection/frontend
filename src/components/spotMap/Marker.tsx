import { cn } from "@/lib/utils";

interface MarkerProps {
  className?: string;
}

export default function Marker({ className }: MarkerProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full shadow-md",
        className,
      )}
    >
      <span className="text-white font-bold"></span>
    </div>
  );
}
