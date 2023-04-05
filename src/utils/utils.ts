// Gera n de 0 a max, inclusive. (Hope)
function randomIntFromInterval(min:number, max:number):number { // min and max included 
  return Math.floor(Math.random() * (max - min) + min)
}

export {randomIntFromInterval};