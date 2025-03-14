import { create } from "zustand";

interface SpotMapStore {
  activePlaceId: number | null;
  setActivePlaceId: (id: number | null) => void;
  center: { lat: number; lng: number };
  setCenter: (center: { lat: number; lng: number }) => void;
}

interface SidebarStore {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setIsSidebarOpen: (open: boolean) => void;
}

/**
 * 지도의 중심점과 선택한 마커의 정보를 관리하는 store
 */
export const useMapStore = create<SpotMapStore>((set) => ({
  activePlaceId: null,
  setActivePlaceId: (id) => set({ activePlaceId: id }),
  center: { lat: 37.5665, lng: 126.978 },
  setCenter: (center) => set({ center }),
}));

/**
 * 사이드바 open 상태관리
 */
export const useSidebarStore = create<SidebarStore>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setIsSidebarOpen: (open) => set({ isSidebarOpen: open }),
}));
