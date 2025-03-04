import type { Spot } from "@/types/map";
import { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { useMapStore } from "@/store/mapStore";

interface MarkerProps {
  spot: Spot;
  map: naver.maps.Map | null;
  iconUrl?: string;
}

export default function Marker({ spot, map, iconUrl }: MarkerProps) {
  const [marker, setMarker] = useState<naver.maps.Marker | null>(null);
  const [infoWindow, setInfoWindow] = useState<naver.maps.InfoWindow | null>(
    null,
  );
  const { activeSpotId, setActiveSpotId } = useMapStore();

  // 1. 마커 및 인포 윈도우 생성 (map, spot, iconUrl 변경 시 재생성)
  useEffect(() => {
    if (!map) return;

    const newMarker = new naver.maps.Marker({
      position: new naver.maps.LatLng(spot.lat, spot.lng),
      map,
      title: spot.title,
      icon: {
        url: iconUrl || "/default-marker.svg",
        size: new naver.maps.Size(16, 16),
        scaledSize: new naver.maps.Size(16, 16),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(8, 16),
      },
    });
    setMarker(newMarker);

    const infoWindowContent = ReactDOMServer.renderToString(
      <div className="p-2 text-sm font-bold bg-white rounded-md shadow-md">
        {spot.title || "마커 정보"}
      </div>,
    );
    const newInfoWindow = new naver.maps.InfoWindow({
      content: infoWindowContent,
      borderWidth: 1,
      disableAutoPan: false,
    });
    setInfoWindow(newInfoWindow);

    // 마커 클릭 시 activeSpotId 토글
    const clickListener = naver.maps.Event.addListener(
      newMarker,
      "click",
      () => {
        const currentActiveId = useMapStore.getState().activeSpotId;
        setActiveSpotId(currentActiveId === spot.id ? null : spot.id);
      },
    );

    return () => {
      naver.maps.Event.removeListener(clickListener);
      newMarker.setMap(null);
      newInfoWindow.close();
    };
  }, [map, spot, iconUrl, setActiveSpotId]);

  // 2. activeSpotId 변경에 따라 인포 윈도우 열고 닫기
  useEffect(() => {
    if (!map || !marker || !infoWindow) return;

    if (activeSpotId === spot.id) {
      if (!infoWindow.getMap()) {
        infoWindow.open(map, marker);
      }
    } else {
      if (infoWindow.getMap()) {
        infoWindow.close();
      }
    }
  }, [activeSpotId, map, marker, infoWindow, spot.id]);

  // 3. 마커 속성 업데이트 (spot.title 및 iconUrl 변경 시)
  useEffect(() => {
    if (!marker) return;

    marker.setTitle(spot.title || "");
    marker.setIcon({
      url: iconUrl || "/default-marker.svg",
      size: new naver.maps.Size(16, 16),
      scaledSize: new naver.maps.Size(16, 16),
      origin: new naver.maps.Point(0, 0),
      anchor: new naver.maps.Point(8, 16),
    });
  }, [marker, iconUrl, spot.title]);

  return null;
}
