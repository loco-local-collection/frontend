import { create } from "zustand";

interface SpotStore {
  activeSpotId: number | null;
  setActiveSpotId: (id: number | null) => void;
  center: { lat: number; lng: number };
  setCenter: (center: { lat: number; lng: number }) => void;
}

/**
 * 지도의 중심점과 선택한 마커의 정보를 관리하는 store
 */
export const useSpotStore = create<SpotStore>((set) => ({
  activeSpotId: null,
  setActiveSpotId: (id) => set({ activeSpotId: id }),
  center: { lat: 37.5665, lng: 126.978 },
  setCenter: (center) => set({ center }),
}));

interface SidebarStore {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setIsSidebarOpen: (open: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setIsSidebarOpen: (open) => set({ isSidebarOpen: open }),
}));
