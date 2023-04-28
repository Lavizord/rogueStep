import { SceneApiParams } from "../utils/interfaces";
import axiosApi from "./config";

const endpoints = {
  getScene: (id: string) => `/scenes/${id}`,
  getScenes: `/scenes/`,
  getSceneEffect: (id: string) => `/sceneEffect/${id}`,
};

export const getScene = async (params: SceneApiParams) => {
  const { data } = await axiosApi.get(endpoints.getScene(params.id));

  return data;
};

export const getScenes = async () => {
  const { data } = await axiosApi.get(endpoints.getScenes);

  return data;
};
export const getSceneEffect = async (params: SceneApiParams) => {
  const { data } = await axiosApi.get(endpoints.getSceneEffect(params.id));

  return data;
};
