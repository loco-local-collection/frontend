"use client";

import { useEffect, useRef, useState } from "react";
import Marker from "@/components/atoms/Marker";

interface MapContainerProps {
  center: { lat: number; lng: number };
  zoom?: number;
  markers?: { lat: number; lng: number; title?: string; iconUrl?: string }[];
  className?: string;
}

/**
 * 지도 인스턴스를 생성하고 렌더링하는 컴포넌트
 */
export default function MapContainer({
  center,
  zoom = 14,
  markers = [],
  className,
}: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<naver.maps.Map | null>(null);

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
    if (map) {
      const newCenter = new window.naver.maps.LatLng(center.lat, center.lng);
      map.panTo(newCenter);
    }
  }, [center, map]);

  return (
    <div
      ref={mapRef}
      className={`w-full rounded-lg shadow-md ${className} h-screen`}
    >
      {map &&
        markers.map((marker, index) => (
          <Marker
            key={index}
            map={map}
            position={{ lat: marker.lat, lng: marker.lng }}
            title={marker.title}
            iconUrl={marker.iconUrl}
          />
        ))}
    </div>
  );
}
