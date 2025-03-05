import { create } from "zustand";

interface MapStore {
  activeSpotId: number | null;
  setActiveSpotId: (id: number | null) => void;
  center: { lat: number; lng: number };
  setCenter: (center: { lat: number; lng: number }) => void;
}

/**
 * 지도의 중심점과 선택한 마커의 정보를 관리하는 store
 */
export const useMapStore = create<MapStore>((set) => ({
  activeSpotId: null,
  setActiveSpotId: (id) => set({ activeSpotId: id }),
  center: { lat: 37.5665, lng: 126.978 },
  setCenter: (center) => set({ center }),
}));
