import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronLeft, Heart, Share } from "lucide-react";

import { Avatar } from "@/components/atoms/Avatar";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";

export default function MapSidebarHeader() {
  const headerBgImageUrl = "";
  const hasHeaderImage = !!headerBgImageUrl;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-t-lg",
        hasHeaderImage ? "h-72" : "bg-gray-700 h-72",
      )}
    >
      {/* 배경 이미지 */}
      {hasHeaderImage && (
        <div className="absolute inset-0">
          <Image
            src={headerBgImageUrl}
            alt="Dessert background"
            fill
            sizes="100vw"
            className="object-cover"
          />
          {/* 텍스트 가독성을 위한 어두운 오버레이 */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      )}

      {/* 컨텐츠 컨테이너 */}
      <div className="relative flex flex-col h-full p-4">
        {/* 상단 네비게이션 바 */}
        <div className="flex justify-between items-center">
          <IconButton
            icon={<ChevronLeft size={20} />}
            variant="secondary"
            size="sm"
            className="bg-white/10 backdrop-blur-sm text-white border-transparent"
            aria-label="뒤로 가기"
          />

          <div className="flex gap-2">
            <IconButton
              icon={<Heart size={20} />}
              variant="secondary"
              size="sm"
              className="bg-white/10 backdrop-blur-sm text-white border-transparent"
              aria-label="좋아요"
            />
            <IconButton
              icon={<Share size={20} />}
              variant="secondary"
              size="sm"
              className="bg-white/10 backdrop-blur-sm text-white border-transparent"
              aria-label="공유하기"
            />
          </div>
        </div>

        {/* 주요 컨텐츠 영역 */}
        <div className="flex-grow"></div>

        {/* 하단 텍스트 컨텐츠 */}
        <div className="mt-auto">
          <h1 className="text-lg font-semibold text-white">
            내가 좋아하는 서울 디저트 맛집 모음
          </h1>
          <p className="text-sm text-white/80 mt-1">
            모두가 알면 좋겠다 좋은 디저트 가게 모음입니다
          </p>

          {/* 사용자 정보 섹션 */}
          <div className="flex items-center mt-3">
            <Avatar />
            <div className="ml-2 flex items-center text-white text-xs">
              <span className="font-medium">new_IceCream</span>
              <span className="mx-1">·</span>
              <span>3명</span>
            </div>
          </div>

          {/* 버튼 섹션 */}
          <div className="flex gap-4 mt-4">
            <Button
              size="sm"
              className="flex-1 bg-green-500 text-white border-transparent hover:bg-green-600"
            >
              장소 등록
            </Button>
            <Button size="sm" variant="danger" className="flex-1">
              스팟 나가기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
