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
 * 초기 데이터 받아서 spots, center 상태 관리
 */
export default function PlaceSearchMap({ initialData }: PlaceSearchMapProps) {
  const [spots] = useState<Spot[]>(initialData);

  const [center, setCenter] = useState({
    lat: initialData[0]?.lat || 37.5665,
    lng: initialData[0]?.lng || 126.978,
  });

  return (
    <div className="relative w-full h-screen">
      <MapSidebar
        spots={spots}
        onSpotSelect={(spot) => setCenter({ lat: spot.lat, lng: spot.lng })}
      >
        <MapSidebarHeader /> {/* 서버 컴포넌트 */}
      </MapSidebar>

      <div className="absolute inset-0">
        <MapContainer spots={spots} center={center} />
      </div>
    </div>
  );
}
