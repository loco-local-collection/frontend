export default function CardList() {
  const cards = [
    {
      id: 1,
      label: "요즘PICK",
      dDay: "D-14",
      image: "/default-marker.svg",
      title: "맛있는 식당 모음",
      author: "rikasohhd012",
      tags: ["#카페", "#공모전"],
    },
    {
      id: 2,
      dDay: "상시",
      image: "/default-marker.svg",
      title: "강남 공부하기 좋은 카페들",
      author: "A.O.A",
      tags: ["봉사/동아리/모임"],
    },
    {
      id: 3,
      dDay: "D-15",
      image: "/default-marker.svg",
      title: "빅픽쳐",
      author: "빅픽쳐",
      tags: ["봉사/동아리/모임"],
    },
    {
      id: 4,
      label: "NEW",
      image: "/default-marker.svg",
      title: "연기스터디/대학로팅 동아리 모집",
      author: "rikasohhd012",
      tags: ["#클럽포토", "#카페"],
      hasApply: true,
    },
    {
      id: 5,
      label: "요즘PICK",
      dDay: "D-14",
      image: "/default-marker.svg",
      title: "맛있는 식당 모음",
      author: "rikasohhd012",
      tags: ["#카페", "#공모전"],
    },
    {
      id: 6,
      dDay: "상시",
      image: "/default-marker.svg",
      title: "강남 공부하기 좋은 카페들",
      author: "A.O.A",
      tags: ["봉사/동아리/모임"],
    },
    {
      id: 7,
      dDay: "D-15",
      image: "/default-marker.svg",
      title: "빅픽쳐",
      author: "빅픽쳐",
      tags: ["봉사/동아리/모임"],
    },
    {
      id: 8,
      label: "NEW",
      image: "/default-marker.svg",
      title: "연기스터디/대학로팅 동아리 모집",
      author: "rikasohhd012",
      tags: ["#클럽포토", "#카페"],
      hasApply: true,
    },
  ];

  return (
    <div className="p-6">
      {/* 정렬 옵션 */}
      <div className="flex justify-end mb-4">
        <select className="border rounded px-3 py-1 text-sm w-full md:w-auto">
          <option>최신순</option>
          <option>인기순</option>
        </select>
      </div>

      {/* 반응형 카드 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="border rounded-lg shadow-sm overflow-hidden"
          >
            {/* 카드 이미지 */}
            <div className="relative">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-40 object-cover"
              />
              {card.label && (
                <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">
                  {card.label}
                </span>
              )}
            </div>

            {/* 카드 내용 */}
            <div className="p-3 md:p-4 text-sm">
              {card.dDay && <p className="text-gray-500">{card.dDay}</p>}
              <h3 className="font-bold">{card.title}</h3>
              <p className="text-gray-600 text-xs">{card.author}</p>

              {/* 태그 */}
              <div className="flex gap-2 mt-2 flex-wrap">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 px-2 py-1 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 지원하기 버튼 */}
              {card.hasApply && (
                <button className="w-full mt-3 py-1 border rounded text-center text-sm bg-black text-white">
                  지원하기
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
