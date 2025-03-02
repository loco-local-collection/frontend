import { useState, useEffect } from "react";

interface Place {
  id: number;
  name: string;
  description?: string;
  location: { lat: number; lng: number };
  mapId: number;
}

interface CreatePlaceData {
  name: string;
  description?: string;
  location: { lat: number; lng: number };
  mapId: number;
}

export const usePlaces = (mapId: number | string) => {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    if (!mapId) return; // ✅ mapId가 없을 경우 fetch 실행 방지

    fetch(`/api/maps/${mapId}/places`)
      .then((res) => res.json())
      .then((data: Place[]) => setPlaces(data))
      .catch((error) => console.error("Failed to fetch places:", error));
  }, [mapId]);

  const addPlace = async (placeData: CreatePlaceData) => {
    try {
      const response = await fetch(`/api/places`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(placeData),
      });

      if (!response.ok) throw new Error("Failed to add place");

      const newPlace: Place = await response.json();
      setPlaces((prev) => [...prev, newPlace]);
    } catch (error) {
      console.error(error);
    }
  };

  const removePlace = async (placeId: number | string) => {
    try {
      const response = await fetch(`/api/places/${placeId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to remove place");

      setPlaces((prev) => prev.filter((place) => place.id !== placeId));
    } catch (error) {
      console.error(error);
    }
  };

  return { places, addPlace, removePlace };
};
