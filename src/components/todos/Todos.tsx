import { useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useTodos } from "../../stores/useTodos";
import Tabs from "../tabs/Tabs";
import AddTodoForm from "./add-todo-form/AddTodoForm";
import TodosList from "./todos-list/TodoList";
import TodosLoader from "./todos-loader/TodosLoader";
import { cn } from "../../lib/utils";

const Todos = () => {
  const { data } = useFetch();
  const { setTodos, incompleteTodos, completedTodos, archivedTodos } =
    useTodos();

  useEffect(() => {
    if (data && data.data) {
      setTodos({ todos: data.data });
    }
  }, [data, setTodos]);

  const tabs = [
    {
      label: "Incomplete",
      content: (
        <div>
          {!incompleteTodos ? (
            <TodosLoader />
          ) : incompleteTodos.length === 0 ? (
            <div className="flex items-center justify-center border py-8 border-1 border-gray-700">
              No Upcoming Todos
            </div>
          ) : (
            <TodosList todos={incompleteTodos} />
          )}
        </div>
      ),
    },
    {
      label: "Completed",
      content: (
        <div>
          {!completedTodos ? (
            <TodosLoader />
          ) : completedTodos.length === 0 ? (
            <div className="flex items-center justify-center border py-8 border-1 border-gray-700">
              No Todos completed yet
            </div>
          ) : (
            <TodosList todos={completedTodos} />
          )}
        </div>
      ),
    },
    {
      label: "Deleted",
      content: (
        <div>
          {!archivedTodos ? (
            <TodosLoader />
          ) : archivedTodos.length === 0 ? (
            <div className="flex items-center justify-center border py-8 border-1 border-gray-700">
              No Todos archived yet
            </div>
          ) : (
            <TodosList todos={archivedTodos} />
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="text-lg text-orange-100" aria-roledescription="todos">
      <div className="max-w-[500px] mx-auto">
        <div className="flex items-center justify-between my-8 border border-orange-100 rounded-lg py-8 px-4">
          <div>
            <h2 className="text-2xl leading-10 font-mono">Todos Done</h2>
            <p className="font-light text-sm font-mono">Keep it up!</p>
          </div>
          {completedTodos && incompleteTodos && (
            <div
              className={cn(
                completedTodos.length ===
                  completedTodos.length + incompleteTodos.length
                  ? "bg-green-600"
                  : "bg-orange-600",
                "h-[100px] w-[100px] rounded-full flex items-center justify-center text-3xl font-bold"
              )}
            >
              {completedTodos.length}/
              {completedTodos.length + incompleteTodos.length}
            </div>
          )}
        </div>
        <AddTodoForm />
      </div>
      <div className="py-8">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
};

export default Todos;
