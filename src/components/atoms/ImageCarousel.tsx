import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { IconButton } from "@/components/atoms/IconButton";

interface ImageCarouselProps {
  images: {
    src: string;
    alt: string;
  }[];
  initialSlide: number;
  onClose: () => void;
}

export default function ImageCarousel({
  images,
  initialSlide = 0,
  onClose,
}: ImageCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);

  useEffect(() => {
    // 캐러셀이 열릴 때 body 스크롤 방지
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // 문서의 최상위(root)에서 캐러셀을 렌더링하기 위해 포털 사용
  return typeof document !== "undefined"
    ? createPortal(
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-60 flex flex-col">
          {/* 닫기 버튼이 있는 헤더 */}
          <div className="flex justify-end p-4">
            <IconButton
              onClick={onClose}
              icon={<X />}
              variant="secondary"
              aria-label="닫기"
              className="bg-transparent text-white hover:bg-gray-800"
            />
          </div>

          {/* 메인 캐러셀 영역 */}
          <div className="flex-grow flex items-center justify-center relative">
            {/* 왼쪽 화살표 */}
            <IconButton
              onClick={prevSlide}
              icon={<ChevronLeft size={24} />}
              variant="secondary"
              aria-label="이전"
              className="absolute left-4 bg-black bg-opacity-50 text-white hover:bg-opacity-70 z-10"
            />

            {/* 현재 선택된 이미지를 표시하는 영역 */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
                <Image
                  src={images[currentSlide].src}
                  alt={images[currentSlide].alt}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* 오른쪽 화살표 */}
            <IconButton
              onClick={nextSlide}
              icon={<ChevronRight size={24} />}
              variant="secondary"
              aria-label="다음"
              className="absolute right-4 bg-black bg-opacity-50 text-white hover:bg-opacity-70 z-10"
            />
          </div>

          {/* 하단 썸네일 리스트 */}
          <div className="p-4 flex justify-center gap-2 overflow-x-auto">
            {images.map((image, index) => (
              <div
                key={index}
                className={`w-16 h-12 relative rounded overflow-hidden cursor-pointer flex-shrink-0 ${
                  index === currentSlide ? "ring-2 ring-white" : "opacity-70"
                }`}
                onClick={() => setCurrentSlide(index)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>,
        document.body,
      )
    : null;
}
