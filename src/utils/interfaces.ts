export interface NextScene {
  nextSceneId?: number;
  choiceText?: string;
  itemIds?: number[];
}
export interface Scene {
  _id: number;
  type?: string;
  storyId: number;
  hpChange: number;
  goldChange: number;
  text: string;
  nextScene: NextScene[];
  itemIds?: number[];
}

export interface SceneApiParams {
  id: string;
}
