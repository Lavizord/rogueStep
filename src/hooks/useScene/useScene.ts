import { useEffect, useState } from "react";
import useAdventureStore from "../../stores/useAdventureStore";
import useUserStore from "../../stores/useUserStore";
import { randomIntFromInterval } from "../../utils/utils";
import { NextScene, scenes } from "../../__fixtures__/fixtures";
import { items } from "../../__fixtures__/itemsFixtures";
import { isUndefined } from "lodash";
import { Scene } from "../../__fixtures__/fixtures";
import usePlaythroughStore from "../../stores/usePlaythroughStore";
import useNotification from "../useNotification/useNotification";
import useBackpack from "../useBackpack/useBackpack";

const useScene = () => {
  const {
    hp,
    addHp,
    addGold,
    reset: resetPlaythrough,
    addItem,
  } = usePlaythroughStore();

  const [scene, setScene] = useState<Scene>({
    _id: 999,
    type: "tas",
    storyId: 0,
    hpChange: 0,
    goldChange: 0,
    text: "Take a step...",
    nextScene: [],
  });

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
    sendNotification({
      textToShow: `${scene.goldChange} gold changed!`,
      style: {
        backgroundColor: "gold",
        color: "black",
      },
    });
    sendNotification({
      textToShow: `${scene.hpChange} hp changed!`,
      style: {
        backgroundColor: "red",
        color: "white",
      },
    });

    if (!isUndefined(sceneToAdvance.itemIds)) {
      sceneToAdvance.itemIds.forEach((itemId) => {
        addItem(items[itemId - 1]);
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
  // Move a cena para uma com o tipo inicial.
  // TODO: Implementar sistema onde a história inicial não se repete, guardando os storyIds e excluido os mesmos ao
  //       iniciar uma nova história.
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
    advanceStoryWithId,
    handleChoice,
    scene,
  };
};

export default useScene;
