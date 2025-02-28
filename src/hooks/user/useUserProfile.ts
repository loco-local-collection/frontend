import { useState, useEffect } from "react";

export const useUserProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("/api/users/me")
      .then((res) => res.json())
      .then((data) => setProfile(data));
  }, []);

  const updateProfile = async (newProfile) => {
    const response = await fetch("/api/users/me", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProfile),
    });
    const updatedProfile = await response.json();
    setProfile(updatedProfile);
  };

  return { profile, updateProfile };
};
