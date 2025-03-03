import { useState } from "react";
import type { DropdownOption } from "@/components/atoms/Dropdown";

export function useMapSortOption() {
  const [selectedSort, setSelectedSort] = useState<"latest" | "recommended">(
    "latest",
  );
  const sortOptions: DropdownOption<"latest" | "recommended">[] = [
    { label: "최신순", value: "latest" },
    { label: "추천순", value: "recommended" },
  ];

  return { selectedSort, setSelectedSort, sortOptions };
}
