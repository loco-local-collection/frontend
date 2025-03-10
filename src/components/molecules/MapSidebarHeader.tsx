import Image from "next/image";
import { cn } from "@/lib/utils";

const headerBgImageUrl = "";

export default function MapSidebarHeader() {
  return (
    <div
      className={cn(
        "relative h-13 sm:h-52 flex flex-col items-center justify-center sm:items-start sm:justify-end px-6 py-4",
        headerBgImageUrl ? "bg-transparent" : "bg-gray-700",
      )}
    >
      {headerBgImageUrl && (
        <Image
          src={headerBgImageUrl}
          alt="Header Background"
          fill
          className="object-cover brightness-50"
        />
      )}
      <h1 className="font-semibold text-white">
        내가 좋아하는 서울 디저트 맛집 모음
      </h1>
    </div>
  );
}
