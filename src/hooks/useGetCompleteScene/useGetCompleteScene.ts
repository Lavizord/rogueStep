import { Scene, SceneApiParams } from "../../utils/interfaces";
import { useMemo } from "react";
import { useQuery } from "react-query";
import api from "../../api/";

type Hook = (params: SceneApiParams) => {
  data?: Scene;
  isLoading: boolean;
};
const useGetCompleteScene: Hook = (params: SceneApiParams) => {
  const { data, isLoading } = useQuery<Scene>(
    ["scene_id"],
    () => api.getCompleteScene(params),
    {
      staleTime: 30000,
    }
  );

  return useMemo(() => {
    return { data, isLoading };
  }, [data, isLoading]);
};

export default useGetCompleteScene;
