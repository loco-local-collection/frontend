import { cn } from "@/lib/utils";
import { Chip } from "./Chip";

type ChipListProps = {
  chips: { id: string; label: string }[];
  direction?: "horizontal" | "vertical";
  gap?: "small" | "medium" | "large";
  removable?: boolean;
  onRemove?: (id: string) => void;
  className?: string;
};

const gapStyles = {
  small: "gap-2",
  medium: "gap-4",
  large: "gap-6",
};

export const ChipList = ({
  chips,
  direction = "horizontal",
  gap = "medium",
  removable = false,
  onRemove,
  className,
}: ChipListProps) => {
  return (
    <div
      className={cn(
        "flex flex-wrap",
        direction === "vertical" ? "flex-col" : "flex-row",
        gapStyles[gap],
        className,
      )}
    >
      {chips.map((chip) => (
        <Chip
          key={chip.id}
          label={chip.label}
          removable={removable}
          onRemove={onRemove ? () => onRemove(chip.id) : undefined}
        />
      ))}
    </div>
  );
};
