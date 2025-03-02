import { useState, useEffect } from "react";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface UpdateUserProfile {
  name?: string;
  email?: string;
  avatarUrl?: string;
}

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    fetch("/api/users/me")
      .then((res) => res.json())
      .then((data: UserProfile) => setProfile(data))
      .catch((error) => console.error("Failed to fetch profile:", error));
  }, []);

  const updateProfile = async (newProfile: UpdateUserProfile) => {
    try {
      const response = await fetch("/api/users/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProfile),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const updatedProfile: UserProfile = await response.json();
      setProfile(updatedProfile);
    } catch (error) {
      console.error(error);
    }
  };

  return { profile, updateProfile };
};
