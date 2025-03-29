import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes/index";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router} from "react-router-dom";
const queryClient = new QueryClient();

function App() {


  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router>
        <AppRoutes />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
