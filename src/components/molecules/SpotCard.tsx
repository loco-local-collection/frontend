"use client";

import type { Spot } from "@/types/map";
import Image from "next/image";

interface SpotCardProps {
  spot: Spot;
  onClick: () => void;
  className?: string;
}

export default function SpotCard({ spot, onClick, className }: SpotCardProps) {
  return (
    <div
      className={`cursor-pointer rounded-lg border hover:shadow-lg overflow-hidden ${className}`}
      onClick={onClick}
    >
      <div className="relative w-full h-32 bg-gray-200">
        {spot.imageUrl ? (
          <Image
            src={spot.imageUrl}
            alt={spot.title}
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
        <h2 className="font-semibold truncate">{spot.title}</h2>
        {spot.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {spot.description}
          </p>
        )}
      </div>
    </div>
  );
}
