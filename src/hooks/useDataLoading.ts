import { useState, useEffect, useCallback } from "react";

interface UseDataLoadingOptions<T> {
  loader: () => Promise<T>;
  dependencies?: unknown[];
}

interface UseDataLoadingReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Generic data loading hook for consistent loading, error, and data states
 */
export const useDataLoading = <T>({
  loader,
  dependencies = [],
}: UseDataLoadingOptions<T>): UseDataLoadingReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await loader();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [loader]);

  const refetch = useCallback(async () => {
    await loadData();
  }, [loadData]);

  useEffect(() => {
    loadData();
  }, [loadData, ...dependencies]);

  return { data, loading, error, refetch };
};
