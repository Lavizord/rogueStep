import { Route, Routes } from "react-router-dom";
import Main from "./components/Main/Main";
import { SnackbarProvider } from "notistack";
import Inventory from "./components/Inventory/Inventory";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
