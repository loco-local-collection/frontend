"use client";

import type { Spot } from "@/types/map";
import Image from "next/image";

interface SpotCardProps {
  spot: Spot;
  onClick: () => void;
}

export default function SpotCard({ spot, onClick }: SpotCardProps) {
  return (
    <div
      className="cursor-pointer rounded-lg border hover:shadow-lg overflow-hidden"
      onClick={onClick}
    >
      {spot.imageUrl && (
        <div className="relative w-full h-32">
          <Image
            src={spot.imageUrl}
            alt={spot.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold truncate">{spot.title}</h2>
        {spot.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {spot.description}
          </p>
        )}
      </div>
    </div>
  );
}
