import { useState } from "react";
import { Button } from "../atoms/Button";

const categories = [
  "서포터즈/기자단",
  "교육/강연/멘토링",
  "봉사/동아리/모임",
  "취업/창업/인턴",
  "행사/전시/페스티벌",
];

export default function CategoryFilter() {
  const [selected, setSelected] = useState("전체");

  return (
    <div className="bg-tertiary p-3 rounded-lg">
      {/* 반응형 컨테이너 */}
      <div className="flex md:flex-wrap space-x-3 md:space-x-2 overflow-x-auto md:overflow-visible whitespace-nowrap snap-x snap-mandatory scrollbar-hide">
        {/* 전체 버튼 */}
        <Button
          variant="outline"
          onClick={() => setSelected("전체")}
          className={`px-4 py-2 border rounded-md text-sm snap-start ${
            selected === "전체"
              ? "border-pink-500 text-pink-500 bg-white"
              : "border-gray-300 text-gray-700 bg-white"
          }`}
        >
          ✅ 전체
        </Button>

        {/* 카테고리 버튼 */}
        {categories.map((category) => (
          <Button
            variant="outline"
            key={category}
            onClick={() => setSelected(category)}
            className={`px-4 py-2 border rounded-md text-sm snap-start ${
              selected === category
                ? "border-pink-500 text-pink-500 bg-white"
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
