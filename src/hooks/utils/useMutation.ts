import { useState } from "react";

export const useMutation = <T, R>(
  url: string,
  method: "POST" | "PUT" | "DELETE" = "POST"
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (body: T): Promise<R | null> => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data: R = await res.json(); // ✅ `R` 타입으로 응답 데이터 설정
      return data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
};
