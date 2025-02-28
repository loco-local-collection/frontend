import { useState, useEffect } from "react";

export const useQuery = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch(url)
      .then((res) => res.json())
      .then((data) => isMounted && setData(data))
      .catch((error) => isMounted && setError(error))
      .finally(() => isMounted && setLoading(false));

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
};
