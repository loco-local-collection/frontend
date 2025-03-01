"use client";

import type { Spot } from "@/types/map";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";

interface SidebarProps {
  spots: Spot[];
  onSpotSelect: (spot: Spot) => void;
}

/**
 * 장소 리스트를 보여주는 사이드바 컴포넌트
 */
export default function MapSidebar({ spots, onSpotSelect }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className="fixed left-0 top-0 h-full z-20">
      <div
        className={`h-full bg-white border-r border-gray-200 overflow-y-auto transition-all duration-300 ${
          isOpen
            ? "translate-x-0 w-64 sm:w-80 xl:w-[30rem]"
            : "-translate-x-full w-64 sm:w-80 xl:w-[30rem]"
        }`}
      >
        <div className="p-4">
          {spots.map((spot, index) => (
            <div
              key={index}
              className="p-4 mb-2 cursor-pointer rounded-lg hover:bg-gray-50"
              onClick={() => onSpotSelect(spot)}
            >
              <h2 className="text-lg font-semibold truncate">{spot.title}</h2>
              {spot.description && (
                <p className="text-sm text-gray-600 line-clamp-2">
                  {spot.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="secondary"
        onClick={() => setIsOpen(!isOpen)}
        className={`absolute top-1/2 -translate-y-1/2 px-0 py-3 rounded-l-none transition-all duration-300 ${
          isOpen ? "left-64 sm:left-80 xl:left-[30rem]" : "left-0"
        }`}
      >
        {isOpen ? <ChevronLeft /> : <ChevronRight />}
        <span className="sr-only">{isOpen ? "Close" : "Open"} sidebar</span>
      </Button>
    </aside>
  );
}
