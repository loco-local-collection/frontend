"use client";

import { useEffect, useRef, useState } from "react";
import Marker from "./Marker";

interface MapContainerProps {
  center: { lat: number; lng: number };
  zoom?: number;
  markers?: { lat: number; lng: number; title?: string; iconUrl?: string }[];
  className?: string;
}

export default function MapContainer({
  center,
  zoom = 14,
  markers = [],
  className,
}: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<naver.maps.Map | null>(null);

  useEffect(() => {
    if (!window.naver) return;

    const mapInstance = new window.naver.maps.Map(mapRef.current!, {
      center: new window.naver.maps.LatLng(center.lat, center.lng),
      zoom,
    });

    setMap(mapInstance);
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`w-full h-[400px] rounded-lg shadow-md ${className}`}
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
