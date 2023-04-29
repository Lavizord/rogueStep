import { useEffect, useState } from "react";
import useAdventureStore from "../../stores/useAdventureStore";
import useUserStore from "../../stores/useUserStore";
import { randomIntFromInterval } from "../../utils/utils";
import { scenes } from "../../__fixtures__/fixtures";
import { isUndefined } from "lodash";
import { Scene, NextScene } from "../../utils/interfaces";
import usePlaythroughStore from "../../stores/usePlaythroughStore";
import useNotification from "../useNotification/useNotification";
import useBackpack from "../useBackpack/useBackpack";
import useGetAllScenes from "../useGetAllScenes/useGetAllScenes";
import useGetRndInitScene from "../useGetRndInitScene/useGetRndInitScene";

const useScene = () => {
  const { hp, addHp, addGold, reset: resetPlaythrough } = usePlaythroughStore();

  const [scene, setScene] = useState<Scene>({
    _id: 999,
    type: "tas",
    storyId: 0,
    hpChange: 0,
    goldChange: 0,
    text: "Take a step...",
    nextScene: [],
  });

  const { data: allScenes, isLoading } = useGetRndInitScene();

  useEffect(() => {
    console.log("isLoading", isLoading);
    console.log("allScenes: ", allScenes);
  }, [isLoading, allScenes]);

  const { addSteps, steps, reset: resetAdventure } = useAdventureStore();
  const { addtotalSteps, addtotalPlaythrough } = useUserStore();
  const { sendNotification } = useNotification();

  const { handleAddBackpackByIds } = useBackpack();

  useEffect(() => {
    setScene(getRandomInitialScene());
  }, []);

  const getRandomInitialScene = () => {
    const initialScenes = scenes.filter((scene) => scene.type === "initial");

    return initialScenes[randomIntFromInterval(0, initialScenes.length)];
  };

  const PlayerDeathCheck = () => {
    if (hp <= 0) {
      // mostrar scene de game over com botao de restart
      addtotalPlaythrough(1);
      addtotalSteps(steps);
      resetAdventure();
      resetPlaythrough();
    }
  };

  const handleAdvance = (sceneToAdvance: Scene) => {
    addSteps(1);
    addHp(sceneToAdvance.hpChange);
    addGold(sceneToAdvance.goldChange);
    setScene(sceneToAdvance);
    if (sceneToAdvance.goldChange !== 0) {
      sendNotification({
        textToShow: `${sceneToAdvance.goldChange} gold changed!`,
        style: {
          backgroundColor: "gold",
          color: "black",
        },
      });
    }
    if (sceneToAdvance.hpChange !== 0) {
      sendNotification({
        textToShow: `${sceneToAdvance.hpChange} hp changed!`,
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    }
    if (!isUndefined(sceneToAdvance.itemIds)) {
      handleAddBackpackByIds(sceneToAdvance.itemIds);
      sceneToAdvance.itemIds.forEach((itemId) => {
        sendNotification({
          textToShow: "item added!",
          style: {
            backgroundColor: "gray",
            color: "white",
          },
        });
      });
    }
  };

  const startNewStory = () => {
    handleAdvance(getRandomInitialScene());
    PlayerDeathCheck();
  };

  const advanceStoryWithId = (id: number) => {
    const newScene = scenes.find((scene) => scene._id === id);

    if (!isUndefined(newScene)) {
      handleAdvance(newScene);
    } else setScene(getRandomInitialScene());
    PlayerDeathCheck();
  };

  const handleChoice = (choice: NextScene) => {
    if (!isUndefined(choice.itemIds)) {
      handleAddBackpackByIds(choice.itemIds);
    }
    if (!isUndefined(choice.nextSceneId)) {
      advanceStoryWithId(choice.nextSceneId);
    }
  };

  return {
    startNewStory,
    handleChoice,
    scene,
  };
};

export default useScene;
