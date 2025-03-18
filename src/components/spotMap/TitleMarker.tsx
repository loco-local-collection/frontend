import Image from "next/image";

interface TitleMarkerProps {
  title: string;
}

const TitleMarker = ({ title }: TitleMarkerProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-4 h-4 mb-1">
        <Image
          src="/default-marker.svg"
          alt="marker"
          fill
          sizes="1rem"
          style={{ objectFit: "contain" }}
        />
      </div>
      <div
        className="px-2 py-0.5 whitespace-nowrap"
        style={{
          textShadow:
            "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff",
        }}
      >
        {title}
      </div>
    </div>
  );
};

export default TitleMarker;
