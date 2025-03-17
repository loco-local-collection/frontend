import { Spot } from "@/domains/spot/spot.entity";
import clsx from "clsx";
import Image from "next/image";

interface Props {
  className?: string;
  spot: Spot;
}

export const SpotItem = (props: Props) => {
  return (
    <div className={clsx(props.className)}>
      <div
        key={props.spot.id}
        className="border rounded-lg shadow-sm overflow-hidden flex flex-row md:flex-col relative"
      >
        {/* 카드 이미지 */}
        <div className="relative w-1/3 md:w-full items-center">
          <Image
            src={props.spot.thumbnail}
            width={600}
            height={600}
            alt={props.spot.title}
            className="w-full h-full object-cover p-4"
          />
          {props.spot.label && (
            <span className="absolute top-2 left-2 bg-sky-600 text-white text-xs px-3 py-1 rounded shadow-md">
              {props.spot.label}
            </span>
          )}
        </div>

        {/* 카드 내용 */}
        <div className="p-1 md:p-4 text-sm w-2/3 md:w-full">
          <h3 className="font-bold py-2">{props.spot.title}</h3>
          <p className="text-sm py-2">{props.spot.description}</p>
          <p className="text-gray-600 text-xs py-2">{props.spot.authorId}</p>

          {/* 태그 */}
          {props.spot.tags && (
            <div className="flex gap-2 mt-2 flex-wrap py-2">
              {props.spot.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 px-2 py-1 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* 참여하기 버튼 */}
          <button
            className="w-full mt-3 py-2 border rounded text-center text-sm bg-sky-600 text-white"
            onClick={() => window.open(props.spot.shareLink, "_blank")}
          >
            참여하기
          </button>
        </div>
      </div>
    </div>
  );
};
