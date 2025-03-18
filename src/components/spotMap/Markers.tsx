"use client";

import type { Place } from "@/types/spot";
import { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";

import TitleMarker from "@/components/spotMap/TitleMarker";
import ClusterMarker from "@/components/spotMap/ClusterMarker";
import { useMapStore } from "@/store/spotMapStore";

// Define interface for the marker with place data
interface MarkerWithPlaceData extends naver.maps.Marker {
  placeData: Place;
}

// Define basic interface for MarkerClustering
interface MarkerClustering {
  setMap(map: naver.maps.Map | null): void;
}

interface MakersProps {
  places: Place[];
  map: naver.maps.Map | null;
}

/**
 * 마커 및 클러스터링을 관리하는 컴포넌트
 */
export default function Makers({ places = [], map }: MakersProps) {
  const [markerClustering, setMarkerClustering] =
    useState<MarkerClustering | null>(null);
  const [markers, setMarkers] = useState<MarkerWithPlaceData[]>([]);

  const { activePlaceId, setActivePlaceId } = useMapStore();

  // 마커 생성
  useEffect(() => {
    if (!map || places.length === 0) return;

    // 기존 마커 정리
    markers.forEach((marker) => marker.setMap(null));

    const newMarkers: MarkerWithPlaceData[] = [];

    // 마커 생성
    places.forEach((place) => {
      // TitleMarker 컴포넌트를 renderToString으로 변환
      const markerContent = renderToString(<TitleMarker title={place.title} />);

      // 마커 생성
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(place.lat, place.lng),
        title: place.title,
        icon: {
          content: markerContent,
          anchor: new naver.maps.Point(8, 8),
        },
      }) as MarkerWithPlaceData;

      // 마커에 데이터 저장
      marker.placeData = place;

      // 마커 클릭 이벤트 리스너
      naver.maps.Event.addListener(marker, "click", () => {
        const placeId = marker.placeData.id;
        setActivePlaceId(activePlaceId === placeId ? null : placeId);
      });

      newMarkers.push(marker);
      marker.setMap(map);
    });

    setMarkers(newMarkers);

    // 클러스터링 초기화
    initClustering(newMarkers);

    // 정리 함수
    return () => {
      newMarkers.forEach((marker) => marker.setMap(null));
      if (markerClustering) {
        markerClustering.setMap(null);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, places]);

  // 마커 클러스터링 초기화
  const initClustering = async (newMarkers: MarkerWithPlaceData[]) => {
    if (!map || !window.naver) return;

    try {
      // 기존 클러스터링 정리
      if (markerClustering) {
        markerClustering.setMap(null);
      }

      // 클러스터 스타일 정의
      const htmlMarker1 = {
        content: renderToString(
          <ClusterMarker className="w-10 h-10 bg-blue-400 text-sm" />,
        ),
        size: new naver.maps.Size(40, 40),
        anchor: new naver.maps.Point(20, 20),
      };

      const htmlMarker2 = {
        content: renderToString(
          <ClusterMarker className="w-12 h-12 bg-blue-600 text-base" />,
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

  return null;
}
