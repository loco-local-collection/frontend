"use client";

import type { Spot } from "@/types/map";
import { useEffect, useRef, useState } from "react";
import Marker from "@/components/atoms/Marker";
import SpotDetail from "@/components/organisms/SpotDetailModal";
import { useSpotStore } from "@/store/mapStore";

interface MapContainerProps {
  spots: Spot[];
  zoom?: number;
}

/**
 * 지도 인스턴스를 생성하고 렌더링하는 컴포넌트
 */
export default function MapContainer({
  zoom = 14,
  spots = [],
}: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const center = useSpotStore((state) => state.center);

  // 마운트 시 지도 인스턴스 생성
  useEffect(() => {
    const mapInstance = new window.naver.maps.Map(mapRef.current!, {
      center: new window.naver.maps.LatLng(center.lat, center.lng),
      zoom,
      minZoom: 8,
      zoomControl: true,
      zoomControlOptions: {
        position: window.naver.maps.Position.TOP_RIGHT,
      },
    });

    setMap(mapInstance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // center 값 변경 시 panTo 이동
  useEffect(() => {
    if (!map) return;

    const proj = map.getProjection();
    const centerCoord = new naver.maps.LatLng(center.lat, center.lng);

    const sidebarWidth = 730 / 2;
    const centerPoint = proj.fromCoordToOffset(centerCoord);
    centerPoint.x -= sidebarWidth;
    const offsetCoord = proj.fromOffsetToCoord(centerPoint);

    map.panTo(offsetCoord);
  }, [center, map]);

  return (
    <div ref={mapRef} className={`grow rounded-lg shadow-md h-screen`}>
      <SpotDetail isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {map &&
        spots.map((spot) => (
          <Marker
            key={spot.id}
            spot={spot}
            map={map}
            onChangeActiveId={() => setIsModalOpen(true)}
          />
        ))}
    </div>
  );
}
