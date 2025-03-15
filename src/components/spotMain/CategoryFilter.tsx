"use client";

import { useState } from "react";
import { Button } from "../atoms/Button";
import clsx from "clsx";

const categories = ["전체", "맛집", "편의시설", "행사/전시/페스티벌"];

interface Props {
  className?: string;
}

export default function CategoryFilter(props: Props) {
  const [selected, setSelected] = useState("전체");

  return (
    <div className={clsx("bg-tertiary p-3 rounded-lg", props.className)}>
      {/* 반응형 컨테이너 */}
      <div className="flex md:flex-wrap space-x-3 md:space-x-2 overflow-x-auto md:overflow-visible whitespace-nowrap snap-x snap-mandatory scrollbar-hide">
        {/* 카테고리 버튼 */}
        {categories.map((category) => (
          <Button
            variant="outline"
            key={category}
            onClick={() => setSelected(category)}
            className={`px-4 py-2 border rounded-md text-sm snap-start ${
              selected === category
                ? "border-sky-600 text-sky-600 bg-white"
                : "border-gray-300 text-gray-700 bg-white"
            }`}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}
