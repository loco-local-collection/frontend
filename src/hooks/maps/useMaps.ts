import { useState, useEffect } from "react";

interface MapItem {
  id: number;
  name: string;
  location: { lat: number; lng: number };
}

interface CreateMapData {
  name: string;
  location: { lat: number; lng: number };
}

export const useMaps = () => {
  const [maps, setMaps] = useState<MapItem[]>([]);

  useEffect(() => {
    fetch("/api/maps")
      .then((res) => res.json())
      .then((data: MapItem[]) => setMaps(data))
      .catch((error) => console.error("Failed to fetch maps:", error));
  }, []);

  const createMap = async (mapData: CreateMapData) => {
    try {
      const response = await fetch("/api/maps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mapData),
      });

      if (!response.ok) throw new Error("Failed to create map");

      const newMap: MapItem = await response.json();
      setMaps((prev) => [...prev, newMap]);
    } catch (error) {
      console.error(error);
    }
  };

  return { maps, createMap };
};
