import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
}

export const Avatar = ({ src, alt, size = "md" }: AvatarProps) => {
  const sizeMap = {
    sm: 24,
    md: 32,
    lg: 40,
  };

  const sizeValue = sizeMap[size];

  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden bg-gray-200 flex-shrink-0",
        `w-${sizeValue / 4} h-${sizeValue / 4}`,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt || "Avatar"}
          width={sizeValue}
          height={sizeValue}
          className="object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
          {alt?.charAt(0).toUpperCase() || "U"}
        </div>
      )}
    </div>
  );
};
