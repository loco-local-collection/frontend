"use client";

import type { Spot } from "@/types/map";
import { useEffect, useRef, useState } from "react";
import SpotDetail from "@/components/organisms/SpotDetailModal";
import Makers from "@/components/atoms/Markers";

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
  const { activeSpotId } = useSpotStore();

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

  // 활성 스팟 모달 관리
  useEffect(() => {
    if (!map || !activeSpotId) return;
    setIsModalOpen(true);
  }, [activeSpotId, map]);

  return (
    <div ref={mapRef} className={`grow rounded-lg shadow-md h-screen`}>
      <SpotDetail isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {map && <Makers spots={spots} map={map} />}
    </div>
  );
}
