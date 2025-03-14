import type { Place } from "@/types/spot";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { X, Search } from "lucide-react";
import { Button } from "@/components/atoms/Button";

interface PlaceEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (placeData: Place) => void;
  place: Place;
}

interface FormData {
  title: string;
  description: string;
  tags: string;
}

export default function PlaceEditModal({
  isOpen,
  onClose,
  onEdit,
  place,
}: PlaceEditModalProps) {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    tags: "",
  });

  // Initialize form with place data when modal opens or place changes
  useEffect(() => {
    if (isOpen && place) {
      setFormData({
        title: place.title,
        description: place.description || "",
        tags: "", // Place doesn't have tags, so initialize as empty
      });
    }
  }, [isOpen, place]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Create updated place object, preserving fields not in the form
    const updatedPlace: Place = {
      ...place,
      title: formData.title,
      description: formData.description,
    };

    onEdit?.(updatedPlace);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="relative w-[450px] bg-white rounded-lg shadow-lg p-6">
        {/* Close button */}
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* Title & Description */}
        <h2 className="text-xl font-semibold text-center">장소 정보 수정</h2>
        <p className="text-gray-500 text-sm mt-1 text-center">
          장소 정보를 수정해보세요
        </p>

        <form onSubmit={handleSubmit}>
          {/* Search field (Name/Title) */}
          <div className="mt-6">
            <label htmlFor="name" className="text-sm font-semibold">
              장소 이름
            </label>
            <div className="relative mt-1">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.title}
                onChange={handleChange}
                placeholder="장소 이름"
                className="w-full border rounded-md px-3 py-2 pr-10 text-sm"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <Search size={18} className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-4">
            <label htmlFor="description" className="text-sm font-semibold">
              장소 설명
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="설명을 입력해 주세요"
              className="w-full border rounded-md px-3 py-2 mt-1 text-sm resize-none"
              rows={4}
              maxLength={50}
            />
            <div className="text-right text-xs text-gray-400 mt-1">
              {formData.description.length}/50
            </div>
          </div>

          {/* Tags */}
          <div className="mt-4">
            <label htmlFor="tags" className="text-sm font-semibold">
              장소 관련 태그
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="예시) #여행 #관광 #맛집"
              className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
            />
          </div>

          {/* Bottom buttons */}
          <div className="flex justify-between gap-2 mt-6">
            <Button type="submit" variant="primary" className="flex-1">
              수정
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              취소
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
