"use client";

import type { Spot } from "@/types/map";
import { useEffect, useState } from "react";
import ReactDOMServer, { renderToString } from "react-dom/server";

import Marker from "@/components/atoms/Marder";
import { MarkerWindow } from "@/components/atoms/MarkerWindow";
import { useSpotStore } from "@/store/mapStore";

// Define interface for the marker with spot data
interface MarkerWithSpotData extends naver.maps.Marker {
  spotData: Spot;
}

// Define basic interface for MarkerClustering
interface MarkerClustering {
  setMap(map: naver.maps.Map | null): void;
}

interface MakersProps {
  spots: Spot[];
  map: naver.maps.Map | null;
}

/**
 * 마커 및 클러스터링을 관리하는 컴포넌트
 */
export default function Makers({ spots = [], map }: MakersProps) {
  const [markerClustering, setMarkerClustering] =
    useState<MarkerClustering | null>(null);
  const [markers, setMarkers] = useState<MarkerWithSpotData[]>([]);
  const [infoWindows, setInfoWindows] = useState<naver.maps.InfoWindow[]>([]);

  const { activeSpotId, setActiveSpotId } = useSpotStore();

  // 마커 및 인포윈도우 생성
  useEffect(() => {
    if (!map || spots.length === 0) return;

    // 기존 마커와 인포윈도우 정리
    markers.forEach((marker) => marker.setMap(null));
    infoWindows.forEach((infoWindow) => infoWindow.close());

    const newMarkers: MarkerWithSpotData[] = [];
    const newInfoWindows: naver.maps.InfoWindow[] = [];

    // 마커 및 인포윈도우 생성
    spots.forEach((spot) => {
      // 마커 생성
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(spot.lat, spot.lng),
        title: spot.title,
        icon: {
          url: "/default-marker.svg",
          size: new naver.maps.Size(16, 16),
          scaledSize: new naver.maps.Size(16, 16),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(8, 16),
        },
      }) as MarkerWithSpotData;

      // 마커에 데이터 저장
      marker.spotData = spot;

      // 인포윈도우 생성
      const infoWindowContent = ReactDOMServer.renderToString(
        <MarkerWindow spot={spot} />,
      );

      const infoWindow = new naver.maps.InfoWindow({
        content: infoWindowContent,
        borderWidth: 0,
        disableAnchor: true,
        backgroundColor: "transparent",
        pixelOffset: new naver.maps.Point(0, -10),
      });

      // 마커 클릭 이벤트 리스너
      naver.maps.Event.addListener(marker, "click", () => {
        const spotId = marker.spotData.id;
        setActiveSpotId(activeSpotId === spotId ? null : spotId);
      });

      newMarkers.push(marker);
      newInfoWindows.push(infoWindow);
    });

    setMarkers(newMarkers);
    setInfoWindows(newInfoWindows);

    // 클러스터링 초기화
    initClustering(newMarkers);

    // 정리 함수
    return () => {
      newMarkers.forEach((marker) => marker.setMap(null));
      newInfoWindows.forEach((infoWindow) => infoWindow.close());
      if (markerClustering) {
        markerClustering.setMap(null);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, spots]);

  // 마커 클러스터링 초기화
  const initClustering = async (newMarkers: MarkerWithSpotData[]) => {
    if (!map || !window.naver) return;

    try {
      // 기존 클러스터링 정리
      if (markerClustering) {
        markerClustering.setMap(null);
      }

      // 클러스터 스타일 정의
      const htmlMarker1 = {
        content: renderToString(
          <Marker className="w-10 h-10 bg-blue-400 text-sm" />,
        ),
        size: new naver.maps.Size(40, 40),
        anchor: new naver.maps.Point(20, 20),
      };

      const htmlMarker2 = {
        content: renderToString(
          <Marker className="w-12 h-12 bg-blue-600 text-base" />,
        ),
        size: new naver.maps.Size(50, 50),
        anchor: new naver.maps.Point(25, 25),
      };

      // 동적으로 MarkerClustering 불러오기
      const clusteringModule = await import("@/lib/MarkerClustering");
      const MarkerClusteringClass = clusteringModule.default;

      // 클러스터링 생성
      const clustering = new MarkerClusteringClass({
        minClusterSize: 2,
        maxZoom: 15,
        map: map,
        markers: newMarkers,
        disableClickZoom: false,
        gridSize: 80,
        icons: [htmlMarker1, htmlMarker2],
        indexGenerator: [10, 50],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        stylingFunction: function (clusterMarker: any, count: number) {
          clusterMarker.getElement().querySelector("span").textContent =
            String(count);
        },
      });

      setMarkerClustering(clustering);
    } catch (error) {
      console.error("Marker clustering failed:", error);
    }
  };

  // activeSpotId 변경에 따라 인포윈도우 열고 닫기
  useEffect(() => {
    if (!map || markers.length === 0 || infoWindows.length === 0) return;

    infoWindows.forEach((infoWindow, index) => {
      const marker = markers[index];
      const spotId = marker.spotData.id;

      if (activeSpotId === spotId) {
        if (!infoWindow.getMap()) {
          infoWindow.open(map, marker);
        }
      } else {
        if (infoWindow.getMap()) {
          infoWindow.close();
        }
      }
    });
  }, [activeSpotId, map, markers, infoWindows]);

  return null;
}
