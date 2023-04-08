import Main from './components/Main/Main';
import { SnackbarProvider } from 'notistack';

// TODO: Retirar o stacked e usar outro 'agrupador'
// TODO: TextArea tem de ter tamanho "fixo" e centrado. Não deve estar a puxar o btn pra baixo. 

function App() {
  return( 
    <SnackbarProvider maxSnack={3}>
      <div className="App">
        <Main />
      </div>
    </SnackbarProvider>
  )
}

export default App;
