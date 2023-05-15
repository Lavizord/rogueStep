import { SceneApiParams } from "../utils/interfaces";
import axiosApi from "./config";

const endpoints = {
  getScenes: `/scenes/`,
  getRandomScene: `/scenes/initial/random`,
  getScene: (id: string) => `/scenes/${id}`,
  getSceneEffect: (id: string) => `/sceneEffect/${id}`,
  getRndInitScene: `/scenes/random/initial/`,
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

export const getRndInitScene = async () => {
  const { data } = await axiosApi.get(endpoints.getRndInitScene);
  return data;
};
export const getRandomScene = async () => {
  const { data } = await axiosApi.get(endpoints.getRandomScene);

  return data;
};
