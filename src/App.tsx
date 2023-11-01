import Navbar from "./components/navbar/Navbar";
import Todos from "./components/todos/Todos";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="bg-gray-800 min-h-screen py-4">
          <div className="max-w-3xl mx-auto">
            <Navbar />
            <Todos />
          </div>
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
