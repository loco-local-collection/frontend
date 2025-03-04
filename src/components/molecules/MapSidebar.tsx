"use client";

import type { ReactNode } from "react";
import type { Spot } from "@/types/map";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useMapTagSelection } from "@/hooks/maps/useMapTagSelection";
import { useMapSortOption } from "@/hooks/maps/useMapSortOption";
import { useMapStore } from "@/store/mapStore";

import SpotCard from "@/components/molecules/SpotCard";
import { Button } from "@/components/atoms/Button";
import { Dropdown } from "@/components/atoms/Dropdown";
import { Chip } from "@/components/atoms/Chip";
import { cn } from "@/lib/utils";

interface SidebarProps {
  spots: Spot[];
  children?: ReactNode;
}

/**
 * 장소 리스트를 보여주는 사이드바 컴포넌트
 * 태그, 정렬을 통한 데이터 변경
 */
export default function MapSidebar({ spots, ...props }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const { selectedTags, availableTags, toggleTag } = useMapTagSelection();
  const { selectedSort, setSelectedSort, sortOptions } = useMapSortOption();

  const setCenter = useMapStore((state) => state.setCenter);
  const setActiveSpotId = useMapStore((state) => state.setActiveSpotId);

  const sortedSpots = useMemo(() => {
    return [...spots].sort((a, b) => {
      if (selectedSort === "latest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      return (b.likes || 0) - (a.likes || 0);
    });
  }, [spots, selectedSort]);

  return (
    <aside className="fixed left-0 top-0 h-full z-20">
      <div
        className={cn(
          "h-full bg-white border-r border-gray-200 overflow-y-auto transition-all duration-300",
          isOpen
            ? "translate-x-0 w-64 sm:w-80 xl:w-[30rem]"
            : "-translate-x-full w-64 sm:w-80 xl:w-[30rem]",
        )}
      >
        {/* 상단 헤더 */}
        {props.children}

        {/* 태그 선택 및 정렬 컨트롤 */}
        <div className="p-4">
          <div className="flex items-center mb-4 space-x-4">
            <div className="overflow-x-auto">
              <div className={cn("flex flex-nowrap space-x-2 min-w-max")}>
                {availableTags.map((tag) => (
                  <div
                    key={tag.id}
                    onClick={() => toggleTag(tag.id)}
                    className="cursor-pointer"
                  >
                    <Chip
                      label={tag.label}
                      className={cn(
                        selectedTags.includes(tag.id) &&
                          "bg-interactive-primary text-interactive-inverse",
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
            <Dropdown
              value={selectedSort}
              onChange={setSelectedSort}
              options={sortOptions}
            />
          </div>

          {/* Spots 리스트 */}
          <div className="space-y-4">
            {sortedSpots.map((spot, index) => (
              <SpotCard
                key={index}
                spot={spot}
                onClick={() => {
                  setCenter({ lat: spot.lat, lng: spot.lng });
                  setActiveSpotId(spot.id);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 사이드바 토글 버튼 */}
      <Button
        variant="secondary"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "absolute top-1/2 -translate-y-1/2 px-0 py-3 rounded-l-none transition-all duration-300",
          isOpen ? "left-64 sm:left-80 xl:left-[30rem]" : "left-0",
        )}
      >
        {isOpen ? <ChevronLeft /> : <ChevronRight />}
        <span className="sr-only">{isOpen ? "Close" : "Open"} sidebar</span>
      </Button>
    </aside>
  );
}
