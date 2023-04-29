import { Scene, SceneApiParams } from "../../utils/interfaces";
import { useMemo } from "react";
import { useQuery } from "react-query";
import api from "../../api";

type Hook = () => {
  data?: Scene;
  isLoading: boolean;
};
const useGetRndInitScene: Hook = () => {
  const { data, isLoading } = useQuery<Scene>(
    ["scene_id"],
    () => api.getRndInitScene(),
    {
      staleTime: 30000,
    }
  );

  return useMemo(() => {
    return { data, isLoading };
  }, [data, isLoading]);
};

export default useGetRndInitScene;
