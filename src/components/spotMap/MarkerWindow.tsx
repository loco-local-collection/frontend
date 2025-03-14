import type { Place } from "@/types/spot";
import Image from "next/image";
import { ThumbsUp } from "lucide-react";

/**
 * 마커 위에 표시되는 정보창 컴포넌트
 */
export const MarkerWindow = ({ place }: { place: Place }) => {
  return (
    <div className="flex p-4 min-w-56 bg-primary rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
      {place.imageUrl && (
        <div className="relative w-32 h-32 rounded-md overflow-hidden mr-4">
          <Image
            src={place.imageUrl}
            alt={place.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="grow flex flex-col justify-between gap-3">
        <h3 className="text-lg">{place.title || "마커 정보"}</h3>
        <div className="self-end flex items-center text-sm text-gray-600">
          <ThumbsUp className="w-4 h-4 mr-1" />
          <span>{place.likes}</span>
        </div>
      </div>
    </div>
  );
};
