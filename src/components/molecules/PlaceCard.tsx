"use client";

import type { Place } from "@/types/spot";
import Image from "next/image";
import { ThumbsUp, MessageSquare, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar } from "@/components/atoms/Avatar";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";

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
        `rounded-lg border hover:shadow-lg overflow-hidden`,
        className,
      )}
    >
      {/* 아바타 및 사용자명 헤더 */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <Avatar
            src={place.author?.profileImage || ""}
            alt={place.author?.name || "User"}
            size="md"
          />
          <span className="font-medium">
            {place.author?.name || "이름박귀찮"}
          </span>
        </div>
        <IconButton
          icon={<MoreHorizontal size={20} />}
          variant="outline"
          size="sm"
          aria-label="More options"
          className="border-none"
        />
      </div>

      {/* 메인 이미지 */}
      <div
        className="relative w-full h-60 bg-gray-200 cursor-pointer"
        onClick={onClick}
      >
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

      {/* 태그 */}
      <div className="flex gap-2 p-4 pt-3">
        {place.tags?.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 text-sm bg-gray-100 rounded-full text-gray-700"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* 컨텐츠 */}
      <div className="px-4 pb-2">
        <h2 className="text-xl font-bold">{place.title}</h2>
        {place.description && (
          <p className="mt-2 text-sm text-gray-700 line-clamp-2">
            {place.description}
          </p>
        )}
      </div>

      {/* 좋아요 및 댓글 */}
      <div className="flex border-t">
        <Button
          variant="outline"
          leftIcon={<ThumbsUp size={18} />}
          className="grow text-gray-500 border-0 hover:bg-gray-100"
        >
          좋아요 {place.likes || 5}
        </Button>
        <Button
          variant="outline"
          leftIcon={<MessageSquare size={18} />}
          className="grow text-gray-500 border-0 hover:bg-gray-100"
        >
          댓글 {place.comments || 13}
        </Button>
      </div>
    </div>
  );
}
