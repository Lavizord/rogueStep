export interface NextScene {
  nextSceneId?: number;
  choiceText?: string;
  itemIds?: number[];
}

export interface SceneEffect {
  hpChange: number;
  goldChange: number;
}
export interface Scene {
  _id: number;
  type?: string;
  storyId: number;
  sceneEffect: SceneEffect;
  text: string;
  choices: NextScene[];
  itemIds?: number[];
}

export interface SceneApiParams {
  id: string;
}
