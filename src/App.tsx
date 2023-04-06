import BasicStack from './components/BasicStack';
import { SnackbarProvider } from 'notistack';

// TODO: Retirar o stacked e usar outro 'agrupador'
// TODO: TextArea tem de ter tamanho "fixo" e centrado. Não deve estar a puxar o btn pra baixo. 

function App() {
  return( 
    <SnackbarProvider maxSnack={3}>
      <div className="App">
        <BasicStack />
      </div>
    </SnackbarProvider>
  )
}

export default App;
