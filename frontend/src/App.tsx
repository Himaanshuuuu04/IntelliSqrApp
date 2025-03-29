import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes/index";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Toaster />
          <AppRoutes />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
