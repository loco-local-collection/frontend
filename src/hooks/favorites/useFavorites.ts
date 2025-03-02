import { useState, useEffect } from "react";

interface Favorite {
  id: number;
  mapId: number;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    fetch("/api/favorites")
      .then((res) => res.json())
      .then((data: Favorite[]) => setFavorites(data))
      .catch((error) => console.error("Failed to fetch favorites:", error));
  }, []);

  const addFavorite = async (mapId: number) => {
    try {
      const response = await fetch(`/api/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mapId }),
      });

      if (!response.ok) throw new Error("Failed to add favorite");

      const newFavorite: Favorite = await response.json();
      setFavorites((prev) => [...prev, newFavorite]);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFavorite = async (favId: number) => {
    try {
      const response = await fetch(`/api/favorites/${favId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to remove favorite");

      setFavorites((prev) => prev.filter((fav) => fav.id !== favId));
    } catch (error) {
      console.error(error);
    }
  };

  return { favorites, addFavorite, removeFavorite };
};
