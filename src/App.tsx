import Main from './components/Main/Main';
import { SnackbarProvider } from 'notistack';

// TODO: Retirar o stacked e usar outro 'agrupador'

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
