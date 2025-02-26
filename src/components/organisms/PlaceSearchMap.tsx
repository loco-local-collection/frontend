"use client";

import { useState } from "react";
import SearchBox from "../molecules/SearchBox";
import MapContainer from "../molecules/MapContainer";

export default function PlaceSearchMap() {
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.978 }); // ✅ 그대로 유지
  const [markers, setMarkers] = useState<
    { lat: number; lng: number; title: string }[]
  >([]);

  const handleSelectPlace = (lat: number, lng: number, title: string) => {
    setCenter({ lat, lng }); // ✅ center 업데이트
    setMarkers((prev) => [...prev, { lat, lng, title }]);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <SearchBox onSelectPlace={handleSelectPlace} />
      <MapContainer center={center} markers={markers} />{" "}
      {/* ✅ center를 올바르게 전달 */}
    </div>
  );
}
