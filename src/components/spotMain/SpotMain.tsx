"use client";

import clsx from "clsx";
import { Search } from "lucide-react";
import { Input } from "../atoms/Input";
import { SpotItem } from "./SpotItem";
import { Spot } from "@/domains/spot/spot.entity";
import { spotFixtures } from "../../../__tests__/fixtures/spotFixture";

interface Props {
  className?: string;
}

export const SpotMain = (props: Props) => {
  const spots: Spot[] = spotFixtures;
  const pages = [1, 2, 3, 4, 5];
  return (
    <div className={clsx("mt-4", props.className)}>
      <div className="flex justify-end mb-4">
        <div className="flex items-center">
          <Input
            rightIcon={
              <Search className="icon-interactive-secondary text-xl" />
            }
            placeholder="검색어 입력"
            className="rounded-full"
          />
        </div>
        <select
          name="sort"
          id="sort"
          className="border rounded px-3 py-1 text-sm ml-2"
        >
          <option value="created-at-desc">최신순</option>
          <option value="title-asc">제목순</option>
        </select>
      </div>
      {/* 반응형 카드 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {spots.map((spot) => SpotItem({ spot }))}
      </div>
      <div className="flex justify-center items-center mt-8">
        {pages.map((c) => (
          <div key={c}>
            <button
              className={clsx(
                "px-4 py-2 border rounded text-sm bg-white text-black mr-2 mb-4",
                c === 1 && "bg-sky-600",
              )}
            >
              {c}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
