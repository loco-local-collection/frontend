"use client";

import { useState } from "react";

import MapContainer from "../molecules/MapContainer";

export default function PlaceSearchMap() {
  // 나중에 Hook으로 빼야함
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.978 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [markers, setMarkers] = useState<
    { lat: number; lng: number; title: string }[]
  >([]);

  return (
    <div className="relative w-full">
      {/* 지도 컨테이너 */}
      <MapContainer center={center} markers={markers} />
    </div>
  );
}
