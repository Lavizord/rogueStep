import { addAbortSignal } from 'stream';
import { storyPrompts, nextPrompts, advancedPrompts1 } from '../__fixtures__/fixtures';
import useAdventureStore from '../stores/useAdventureStore';
import usePlaythroughStore from '../stores/usePlaythroughStore';
import useUserStore from '../stores/useUserStore';
import { randomIntFromInterval } from '../utils/utils';
import { useState } from 'react';

type NextPrompt = {
  hpChange: number;
  goldChange: number;
  text: string;
}

const useGetNextPrompt = () => {

  // doBuffEffects = Retorna funcao de efeito de buffed. 
  const initialPrompts = advancedPrompts1.filter((prompt) => (prompt.type === 'initial'));

  const nextPrompt = initialPrompts[randomIntFromInterval(0, initialPrompts.length)];

  const [prompt, setPrompt] = useState(nextPrompt);

  const { hp, addHp, addGold, reset: resetPlaythrough } = usePlaythroughStore();
  const { addSteps, steps, reset: resetAdventure } = useAdventureStore();
  const { addtotalSteps, addtotalPlaythrough } = useUserStore();

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

    if( hp <= 0) {
      // mostrar prompt de game over com botao de restart
      addtotalPlaythrough(1);
      addtotalSteps(steps);
      resetAdventure();
      resetPlaythrough();
    }
 };

  return {
    getNextPrompt,
    prompt
  }
}

export default useGetNextPrompt;