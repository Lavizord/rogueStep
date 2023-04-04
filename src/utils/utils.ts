const TakeAStepTextGenerator = (): string => {
  return 'new Text';
}
const TakeAStepTextGenerator2 = (): string => {
  return 'new Text2';
}

// Gera n de 0 a max, inclusive. (Hope)
function randomIntFromInterval(min:number, max:number):number { // min and max included 
  return Math.floor(Math.random() * (max - min) + min)
}

export {TakeAStepTextGenerator, TakeAStepTextGenerator2, randomIntFromInterval};