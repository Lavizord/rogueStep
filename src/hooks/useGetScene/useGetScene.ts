import { Scene, SceneApiParams } from "../../utils/interfaces";
import { useMemo } from "react";
import { useQuery } from "react-query";
import api from "../../api/";

type Hook = (params: SceneApiParams) => {
  data?: Scene;
  isLoading: boolean;
};
const useGetScene: Hook = (params: SceneApiParams) => {
  const { data, isLoading } = useQuery<Scene>(
    ["scene_id"],
    () => api.getScene(params),
    {
      staleTime: 30000,
    }
  );

  return useMemo(() => {
    return { data, isLoading };
  }, [data, isLoading]);
};

export default useGetScene;
