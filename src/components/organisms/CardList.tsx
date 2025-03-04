"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;
  const [displayCards, setDisplayCards] = useState(
    cards.slice(0, itemsPerPage)
  );
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // 화면 크기 변경 감지
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // 최초 실행
    checkScreenSize();

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // 모바일 Infinite Scroll
  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [displayCards]);

  const loadMore = () => {
    const nextItems = cards.slice(0, displayCards.length + itemsPerPage);
    setDisplayCards(nextItems);
  };

  // 데스크탑 Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedCards = cards.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-4">
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
      {/* 모바일 Infinite Scroll 트리거 */}
      {isMobile && <div ref={observerRef} className="h-10" />}

      {/* 데스크탑 Pagination */}
      {!isMobile && (
        <div className="flex justify-center mt-6">
          <button
            className={`px-4 py-2 mx-1 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            이전
          </button>
          <span className="px-4 py-2 border rounded bg-gray-100">
            {currentPage}
          </span>
          <button
            className={`px-4 py-2 mx-1 border rounded ${indexOfLastItem >= cards.length ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() =>
              setCurrentPage((prev) =>
                indexOfLastItem < cards.length ? prev + 1 : prev
              )
            }
            disabled={indexOfLastItem >= cards.length}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}
