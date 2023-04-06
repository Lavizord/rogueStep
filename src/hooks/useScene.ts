import { useEffect, useState } from 'react';
import useAdventureStore from '../stores/useAdventureStore';
import usePlaythroughStore from '../stores/usePlaythroughStore';
import useUserStore from '../stores/useUserStore';
import { randomIntFromInterval } from '../utils/utils';
import { scenes } from '../__fixtures__/fixtures';
import { items } from '../__fixtures__/itemsFixtures';
import { isUndefined } from 'lodash';
import { Scene } from '../__fixtures__/fixtures';
import { useSnackbar } from 'notistack';


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

const useScene = () => {

  const [scene, setScene] = useState<Scene>({
    _id: 999,
    type: 'tas',
    storyId: 0,
    hpChange: 0,
    goldChange: 0,
    text: "Take a step...",
    nextScene: []
});

  const { hp, addHp, addGold, reset: resetPlaythrough, addItem} = usePlaythroughStore();
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

  const advanceStory = () => {
    // Para já não existe necessidade de filtrar. Fica isto aqui como exemplo.
    // const filter = scenes.filter((a) => a.hpChange === 5);
    /* const rndmInterval = randomIntFromInterval(0, scenes.length);
    const newPrompt = scenes[rndmInterval]; */

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
  

  const getSceneById = (id: number) => {

    const newScene = scenes.find((scene) => scene._id === id);

    if(!isUndefined(newScene))
    {
      addSteps(1);
      addHp(newScene.hpChange);
      addGold(newScene.goldChange);
      setScene(newScene);
      sendNotification({textToShow:`${scene.goldChange} gold changed`, style: { backgroundColor: 'gold', color: 'black', border: '1px solid black', minWidth: '135px', width: '135px'  }});
      sendNotification({textToShow:`${scene.hpChange} hp changed`, style: { backgroundColor: 'red', color: 'white',  border: '1px solid black', minWidth: '135px', width: '135px' }});

      if(!isUndefined(newScene.itemIds)) 
      {
        newScene.itemIds.forEach(( itemId ) => { 
          addItem(items[itemId - 1]); 
          sendNotification({textToShow: "item added", style: { backgroundColor: 'gray', color: 'white',  border: '1px solid black', minWidth: '135px', width: '135px' }});
        });
    }
    }
    else randomizeInitialScene();
  }

  return {
    advanceStory,
    getSceneById,
    scene
  }
}

export default useScene;