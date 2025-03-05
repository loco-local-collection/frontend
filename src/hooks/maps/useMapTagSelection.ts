import { useState } from "react";

export function useMapTagSelection() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const availableTags = [
    { id: "tag1", label: "태그1" },
    { id: "tag2", label: "태그2" },
    { id: "tag3", label: "태그3" },
  ];

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId],
    );
  };

  return { selectedTags, availableTags, toggleTag };
}
