import Image from "next/image";
import { useEffect, KeyboardEvent } from "react";
import { MapPin, X } from "lucide-react";

import { IconButton } from "@/components/atoms/IconButton";
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

  const comments = [
    {
      id: 1,
      userName: "아이스맛구실장",
      text: "여기 아이스크림 맛있어요!",
      userAvatar: "/logo.svg",
    },
    {
      id: 2,
      userName: "우아의맛집",
      text: "오레오 맛 추천! 사진도 예쁘게 잘 나와요",
      userAvatar: "/logo.svg",
    },
  ];

  // Enter 시 댓글 전송
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      const commentValue = e.currentTarget.value.trim();
      if (!commentValue) return;

      console.log("새 댓글 전송:", commentValue);

      e.currentTarget.value = "";
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed transform transition-all duration-300 bg-primary shadow-lg overflow-y-auto",
        "sm:w-[380px] sm:top-1/2 sm:-translate-y-1/2 sm:rounded-xl sm:h-[95vh]",
        "w-full h-full top-0 left-0 z-50",
        isSidebarOpen ? "sm:left-[350px]" : "sm:left-[30px]",
      )}
    >
      <IconButton
        onClick={onClose}
        icon={<X />}
        variant="secondary"
        aria-label="닫기"
        className="absolute right-4 top-4 bg-transparent z-20"
      />

      {/* 메인 이미지 */}
      <div className="relative w-full h-48 bg-gray-200 sm:rounded-t-lg overflow-hidden">
        <Image
          src="/logo.svg"
          alt="아이스걸크림보이 율리단길점"
          fill
          className="object-cover"
        />
      </div>

      <div className="p-5">
        {/* 상단 헤더 */}
        <div className="mb-2">
          <h2 className="text-xl font-bold text-gray-800">
            아이스걸크림보이 율리단길점 {activePlaceId}
          </h2>
          <div className="flex items-center mt-1 gap-1 text-gray-500">
            <MapPin size={16} />
            <p className="text-sm">서울 용산구 한강대로50길 17</p>
          </div>
        </div>

        {/* 소개 */}
        <div className="text-gray-800 text-sm mb-6">
          계절마다 독특한 수제 아이스크림을 맛볼 수 있는 예쁜 가게
        </div>

        {/* 댓글 영역 */}
        <div>
          <h3 className="text-sm font-semibold mb-2 text-gray-700">
            댓글 {comments.length}개
          </h3>
          <div className="mb-4">
            <input
              placeholder="댓글추가..."
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-focusRing transition-colors"
            />
          </div>
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100">
                  <Image
                    src={comment.userAvatar}
                    alt={comment.userName}
                    width={32}
                    height={32}
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {comment.userName}
                  </p>
                  <p className="text-sm text-gray-600">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
