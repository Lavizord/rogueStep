import { Route, Routes } from "react-router-dom";
import Main from "./components/Main/Main";
import { SnackbarProvider } from "notistack";
import Inventory from "./components/Inventory/Inventory";

// TODO: Retirar o stacked e usar outro 'agrupador'

function App() {
  return (
    <SnackbarProvider
      dense
      classes={{ containerRoot: "snackbar-container-root-custom" }}
      maxSnack={3}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </SnackbarProvider>
  );
}

export default App;
