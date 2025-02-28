import { useState, useEffect } from "react";

export const usePlaces = (mapId) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch(`/api/maps/${mapId}/places`)
      .then((res) => res.json())
      .then((data) => setPlaces(data));
  }, [mapId]);

  const addPlace = async (placeData) => {
    const response = await fetch(`/api/places`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(placeData),
    });
    const newPlace = await response.json();
    setPlaces((prev) => [...prev, newPlace]);
  };

  const removePlace = async (placeId) => {
    await fetch(`/api/places/${placeId}`, { method: "DELETE" });
    setPlaces((prev) => prev.filter((place) => place.id !== placeId));
  };

  return { places, addPlace, removePlace };
};
