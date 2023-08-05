import { useEffect, useState } from "react";

type useGetResponse = {
  data: any;
  loading: boolean;
  error: Error | unknown;
  refetch: () => void;
};

export default function useGET<T>(
  endpoint: any,
  dependencies: any = [],
  autoStart = true
): useGetResponse {
  const [data, setData] = useState<T | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null | unknown>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await endpoint();
      setData(res as T);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoStart) {
      fetchData();
    }
  }, dependencies);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
}
