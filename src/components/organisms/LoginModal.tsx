import { RiKakaoTalkFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { SiNaver } from "react-icons/si";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      {/* 모달 컨테이너 */}
      <div className="relative w-96 h-auto p-6 rounded-lg bg-gradient-to-b from-blue-400 to-blue-500 shadow-lg animate-fadeIn">
        {/* 닫기 버튼 */}
        <button
          className="absolute top-4 right-4 text-white text-2xl"
          onClick={onClose}
          aria-label="닫기"
        >
          <IoClose />
        </button>

        {/* 로고 */}
        <div className="flex justify-center mb-16 mt-16">
          <Image src="/logo.svg" alt="LOCO" width={160} height={80} />
        </div>

        {/* 소셜 로그인 버튼 */}
        <div className="flex flex-col gap-4 mb-16">
          <button className="flex items-center justify-center gap-3 bg-yellow-400 text-black font-bold px-6 py-3 rounded-full shadow-md">
            <RiKakaoTalkFill className="text-xl" />
            카카오로 쉬운시작
          </button>
          <button className="flex items-center justify-center gap-3 bg-blue-700 text-white font-bold px-6 py-3 rounded-full shadow-md">
            <FaFacebookF className="text-xl" />
            페이스북으로 쉬운시작
          </button>
          <button className="flex items-center justify-center gap-3 bg-green-600 text-white font-bold px-6 py-3 rounded-full shadow-md">
            <SiNaver className="text-xl" />
            네이버로 쉬운시작
          </button>
        </div>
      </div>
    </div>
  );
}
