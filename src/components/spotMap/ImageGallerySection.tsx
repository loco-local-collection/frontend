import Image from "next/image";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// 캐러셀에 대해서 동적 로딩 적용
const ImageCarousel = dynamic(
  () => import("@/components/atoms/ImageCarousel"),
  { ssr: false },
);

interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
  }[];
}

/**
 * PlaceDetailModal 상단의 사진 부분
 */
export default function ImageGallerySection({ images }: ImageGalleryProps) {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트되었는지 여부 확인
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const openCarousel = (index: number) => {
    setInitialSlide(index);
    setIsCarouselOpen(true);
  };

  // 이미지가 없을 경우 기본 플레이스홀더 설정
  const galleryImages = images?.length
    ? images
    : [
        { src: "/logo.svg", alt: "Place image" },
        { src: "/logo.svg", alt: "Place image" },
        { src: "/logo.svg", alt: "Place image" },
      ];

  return (
    <>
      <div className="relative w-full h-48 sm:h-56 bg-gray-200 sm:rounded-t-lg overflow-hidden flex">
        {/* 큰 메인 이미지 (왼쪽) */}
        <div
          className="relative cursor-pointer"
          onClick={() => openCarousel(0)}
          style={{ width: "65%" }}
        >
          <Image
            src={galleryImages[0].src}
            alt={galleryImages[0].alt}
            fill
            className="object-cover"
          />
        </div>

        {/* 작은 이미지 2개가 들어가는 오른쪽 영역 */}
        <div className="flex flex-col gap-1 pl-1" style={{ width: "35%" }}>
          <div
            className="relative flex-1 cursor-pointer"
            onClick={() => openCarousel(1)}
          >
            <Image
              src={
                galleryImages.length > 1
                  ? galleryImages[1].src
                  : galleryImages[0].src
              }
              alt={
                galleryImages.length > 1
                  ? galleryImages[1].alt
                  : galleryImages[0].alt
              }
              fill
              className="object-cover"
            />
          </div>
          <div
            className="relative flex-1 cursor-pointer"
            onClick={() => openCarousel(2)}
          >
            <div className="relative w-full h-full">
              <Image
                src={
                  galleryImages.length > 2
                    ? galleryImages[2].src
                    : galleryImages[0].src
                }
                alt={
                  galleryImages.length > 2
                    ? galleryImages[2].alt
                    : galleryImages[0].alt
                }
                fill
                className="object-cover"
              />
              {galleryImages.length > 3 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-semibold">
                  +{galleryImages.length - 3}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 클라이언트에서만 렌더링되는 캐러셀 모달 */}
      {isMounted && isCarouselOpen && (
        <ImageCarousel
          images={galleryImages}
          initialSlide={initialSlide}
          onClose={() => setIsCarouselOpen(false)}
        />
      )}
    </>
  );
}
