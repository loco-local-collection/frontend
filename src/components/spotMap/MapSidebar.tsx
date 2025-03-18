"use client";

import type { ReactNode } from "react";
import type { Place } from "@/types/spot";

import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useMapTagSelection } from "@/hooks/maps/useMapTagSelection";
import { useMapSortOption } from "@/hooks/maps/useMapSortOption";
import { useSidebarStore, useMapStore } from "@/store/spotMapStore";

import PlaceCard from "@/components/molecules/PlaceCard";
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
      <aside className="fixed sm:left-0 sm:top-0 sm:h-full sm:w-96 bottom-0 left-0 right-0 z-20">
        <div
          className={cn(
            "bg-white border-gray-200 transition-all duration-300",
            "h-96 w-full border-t sm:h-full sm:border-r sm:border-t-0",
            isSidebarOpen
              ? "sm:translate-x-0 sm:w-96"
              : "sm:-translate-x-full sm:w-96",
          )}
        >
          <div className="sm:flex sm:flex-col sm:h-full">
            {/* 헤더 영역 */}
            <div className="sm:flex-shrink-0">{props.children}</div>

            {/* 태그 필터링 영역 */}
            <div className="p-4 sm:flex-shrink-0 sm:border-b border-gray-200">
              <div className="flex items-center justify-between space-x-4">
                {/* 태그 스크롤 컨테이너 */}
                <div className="overflow-x-auto pb-2 flex-grow">
                  <div className="flex flex-nowrap space-x-2 min-w-max">
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
                <div className="flex-shrink-0">
                  <Dropdown
                    value={selectedSort}
                    onChange={setSelectedSort}
                    options={sortOptions}
                  />
                </div>
              </div>
            </div>

            {/* 리스트 영역 - 데스크탑에서만 독립 스크롤 */}
            <div className="max-sm:block sm:flex-grow sm:overflow-y-auto">
              <div className="p-4 pr-3 space-y-4">
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
        </div>

        {/* 사이드바 토글 버튼 */}
        <button
          onClick={toggleSidebar}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 hidden sm:flex px-0 py-5 bg-gray-200 hover:bg-gray-300 rounded-md rounded-l-none transition-all duration-300",
            isSidebarOpen ? "left-64 sm:left-96" : "left-0",
          )}
        >
          {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          <span className="sr-only">
            {isSidebarOpen ? "Close" : "Open"} sidebar
          </span>
        </button>
      </aside>

      {/* 모바일 전용 스크롤 영역 설정 */}
      <style jsx global>{`
        @media (max-width: 640px) {
          .fixed.bottom-0.left-0.right-0.z-20 > div {
            overflow-y: auto;
          }
        }
      `}</style>
    </>
  );
}
