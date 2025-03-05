"use client";

import type { Spot } from "@/types/map";
import { useState } from "react";
import MapSidebar from "@/components/molecules/MapSidebar";
import MapSidebarHeader from "@/components/molecules/MapSidebarHeader";
import MapContainer from "@/components/molecules/MapContainer";

interface PlaceSearchMapProps {
  initialData: Spot[];
}

/**
 * 지도와 사이드바를 렌더링하는 컴포넌트
 * 초기 데이터 받아서 spots 상태 관리
 */
export default function PlaceSearchMap({ initialData }: PlaceSearchMapProps) {
  const [spots] = useState<Spot[]>(initialData);

  return (
    <div className="relative flex w-full h-screen">
      <MapSidebar spots={spots}>
        <MapSidebarHeader /> {/* 서버 컴포넌트 */}
      </MapSidebar>

      <MapContainer spots={spots} />
    </div>
  );
}
