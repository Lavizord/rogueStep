import { useEffect, useState } from 'react';
import useAdventureStore from '../stores/useAdventureStore';
import usePlaythroughStore from '../stores/usePlaythroughStore';
import useUserStore from '../stores/useUserStore';
import { randomIntFromInterval } from '../utils/utils';
import { advancedPrompts1 } from '../__fixtures__/fixtures';
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

const useGetNextPrompt = () => {

  const [prompt, setPrompt] = useState<Scene>({
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
    getInitialPrompt();
  }, [])

  const getInitialPrompt = () => {
  // TODO: fazer a logica aqui e usar um useMountEffect para chamar esta função

  // doBuffEffects = Retorna funcao de efeito de buffed. 
  const initialPrompts = advancedPrompts1.filter((prompt) => (prompt.type === 'initial'));
  
  // Este é o método normal de geração aleatória.
  // const nextPrompt = initialPrompts[randomIntFromInterval(0, initialPrompts.length)];
  // Este é o método DEBUG para iniciar a primeira scena numa escolhida.
  const nextPrompt = advancedPrompts1.filter((prompt) => (prompt._id === 7));

  setPrompt(nextPrompt[0]);

  }

  const randomizeInitialPrompt = () => {
    const initialPrompts = advancedPrompts1.filter((prompt) => (prompt.type === 'initial'));
    
    const nextPrompt = initialPrompts[randomIntFromInterval(0, initialPrompts.length)];
    setPrompt(nextPrompt);
  }

  const PlayerDeathCheck = () => {
    if( hp <= 0) {
      // mostrar prompt de game over com botao de restart
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

  const getNextPrompt = () => {
    // Para já não existe necessidade de filtrar. Fica isto aqui como exemplo.
    // const filter = advancedPrompts1.filter((a) => a.hpChange === 5);
    /* const rndmInterval = randomIntFromInterval(0, advancedPrompts1.length);
    const newPrompt = advancedPrompts1[rndmInterval]; */

    randomizeInitialPrompt()
    addSteps(1);
    addHp(prompt.hpChange);
    addGold(prompt.goldChange);
    sendNotification({ textToShow:`${prompt.goldChange} gold changed`, style: { backgroundColor: 'gold', color: 'black', border: '1px solid black', minWidth: '135px', width: '135px'  }});

    sendNotification({textToShow:`${prompt.hpChange} hp changed`, style: { backgroundColor: 'red', color: 'white',  border: '1px solid black', minWidth: '135px', width: '135px' }});
    if(!isUndefined(prompt.itemIds)) 
      {
        prompt.itemIds.forEach(( itemId ) => { 
          addItem(items[itemId - 1]); 
          sendNotification({textToShow: "item added", style: { backgroundColor: 'gray', color: 'white',  border: '1px solid black', minWidth: '135px', width: '135px' }});
        });
    }
    
    PlayerDeathCheck();   
  };
  

  const getPromptById = (id: number) => {
   
    const newPrompt = advancedPrompts1.find((scene) => scene._id === id);

    if(!isUndefined(newPrompt))
    {
      addSteps(1);
      addHp(newPrompt.hpChange);
      addGold(newPrompt.goldChange);
      setPrompt(newPrompt);
      sendNotification({textToShow:`${prompt.goldChange} gold changed`, style: { backgroundColor: 'gold', color: 'black', border: '1px solid black', minWidth: '135px', width: '135px'  }});
      sendNotification({textToShow:`${prompt.hpChange} hp changed`, style: { backgroundColor: 'red', color: 'white',  border: '1px solid black', minWidth: '135px', width: '135px' }});

      if(!isUndefined(newPrompt.itemIds)) 
      {
        newPrompt.itemIds.forEach(( itemId ) => { 
          addItem(items[itemId - 1]); 
          sendNotification({textToShow: "item added", style: { backgroundColor: 'gray', color: 'white',  border: '1px solid black', minWidth: '135px', width: '135px' }});
        });
    }
    }
    else randomizeInitialPrompt();
  }

  return {
    getNextPrompt,
    getPromptById,
    prompt
  }
}

export default useGetNextPrompt;