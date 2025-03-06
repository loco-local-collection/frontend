import Image from "next/image";
import { X } from "lucide-react";
import { IconButton } from "@/components/atoms/IconButton";
import { useSidebarStore, useSpotStore } from "@/store/mapStore";
import { cn } from "@/lib/utils";

interface SpotDetailProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SpotDetail({ isOpen, onClose }: SpotDetailProps) {
  const activeSpotId = useSpotStore((state) => state.activeSpotId);
  const { isSidebarOpen } = useSidebarStore();

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

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed top-1/2 transform -translate-y-1/2 w-[380px] h-[95vh] overflow-y-auto rounded-xl bg-primary shadow-lg transition-all duration-300",
        isSidebarOpen ? "left-[350px]" : "left-[30px]",
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
      <div className="relative w-full h-48 bg-gray-200 rounded-t-lg overflow-hidden">
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
            아이스걸크림보이 율리단길점 {activeSpotId}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            서울 용산구 한강대로50길 17
          </p>
        </div>

        {/* 소개 */}
        <div className="text-gray-800 text-sm mb-6">
          계절마다 독특한 수제 아이스크림을 맛볼 수 있는 예쁜 가게
        </div>

        {/* 댓글 */}
        <div>
          <h3 className="text-sm font-semibold mb-2 text-gray-700">
            댓글 {comments.length}개
          </h3>
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
