"use client";

import type { Spot } from "@/types/map";
import { useState, useEffect } from "react";
import MapSidebar from "@/components/molecules/MapSidebar";
import MapContainer from "@/components/molecules/MapContainer";

interface PlaceSearchMapProps {
  initialData: Spot[];
}

/**
 * 지도와 사이드바를 렌더링하는 컴포넌트
 * 초기 데이터 받아서 makers, center 상태 관리
 */
export default function PlaceSearchMap({ initialData }: PlaceSearchMapProps) {
  const [center, setCenter] = useState({
    lat: initialData[0]?.lat || 37.5665,
    lng: initialData[0]?.lng || 126.978,
  });
  const [markers, setMarkers] = useState<
    { lat: number; lng: number; title: string }[]
  >([]);

  // 초기 데이터를 받아 상태 초기화
  useEffect(() => {
    const newMarkers = initialData.map((spot) => ({
      lat: spot.lat,
      lng: spot.lng,
      title: spot.title,
    }));
    setMarkers(newMarkers);
  }, [initialData]);

  return (
    <div className="relative w-full h-screen">
      <MapSidebar
        spots={initialData}
        onSpotSelect={(spot) => setCenter({ lat: spot.lat, lng: spot.lng })}
      />

      <div className="absolute inset-0">
        <MapContainer center={center} markers={markers} />
      </div>
    </div>
  );
}
