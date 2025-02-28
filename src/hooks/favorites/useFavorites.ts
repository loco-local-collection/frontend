import { useState, useEffect } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch("/api/favorites")
      .then((res) => res.json())
      .then((data) => setFavorites(data));
  }, []);

  const addFavorite = async (mapId) => {
    const response = await fetch(`/api/favorites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mapId }),
    });
    const newFavorite = await response.json();
    setFavorites((prev) => [...prev, newFavorite]);
  };

  const removeFavorite = async (favId) => {
    await fetch(`/api/favorites/${favId}`, { method: "DELETE" });
    setFavorites((prev) => prev.filter((fav) => fav.id !== favId));
  };

  return { favorites, addFavorite, removeFavorite };
};
