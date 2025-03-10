"use client";

import { useState, useEffect } from "react";

/**
 * 미디어 쿼리를 감지하는 커스텀 훅
 * @param query 미디어 쿼리 문자열 (예: "(max-width: 640px)")
 * @returns 미디어 쿼리 매치 여부
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query);

      setMatches(media.matches);
      const listener = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };
      media.addEventListener("change", listener);

      return () => media.removeEventListener("change", listener);
    }

    return undefined;
  }, [query]);

  return matches;
}
