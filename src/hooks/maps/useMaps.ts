import { useState, useEffect } from "react";

export const useMaps = () => {
  const [maps, setMaps] = useState([]);

  useEffect(() => {
    fetch("/api/maps")
      .then((res) => res.json())
      .then((data) => setMaps(data));
  }, []);

  const createMap = async (mapData) => {
    const response = await fetch("/api/maps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mapData),
    });
    const newMap = await response.json();
    setMaps((prev) => [...prev, newMap]);
  };

  return { maps, createMap };
};
