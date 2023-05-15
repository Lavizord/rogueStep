import { Scene } from "../../utils/interfaces";
import { useMemo } from "react";
import { useQuery } from "react-query";
import api from "../../api/";

type Hook = () => {
  data?: Scene;
  isLoading: boolean;
  refetch: () => void;
};

const useGetRandomScene: Hook = () => {
  const { data, isLoading, refetch } = useQuery<Scene>(
    [],
    () => api.getRandomScene(),
    {
      staleTime: 30000,
    }
  );

  return useMemo(() => {
    return { data, isLoading, refetch };
  }, [data, isLoading, refetch]);
};

export default useGetRandomScene;
