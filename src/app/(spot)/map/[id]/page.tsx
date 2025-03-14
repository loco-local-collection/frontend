import type { Place } from "@/types/spot";
import SpotMap from "@/components/spotMap/SpotMap";

export default async function MapSpotDetail(
  {
    // params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  // const id = (await params).id;

  // fetch data
  const initialData: Place[] = [
    {
      id: 1,
      title: "아이스 걸크림보이 용리단길점",
      description: "유기농 우유로 만든 아이스크림 전문점",
      lat: 37.5326,
      lng: 126.9599,
      likes: 2,
      createdAt: "2024-02-25T12:30:00Z",
      imageUrl: "/logo.svg",
    },
    {
      id: 2,
      title: "서울숲",
      description: "자연과 어우러진 힐링 공간",
      lat: 37.5444,
      lng: 127.0379,
      likes: 1,
      createdAt: "2024-02-28T15:45:00Z",
    },
    {
      id: 3,
      title: "한강공원 반포지구",
      description: "야경이 아름다운 한강변 명소",
      lat: 37.5098,
      lng: 126.9952,
      likes: 3,
      createdAt: "2024-02-26T09:20:00Z",
    },
  ];

  return (
    <>
      <SpotMap initialData={initialData} />
    </>
  );
}
