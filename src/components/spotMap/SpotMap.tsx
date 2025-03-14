"use client";

import type { Place } from "@/types/spot";
import { useState } from "react";
import MapSidebar from "@/components/spotMap/MapSidebar";
import MapSidebarHeader from "@/components/spotMap/MapSidebarHeader";
import MapContainer from "@/components/spotMap/MapContainer";

interface PlaceSearchMapProps {
  initialData: Place[];
}

/**
 * 지도와 사이드바를 렌더링하는 컴포넌트
 * 초기 데이터 받아서 places 상태 관리
 */
export default function SpotMap({ initialData }: PlaceSearchMapProps) {
  const [places] = useState<Place[]>(initialData);

  return (
    <div className="relative flex w-full h-screen">
      <MapSidebar places={places}>
        <MapSidebarHeader /> {/* 서버 컴포넌트 */}
      </MapSidebar>

      <MapContainer places={places} />
    </div>
  );
}
