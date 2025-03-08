"use client";

import clsx from "clsx";
import Image from "next/image";

interface Props {
  className?: string;
}

export default function CardList(props: Props) {
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
  ];

  return (
    <div className={clsx("p-4", props.className)}>
      {/* 정렬 옵션 */}
      <div className="flex justify-end mb-4">
        <select className="border rounded px-3 py-1 text-sm">
          <option>최신순</option>
          <option>인기순</option>
        </select>
      </div>

      {/* 반응형 카드 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="border rounded-lg shadow-sm overflow-hidden flex flex-row md:flex-col"
          >
            {/* 카드 이미지 */}
            <div className="relative w-1/3 md:w-full items-center">
              <Image
                src={card.image}
                width={600}
                height={600}
                alt={card.title}
                className="w-full h-full object-cover p-4"
              />
              {card.label && (
                <span className="absolute top-0 left-0 bg-pink-500 text-white text-xs px-2 py-1 rounded">
                  {card.label}
                </span>
              )}
            </div>

            {/* 카드 내용 */}
            <div className="p-1 md:p-4 text-sm w-2/3 md:w-full">
              {card.dDay && (
                <p className="text-gray-500 bg-gray-200 rounded-full w-16 text-center px-2 py-1">
                  #{card.dDay}
                </p>
              )}
              <h3 className="font-bold py-2">{card.title}</h3>
              <p className="text-gray-600 text-xs py-2">{card.author}</p>

              {/* 태그 */}
              <div className="flex gap-2 mt-2 flex-wrap py-2">
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
              <button className="w-full mt-3 py-2 border rounded text-center text-sm bg-black text-white">
                참여하기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
