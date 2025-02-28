"use client";

import { useEffect } from "react";
import ReactDOMServer from "react-dom/server";

interface MarkerProps {
  map: naver.maps.Map | null;
  position: { lat: number; lng: number };
  title?: string;
  iconUrl?: string;
}

export default function Marker({ map, position, title, iconUrl }: MarkerProps) {
  useEffect(() => {
    if (!map) return;

    // ✅ 1. 마커 생성
    const marker = new naver.maps.Marker({
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

    // ✅ 2. 인포 윈도우 JSX 변환 (XSS 방지)
    const infoWindowContent = ReactDOMServer.renderToString(
      <div className="p-2 text-sm font-bold bg-white rounded-md shadow-md">
        {title || "마커 정보"}
      </div>,
    );

    const info = new naver.maps.InfoWindow({
      content: infoWindowContent,
      borderWidth: 1,
      disableAutoPan: false,
    });

    // ✅ 3. 클릭 시 인포 윈도우 토글
    naver.maps.Event.addListener(marker, "click", () => {
      if (info.getMap()) {
        info.close();
      } else {
        info.open(map, marker);
      }
    });

    return () => {
      marker.setMap(null);
      info.close();
    };
  }, [map, position]); // ✅ title과 iconUrl을 제거하여 불필요한 리렌더링 방지

  return null;
}
