import { useState, useCallback } from "react";

const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const triggerFetch = useCallback(
    async (options?: RequestInit) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const result = (await response.json()) as T;
        setData(result);
      } catch (err) {
        setError((err as Error).message || "An error occurred");
      } finally {
        setLoading(false);
      }
      await data;
    },
    [url]
  );

  return { data, error, loading, triggerFetch };
};

export default useFetch;
