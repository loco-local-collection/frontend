import { useState } from "react";

export const useSidebar = () => {
  const [activeMenu, setActiveMenu] = useState("/");
  const [markers, setMarkers] = useState<
    { lat: number; lng: number; title: string }[]
  >([]);

  const handleSelectPlace = (lat: number, lng: number, title: string) => {
    setMarkers((prev) => [...prev, { lat, lng, title }]);
  };

  return {
    activeMenu,
    setActiveMenu,
    markers,
    handleSelectPlace,
  };
};
