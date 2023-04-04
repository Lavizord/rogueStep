import * as React from 'react';
import { useState } from 'react';
import BasicStack from './components/BasicStack';
import TextArea from './components/TextArea';
import DivBox from './components/DivBox';

// TODO: Retirar o stacked e usar outro 'agrupador'
// TODO: TextArea tem de ter tamanho "fixo" e centrado. Não deve estar a puxar o btn pra baixo. 
// TODO: Ver por que raio os botões estao com tamanhos differentes.

function App() {
  return( 
    <>
      <div className="App">
        <BasicStack />
      </div>
    </>
  )
}

export default App;
