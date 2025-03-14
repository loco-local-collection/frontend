"use client";

import type { Place } from "@/types/spot";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PlaceCardProps {
  place: Place;
  onClick?: () => void;
  className?: string;
}

export default function PlaceCard({
  place,
  onClick,
  className,
}: PlaceCardProps) {
  return (
    <div
      className={cn(
        `cursor-pointer rounded-lg border hover:shadow-lg overflow-hidden`,
        className,
      )}
      onClick={onClick}
    >
      <div className="relative w-full h-32 bg-gray-200">
        {place.imageUrl ? (
          <Image
            src={place.imageUrl}
            alt={place.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="font-semibold truncate">{place.title}</h2>
        {place.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {place.description}
          </p>
        )}
      </div>
    </div>
  );
}
