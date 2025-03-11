"use client";

import type { Spot } from "@/types/map";
import { useState } from "react";
import { SquarePlus, Edit, Trash2 } from "lucide-react";

import SpotCard from "@/components/molecules/SpotCard";
import SpotDetail from "@/components/organisms/SpotDetailModal";
import { Button } from "@/components/atoms/Button";
import { useSpotStore } from "@/store/mapStore";
import SpotCreateModal from "@/components/organisms/SpotCreateModal";

interface SpotEditProps {
  initialData: Spot[];
}

export default function SpotEdit({ initialData }: SpotEditProps) {
  const [spots] = useState<Spot[]>(initialData);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const setActiveSpotId = useSpotStore((state) => state.setActiveSpotId);

  // 수정 버튼 클릭 핸들러
  const handleEdit = (spot: Spot) => {
    console.log("장소 수정:", spot.id);
    setActiveSpotId(spot.id);
    setIsDetailModalOpen(true);
  };

  // 삭제 버튼 클릭 핸들러
  const handleDelete = (spot: Spot) => {
    console.log("장소 삭제:", spot.id);
  };

  // 저장 버튼 클릭 핸들러
  const handleSave = () => {
    console.log("변경사항 저장");
  };

  // 취소 버튼 클릭 핸들러
  const handleCancel = () => {
    console.log("편집 취소");
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[100vh]">
      <div>
        {/* 헤딩과 서브헤딩 */}
        <div className="p-4 text-center">
          <h1 className="text-2xl font-bold mb-2">장소 추가</h1>
          <p className="text-gray-600">당신이 아는 곳들을 공유해 보세요</p>
        </div>

        {/* Spots 상세 모달 */}
        <SpotDetail
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
        />

        {/* Spots 상세 모달 */}
        <SpotCreateModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />

        {/* Spots 리스트 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {/* 추가하기 버튼 */}
          <div className="flex">
            <div
              className="w-full min-h-[200px] cursor-pointer rounded-lg border hover:shadow-lg overflow-hidden flex flex-col gap-2 items-center justify-center bg-gray-100"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <div className="flex items-center justify-center py-4">
                <SquarePlus size={36} className="text-gray-400" />
              </div>
              <h2 className="font-semibold text-gray-600 pb-4">추가하기</h2>
            </div>
          </div>

          {/* 스팟 카드들 */}
          {spots.map((spot, index) => (
            <div key={index} className="flex flex-col">
              <SpotCard
                spot={spot}
                className="w-full flex-grow hover:shadow-none cursor-auto"
              />
              {/* 수정/삭제 버튼 */}
              <div className="flex mt-2 space-x-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  leftIcon={<Edit size={16} />}
                  onClick={() => handleEdit(spot)}
                >
                  수정
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="flex-1"
                  leftIcon={<Trash2 size={16} />}
                  onClick={() => handleDelete(spot)}
                >
                  삭제
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 저장/취소 버튼 */}
      <div className="flex justify-center space-x-10 py-4 mt-4">
        <Button variant="primary" className="px-10 h-9" onClick={handleSave}>
          저장
        </Button>
        <Button variant="outline" className="px-10 h-9" onClick={handleCancel}>
          취소
        </Button>
      </div>
    </div>
  );
}
