import { storyPrompts, nextPrompts } from '../__fixtures__/fixtures';
import { randomIntFromInterval } from '../utils/utils';
import { useState } from 'react';

type NextPrompt = {
  hpChange: number;
  goldChange: number;
  text: string;
}

const useGetNextPrompt = () => {
  
  // doBuffEffects = Retorna funcao de efeito de buffed. 
  const nextPrompt = nextPrompts[randomIntFromInterval(0, nextPrompts.length)];
  const [text, setText] = useState<string>(nextPrompt.text);
  const [hpChange, setHpChange] = useState<string>(nextPrompt.hpChange.toString());
  const [goldChange, setGoldChange] = useState<string>(nextPrompt.goldChange.toString());

  const getNextPrompt = () => {
    const filter = nextPrompts.filter((a) => a.hpChange === 5);
    console.log(filter);
    console.log(filter[randomIntFromInterval(0, filter.length)]);
    const rndmInterval = randomIntFromInterval(0, nextPrompts.length);
    const newPrompt = nextPrompts[rndmInterval];
    setText(newPrompt.text);
    setHpChange(newPrompt.hpChange.toString());
    setGoldChange(newPrompt.goldChange.toString());

 };

  return {
    getNextPrompt,
    text,
    hpChange,
    goldChange
  };
}

export default useGetNextPrompt;