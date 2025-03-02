"use client";

import { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";

interface MarkerProps {
  map: naver.maps.Map | null;
  position: { lat: number; lng: number };
  title?: string;
  iconUrl?: string;
}

export default function Marker({ map, position, title, iconUrl }: MarkerProps) {
  const [marker, setMarker] = useState<naver.maps.Marker | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [infoWindow, setInfoWindow] = useState<naver.maps.InfoWindow | null>(
    null
  );

  // ✅ 1. 마커 초기 생성 (map 또는 position 변경 시만 실행)
  useEffect(() => {
    if (!map) return;

    const newMarker = new naver.maps.Marker({
      position: new naver.maps.LatLng(position.lat, position.lng),
      map,
      title,
      icon: {
        url: iconUrl || "/default-marker.svg",
        size: new naver.maps.Size(16, 16),
        scaledSize: new naver.maps.Size(16, 16),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(8, 16),
      },
    });

    setMarker(newMarker);

    // ✅ 2. 인포 윈도우 생성
    const infoWindowContent = ReactDOMServer.renderToString(
      <div className="p-2 text-sm font-bold bg-white rounded-md shadow-md">
        {title || "마커 정보"}
      </div>
    );

    const newInfoWindow = new naver.maps.InfoWindow({
      content: infoWindowContent,
      borderWidth: 1,
      disableAutoPan: false,
    });

    setInfoWindow(newInfoWindow);

    // ✅ 3. 클릭 시 인포 윈도우 토글
    naver.maps.Event.addListener(newMarker, "click", () => {
      if (newInfoWindow.getMap()) {
        newInfoWindow.close();
      } else {
        newInfoWindow.open(map, newMarker);
      }
    });

    return () => {
      newMarker.setMap(null);
      newInfoWindow.close();
    };
  }, [map, position]);

  // ✅ 4. 마커 속성 업데이트 (title 또는 iconUrl 변경 시만 실행)
  useEffect(() => {
    if (!marker) return;

    marker.setTitle(title || "");

    marker.setIcon({
      url: iconUrl || "/default-marker.svg",
      size: new naver.maps.Size(16, 16),
      scaledSize: new naver.maps.Size(16, 16),
      origin: new naver.maps.Point(0, 0),
      anchor: new naver.maps.Point(8, 16),
    });
  }, [title, iconUrl, marker]);

  return null;
}
