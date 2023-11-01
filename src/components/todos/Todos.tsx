import AddTodoForm from "./add-todo-form/AddTodoForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Todos = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="text-lg text-orange-100" aria-roledescription="todos">
        <div className="max-w-[500px] mx-auto">
          <AddTodoForm />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Todos;
