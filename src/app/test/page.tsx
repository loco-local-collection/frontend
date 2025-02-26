"use client";

import MapContainer from "@/components/molecules/MapContainer";

export default function TestPage() {
  return (
    <>
      <MapContainer
        center={{ lat: 37.5665, lng: 126.978 }}
        markers={[
          {
            lat: 37.5665,
            lng: 126.978,
            title: "서울 시청",
            iconUrl: "/default-marker.svg",
          },
          {
            lat: 37.5796,
            lng: 126.977,
            title: "경복궁",
            iconUrl: "/default-marker.svg",
          },
          {
            lat: 37.57,
            lng: 126.982,
            title: "광화문",
            iconUrl: "/default-marker.svg",
          },
        ]}
      />
    </>
  );
}
