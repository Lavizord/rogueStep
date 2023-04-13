import Main from "./components/Main/Main";
import { SnackbarProvider } from "notistack";

// TODO: Retirar o stacked e usar outro 'agrupador'

function App() {
  return (
    <SnackbarProvider
      dense
      classes={{ containerRoot: "snackbar-container-root-custom" }}
      maxSnack={3}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <div className="App">
        <Main />
      </div>
    </SnackbarProvider>
  );
}

export default App;
