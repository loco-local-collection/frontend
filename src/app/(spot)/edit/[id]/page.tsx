import type { Place } from "@/types/spot";
import SpotEdit from "@/components/spotEdit/SpotEdit";

export default async function MapSpotEdit(
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
      description:
        "나중에 용리단길 가게 된다면꼭라도 아이스크림은 유기농 우유로 만든 여기 아이스크림이 꼭짱을",
      lat: 37.5326,
      lng: 126.9599,
      likes: 5,
      comments: 13,
      createdAt: "2024-02-25T12:30:00Z",
      imageUrl: "/logo.svg",
      tags: ["아이스크림", "서울", "용리단길"],
      author: {
        name: "이름박귀찮",
        profileImage: "/profile-placeholder.jpg",
      },
    },
    {
      id: 2,
      title: "서울숲",
      description: "자연과 어우러진 힐링 공간, 주말 피크닉 하기 좋은 곳",
      lat: 37.5444,
      lng: 127.0379,
      likes: 8,
      comments: 4,
      createdAt: "2024-02-28T15:45:00Z",
      imageUrl: "/placeholder-park.jpg",
      tags: ["공원", "서울", "나들이"],
      author: {
        name: "자연러버",
        profileImage: "/profile-placeholder.jpg",
      },
    },
    {
      id: 3,
      title: "한강공원 반포지구",
      description:
        "야경이 아름다운 한강변 명소, 분수쇼와 함께 즐기는 서울의 밤",
      lat: 37.5098,
      lng: 126.9952,
      likes: 12,
      comments: 7,
      createdAt: "2024-02-26T09:20:00Z",
      imageUrl: "/placeholder-hangang.jpg",
      tags: ["한강", "반포", "야경"],
      author: {
        name: "서울탐험가",
        profileImage: "/profile-placeholder.jpg",
      },
    },
  ];

  return (
    <>
      <SpotEdit initialData={initialData} />
    </>
  );
}
