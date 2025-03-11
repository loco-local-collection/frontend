import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

interface SpotCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate?: (spotData: SpotData) => void;
}

interface SpotData {
  name: string;
  description: string;
  color: string;
  password: string;
  confirmPassword: string;
  image: string | null;
}

const colors = [
  "#FF5A5F",
  "#FFAA00",
  "#FFD700",
  "#71C671",
  "#36A2EB",
  "#009688",
  "#AB47BC",
  "#808080",
  "#546E7A",
  "#37474F",
];

export default function SpotCreateModal({
  isOpen,
  onClose,
  onCreate,
}: SpotCreateModalProps) {
  const [formData, setFormData] = useState<SpotData>({
    name: "",
    description: "",
    color: colors[0], // 기본 색상
    password: "",
    confirmPassword: "",
    image: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleColorSelect = (color: string) => {
    setFormData({ ...formData, color });
  };

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    onCreate?.(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="relative w-[450px] bg-white rounded-lg shadow-lg p-6">
        {/* 닫기 버튼 */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* 제목 & 설명 */}
        <h2 className="text-xl font-semibold">생성하기</h2>
        <p className="text-gray-500 text-sm mt-1">정말 만드시겠습니까?</p>

        {/* 이미지 업로드 (임시 이미지) */}
        <div className="mt-4 relative w-full h-40 bg-gray-200 rounded-md flex items-center justify-center">
          {formData.image ? (
            <Image
              src={formData.image}
              alt="Uploaded Image"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          ) : (
            <span className="text-gray-500 text-sm">이미지를 업로드하세요</span>
          )}
        </div>

        {/* 입력 필드 */}
        <div className="mt-4">
          <label className="text-sm font-semibold">스팟 이름</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="새로운 리스트를 입력해주세요"
            className="w-full border rounded px-3 py-2 mt-1 text-sm"
            maxLength={20}
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-semibold">설명</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="설명을 입력해주세요"
            className="w-full border rounded px-3 py-2 mt-1 text-sm"
            maxLength={20}
          />
        </div>

        {/* 색상 선택 */}
        <div className="mt-4">
          <label className="text-sm font-semibold">색상 선택</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {colors.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full ${formData.color === color ? "border-4 border-gray-300" : ""}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
              />
            ))}
          </div>
        </div>

        {/* 비밀번호 입력 */}
        <div className="mt-4">
          <label className="text-sm font-semibold">비밀번호</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="8~17자 비밀번호를 입력해주세요"
            className="w-full border rounded px-3 py-2 mt-1 text-sm"
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-semibold">비밀번호 확인</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="비밀번호를 확인해주세요"
            className="w-full border rounded px-3 py-2 mt-1 text-sm"
          />
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleSubmit}
          >
            생성
          </button>
        </div>
      </div>
    </div>
  );
}
