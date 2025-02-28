import { useState } from "react";

export const useMutation = (url: string, method = "POST") => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (body) => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
};
