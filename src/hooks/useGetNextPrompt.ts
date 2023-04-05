import { useEffect, useState } from 'react';
import useAdventureStore from '../stores/useAdventureStore';
import usePlaythroughStore from '../stores/usePlaythroughStore';
import useUserStore from '../stores/useUserStore';
import { randomIntFromInterval } from '../utils/utils';
import { advancedPrompts1 } from '../__fixtures__/fixtures';
import { isUndefined } from 'lodash';
import { Scene } from '../__fixtures__/fixtures';



const useGetNextPrompt = () => {

  const [prompt, setPrompt] = useState<Scene>({
    _id: 999,
    type: 'tas',
    storyId: 0,
    hpChange: 0,
    goldChange: 0,
    text: "Take a step...",
    nextScene: [],
});

  const { hp, addHp, addGold, reset: resetPlaythrough } = usePlaythroughStore();
  const { addSteps, steps, reset: resetAdventure } = useAdventureStore();
  const { addtotalSteps, addtotalPlaythrough } = useUserStore();


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

  const PlayerDeathCheck = () => {
    if( hp <= 0) {
      // mostrar prompt de game over com botao de restart
      addtotalPlaythrough(1);
      addtotalSteps(steps);
      resetAdventure();
      resetPlaythrough();
    }
  }

  const getNextPrompt = () => {
    // Para já não existe necessidade de filtrar. Fica isto aqui como exemplo.
    // const filter = advancedPrompts1.filter((a) => a.hpChange === 5);
    // console.log(filter);
    // console.log(filter[randomIntFromInterval(0, filter.length)]);
    const rndmInterval = randomIntFromInterval(0, advancedPrompts1.length);
    const newPrompt = advancedPrompts1[rndmInterval];
    setPrompt(newPrompt);
    addSteps(1);
    addHp(newPrompt.hpChange);
    addGold(newPrompt.goldChange);

    PlayerDeathCheck();
    
  };
  
  const getPromptById = (id: number) => {
    console.log('prompt by id ', id);
    
    const newPrompt = advancedPrompts1.find((scene) => scene._id === id);
    console.log('prompt ', newPrompt);

    if(!isUndefined(newPrompt))
    {
      setPrompt(newPrompt);
      addSteps(1);
      addHp(newPrompt.hpChange);
      addGold(newPrompt.goldChange);
    }
    else getInitialPrompt();
  }

  return {
    getNextPrompt,
    getPromptById,
    prompt
  }
}

export default useGetNextPrompt;