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
import useGetRandomScene from "../useGetRandomScene/useGetRandomScene";
import useGetScene from "../useGetScene/useGetScene";

const useScene = () => {
  const { hp, addHp, addGold, reset: resetPlaythrough } = usePlaythroughStore();

  const [scene, setScene] = useState<Scene>({
    _id: 999,
    type: "tas",
    storyId: 0,
    sceneEffect: {
      hpChange: 0,
      goldChange: 0,
    },
    text: "Take a step...",
    choices: [],
  });

  const {
    data: randomScene,
    isLoading: isLoadingRandomScene,
    refetch: refetchRandomScene,
  } = useGetRandomScene();

  const {
    data: sceneData,
    isLoading: isLoadingScene,
    refetch: refetchScene,
  } = useGetScene({ id: "1" });

  useEffect(() => {
    console.log("isLoading", isLoadingRandomScene);
    console.log("randomScene: ", randomScene);
  }, [isLoadingRandomScene, randomScene]);

  const { addSteps, steps, reset: resetAdventure } = useAdventureStore();
  const { addtotalSteps, addtotalPlaythrough } = useUserStore();
  const { sendNotification } = useNotification();

  const { handleAddBackpackByIds } = useBackpack();

  useEffect(() => {
    if (!isLoadingRandomScene && !isUndefined(randomScene))
      setScene(randomScene);
  }, [randomScene]);

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
    const { hpChange, goldChange } = sceneToAdvance.sceneEffect;
    addSteps(1);
    addHp(hpChange);
    addGold(goldChange);
    setScene(sceneToAdvance);
    if (goldChange !== 0) {
      sendNotification({
        textToShow: `${goldChange} gold changed!`,
        style: {
          backgroundColor: "gold",
          color: "black",
        },
      });
    }
    if (hpChange !== 0) {
      sendNotification({
        textToShow: `${hpChange} hp changed!`,
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
    handleAdvance(refetchRandomScene());
    PlayerDeathCheck();
  };

  const advanceStoryWithId = (id: number) => {
    const newScene = scenes.find((scene) => scene._id === id);

    if (!isUndefined(newScene)) {
      handleAdvance(newScene);
    } else refetchRandomScene();
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
