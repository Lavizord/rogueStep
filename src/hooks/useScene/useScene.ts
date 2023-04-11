import { useEffect, useState } from 'react';
import useAdventureStore from '../../stores/useAdventureStore';
import useUserStore from '../../stores/useUserStore';
import { randomIntFromInterval } from '../../utils/utils';
import { NextScene, scenes } from '../../__fixtures__/fixtures';
import { Item, items } from '../../__fixtures__/itemsFixtures';
import { isUndefined } from 'lodash';
import { Scene } from '../../__fixtures__/fixtures';
import { useSnackbar } from 'notistack';

// TODO: Onde estamos a usar addItem() alterar para chamar o hook do handleAddBackpackByIds()

type EnqueueProps = {
  textToShow: string;
  style: {
    backgroundColor?: string;
    color?: string;
    border?: string;
    minWidth?: string;
    width?: string;
  };
}
type Props ={
  hp: number;
  addHp:(hpToAdd: number) => void;
  addGold: (goldToAdd: number) => void;
  resetPlaythrough: () => void; 
  addItem: (newItem: Item) => void; 
  handleAddBackpackByIds: (itemIds: number[]) => void;
}
const useScene = ({ hp, addHp, addGold, resetPlaythrough, addItem, handleAddBackpackByIds} : Props) => {

  const [scene, setScene] = useState<Scene>({
    _id: 999,
    type: 'tas',
    storyId: 0,
    hpChange: 0,
    goldChange: 0,
    text: "Take a step...",
    nextScene: []
});

  const { addSteps, steps, reset: resetAdventure } = useAdventureStore();
  const { addtotalSteps, addtotalPlaythrough } = useUserStore();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    randomizeInitialScene();
  }, [])

  const randomizeInitialScene = () => {
    const initialPrompts = scenes.filter((scene) => (scene.type === 'initial'));
    
    const nextPrompt = initialPrompts[randomIntFromInterval(0, initialPrompts.length)];
    setScene(nextPrompt);
  }

  const PlayerDeathCheck = () => {
    if( hp <= 0) {
      // mostrar scene de game over com botao de restart
      addtotalPlaythrough(1);
      addtotalSteps(steps);
      resetAdventure();
      resetPlaythrough();
      
    }
  }

  const sendNotification = ({ textToShow, style}: EnqueueProps) => {
    enqueueSnackbar(`${textToShow}!`, { autoHideDuration: 1500, 
      style });
  }

  // Move a cena para uma com o tipo inicial.
  // TODO: Implementar sistema onde a história inicial não se repete, guardando os storyIds e excluido os mesmos ao 
  //       iniciar uma nova história.
  const startNewStory = () => {
    randomizeInitialScene();
    addSteps(1);
    addHp(scene.hpChange);
    addGold(scene.goldChange);
    sendNotification({ textToShow:`${scene.goldChange} gold changed`, style: { backgroundColor: 'gold', color: 'black', border: '1px solid black', minWidth: '135px', width: '135px'  }});
    sendNotification({textToShow:`${scene.hpChange} hp changed`, style: { backgroundColor: 'red', color: 'white',  border: '1px solid black', minWidth: '135px', width: '135px' }});
    if(!isUndefined(scene.itemIds)) 
      {
        scene.itemIds.forEach(( itemId ) => { 
          addItem(items[itemId - 1]); 
          sendNotification({textToShow: "item added", style: { backgroundColor: 'gray', color: 'white',  border: '1px solid black', minWidth: '135px', width: '135px' }});
        });
    }   
    PlayerDeathCheck();   
  };
  
  const advanceToSceneWithId = (id: number) => {
    const newScene = scenes.find((scene) => scene._id === id);

    if(!isUndefined(newScene))
    {
      addSteps(1);
      addHp(newScene.hpChange);
      addGold(newScene.goldChange);
      setScene(newScene);
      sendNotification({textToShow:`${scene.goldChange} gold changed`, style: { 
        backgroundColor: 'gold', 
        color: 'black', 
        border: '1px solid black', 
        minWidth: '135px', 
        width: '135px'  
      }});
      sendNotification({textToShow:`${scene.hpChange} hp changed`, style: { 
        backgroundColor: 'red', 
        color: 'white',  
        border: '1px solid black', 
        minWidth: '135px', 
        width: '135px' 
      }});

      if(!isUndefined(newScene.itemIds)) 
      {
        newScene.itemIds.forEach(( itemId ) => { 
          addItem(items[itemId - 1]); 
          sendNotification({textToShow: "item added", style: { 
            backgroundColor: 'gray', 
            color: 'white', 
            border: '1px solid black', 
            minWidth: '135px', 
            width: '135px' 
          }});
        });
      }
    }
    else randomizeInitialScene();
  }

  const handleChoice = (choice: NextScene) => {
    if(!isUndefined(choice.itemIds)) { 
      handleAddBackpackByIds(choice.itemIds)
    };
    if(!isUndefined(choice.nextSceneId)) { 
      advanceToSceneWithId(choice.nextSceneId)
    };
  }

  return {
    startNewStory,
    advanceToSceneWithId,
    handleChoice,
    scene
  }
}

export default useScene;