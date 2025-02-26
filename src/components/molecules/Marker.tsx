"use client";

import { useEffect, useState } from "react";

interface MarkerProps {
  map: naver.maps.Map | null;
  position: { lat: number; lng: number };
  title?: string;
  iconUrl?: string;
}

export default function Marker({ map, position, title, iconUrl }: MarkerProps) {
  const [infoWindow, setInfoWindow] = useState<naver.maps.InfoWindow | null>(
    null,
  );

  useEffect(() => {
    if (!map) return;

    // ✅ 1. 커스텀 마커 아이콘 적용 (애니메이션 제거)
    const marker = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(position.lat, position.lng),
      map,
      title,
      icon: {
        url: iconUrl || "/default-marker.svg", // 기본 아이콘 설정 가능
        size: new naver.maps.Size(16, 16),
        scaledSize: new naver.maps.Size(16, 16),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(8, 16), // 중심점을 마커 하단으로 조정
      },
    });

    // ✅ 2. 클릭 시 인포 윈도우 표시
    const info = new window.naver.maps.InfoWindow({
      content: `
        <div style="
          padding:8px;
          font-size:14px;
          font-weight:bold;
          background:white;
          border-radius:8px;
          box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
        ">
          ${title || "마커 정보"}
        </div>`,
      borderWidth: 1,
      disableAutoPan: false,
    });

    setInfoWindow(info);

    // ✅ 마커 클릭 이벤트 등록 (토글 방식)
    window.naver.maps.Event.addListener(marker, "click", () => {
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
  }, [map, position, title, iconUrl]);

  return null;
}
