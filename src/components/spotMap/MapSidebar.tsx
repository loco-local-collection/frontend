"use client";

import type { ReactNode } from "react";
import type { Place } from "@/types/spot";

import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useMapTagSelection } from "@/hooks/maps/useMapTagSelection";
import { useMapSortOption } from "@/hooks/maps/useMapSortOption";
import { useSidebarStore, useMapStore } from "@/store/spotMapStore";

import PlaceCard from "@/components/molecules/PlaceCard";
import { Button } from "@/components/atoms/Button";
import { Dropdown } from "@/components/atoms/Dropdown";
import { Chip } from "@/components/atoms/Chip";
import { cn } from "@/lib/utils";

interface SidebarProps {
  places: Place[];
  children?: ReactNode;
}

/**
 * 장소 리스트를 보여주는 사이드바 컴포넌트
 * 태그, 정렬을 통한 데이터 변경
 */
export default function MapSidebar({ places, ...props }: SidebarProps) {
  const { selectedTags, availableTags, toggleTag } = useMapTagSelection();
  const { selectedSort, setSelectedSort, sortOptions } = useMapSortOption();
  const { isSidebarOpen, toggleSidebar } = useSidebarStore();
  const setCenter = useMapStore((state) => state.setCenter);
  const setActivePlaceId = useMapStore((state) => state.setActivePlaceId);

  const sortedPlaces = useMemo(() => {
    return [...places].sort((a, b) => {
      if (selectedSort === "latest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      return (b.likes || 0) - (a.likes || 0);
    });
  }, [places, selectedSort]);

  return (
    <>
      <aside className="fixed sm:left-0 sm:top-0 sm:h-full sm:w-80 bottom-0 left-0 right-0 z-20">
        <div
          className={cn(
            "bg-white border-gray-200 overflow-y-auto transition-all duration-300",
            "sm:h-full sm:border-r sm:border-t-0 sm:overflow-y-auto h-96 w-full border-t max-sm:overflow-y-auto",
            isSidebarOpen
              ? "sm:translate-x-0 sm:w-80"
              : "sm:-translate-x-full sm:w-80",
          )}
        >
          {/* 상단 헤더 */}
          {props.children}

          {/* 태그 선택 및 정렬 컨트롤 */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-4 space-x-4">
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

            {/* Place 리스트 */}
            <div className="space-y-4">
              {sortedPlaces.map((place, index) => (
                <PlaceCard
                  key={index}
                  place={place}
                  onClick={() => {
                    setCenter({ lat: place.lat, lng: place.lng });
                    setActivePlaceId(place.id);
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 사이드바 토글 버튼 */}
        <Button
          variant="secondary"
          onClick={toggleSidebar}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 hidden sm:flex px-0 py-3 rounded-l-none transition-all duration-300",
            isSidebarOpen ? "left-64 sm:left-80" : "left-0",
          )}
        >
          {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          <span className="sr-only">
            {isSidebarOpen ? "Close" : "Open"} sidebar
          </span>
        </Button>
      </aside>
    </>
  );
}
