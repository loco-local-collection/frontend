import { useEffect } from "react";
import { MapPin, X, ThumbsUp, Share, Star } from "lucide-react";

import ImageGallerySection from "./ImageGallerySection";
import CommentSection from "./CommentSection";

import { IconButton } from "@/components/atoms/IconButton";
import { Button } from "@/components/atoms/Button";
import { Avatar } from "@/components/atoms/Avatar";

import { useSidebarStore, useMapStore } from "@/store/spotMapStore";
import { cn } from "@/lib/utils";

interface PlaceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 장소를 선택할시 나타나는 모달창
 */
export default function PlaceDetailModal({
  isOpen,
  onClose,
}: PlaceDetailModalProps) {
  const activePlaceId = useMapStore((state) => state.activePlaceId);
  const { isSidebarOpen } = useSidebarStore();

  // 모바일 화면에서는 스크롤 잠금
  useEffect(() => {
    const handleBodyScroll = () => {
      if (isOpen && window.innerWidth < 640) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    };

    handleBodyScroll();
    window.addEventListener("resize", handleBodyScroll);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", handleBodyScroll);
    };
  }, [isOpen]);

  // 가게 이미지 샘플
  const placeImages = [
    { src: "/cafe1.png", alt: "아이스걸크림보이 매장 전경" },
    { src: "/cafe2.png", alt: "바닐라 아이스크림" },
    { src: "/exhibit1.png", alt: "딸기 아이스크림" },
    { src: "/exhibit2.png", alt: "매장 내부" },
  ];

  // 가게 태그
  const placeTags = ["아이스크림", "카페", "디저트"];

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed transform transition-all duration-300 bg-primary shadow-lg overflow-y-auto",
        "sm:w-[380px] sm:top-1/2 sm:-translate-y-1/2 sm:rounded-xl sm:h-[95vh]",
        "w-full h-full top-0 left-0 z-50",
        isSidebarOpen ? "sm:left-[414px]" : "sm:left-[30px]",
      )}
    >
      <IconButton
        onClick={onClose}
        icon={<X />}
        variant="secondary"
        aria-label="닫기"
        className="absolute right-4 top-4 bg-transparent z-20 text-white"
      />

      {/* 이미지 갤러리 섹션 */}
      <ImageGallerySection images={placeImages} />

      {/* 태그 */}
      <div className="flex gap-2 px-4 pt-3">
        {placeTags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 text-sm bg-gray-100 rounded-full text-gray-700"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="p-5 pt-3">
        {/* 상단 헤더 */}
        <div className="mb-2">
          <h2 className="text-xl font-bold text-gray-800">
            아이스걸크림보이 율리단길점 {activePlaceId}
          </h2>

          {/* 주소와 복사 버튼 */}
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1 text-gray-500">
              <MapPin size={16} />
              <p className="text-sm">서울 용산구 한강대로50길 17</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-blue-500 py-0 px-2 border-0"
            >
              복사
            </Button>
          </div>
        </div>

        {/* 작성자 정보 */}
        <div className="flex items-center gap-2 my-5">
          <Avatar src="/logo.svg" alt="이불밖귀찮" size="sm" />
          <span className="text-sm font-medium">이불밖귀찮</span>
        </div>

        {/* 소개 */}
        <div className="text-gray-800 text-sm mb-3">
          계절마다 독특한 수제 아이스크림을 맛볼 수 있는 예쁜 가게
        </div>

        {/* 액션 버튼 */}
        <div className="flex justify-between my-6 border-t border-b border-gray-200 py-2">
          <Button
            variant="outline"
            size="sm"
            className="text-gray-600 border-0"
            leftIcon={<ThumbsUp size={16} />}
          >
            좋아요 5
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-gray-600 border-0"
            leftIcon={<Star size={16} />}
          >
            저장하기
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-gray-600 border-0"
            leftIcon={<Share size={16} />}
          >
            공유하기
          </Button>
        </div>

        {/* 댓글 섹션 */}
        <CommentSection />
      </div>
    </div>
  );
}
