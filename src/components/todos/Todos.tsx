import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFetch } from "../../hooks/useFetch";
import { useAuthUser } from "../../stores/useAuthUser";
import { useTodos } from "../../stores/useTodos";
import Tabs from "../tabs/Tabs";
import AddTodoForm from "./add-todo-form/AddTodoForm";
import TodosList from "./todos-list/TodoList";
import TodosLoader from "./todos-loader/TodosLoader";
import { cn } from "../../lib/utils";

const Todos = () => {
  const { data, isLoading } = useFetch();
  const { user } = useAuthUser();
  const { setTodos, incompleteTodos, completedTodos, archivedTodos } =
    useTodos();
  const { t } = useTranslation();

  useEffect(() => {
    if (data && data.data && user) {
      const userTodos = data.data.filter((item) => item.userId === user.id);
      setTodos({ todos: userTodos });
    }
  }, [data, setTodos, user]);

  const tabs = [
    {
      label: t("incomplete"),
      content: (
        <div>
          {!incompleteTodos || isLoading ? (
            <TodosLoader />
          ) : incompleteTodos.length === 0 ? (
            <div className="flex items-center justify-center border py-8 border-1 border-gray-700">
              {t("no-upcoming")}
            </div>
          ) : (
            <TodosList todos={incompleteTodos} />
          )}
        </div>
      ),
    },
    {
      label: t("completed"),
      content: (
        <div>
          {!completedTodos || isLoading ? (
            <TodosLoader />
          ) : completedTodos.length === 0 ? (
            <div className="flex items-center justify-center border py-8 border-1 border-gray-700">
              {t("no-completed")}
            </div>
          ) : (
            <TodosList todos={completedTodos} />
          )}
        </div>
      ),
    },
    {
      label: t("deleted"),
      content: (
        <div>
          {!archivedTodos || isLoading ? (
            <TodosLoader />
          ) : archivedTodos.length === 0 ? (
            <div className="flex items-center justify-center border py-8 border-1 border-gray-700">
              {t("no-archived")}
            </div>
          ) : (
            <TodosList todos={archivedTodos} />
          )}
        </div>
      ),
    },
  ];

  return (
    <div
      className="text-lg text-orange-100 max-sm:px-2"
      aria-roledescription="todos"
    >
      <div className="lg:max-w-[550px] mx-auto">
        <div className="flex items-center justify-between my-8 border border-orange-100 rounded-lg py-8 px-4">
          <div className="max-sm:flex-1">
            <h2 className="text-lg lg:text-2xl leading-10 font-mono font-semibold">
              {t("header")}
            </h2>
            <p className="font-light text-sm font-mono">{t("subHeader")}</p>
          </div>
          {completedTodos && incompleteTodos && (
            <div
              className={cn(
                completedTodos.length ===
                  completedTodos.length + incompleteTodos.length
                  ? "bg-green-600"
                  : "bg-orange-600",
                "h-[100px] max-sm:max-w-[100px] w-[100px] rounded-full flex items-center justify-center text-xl md:text-3xl font-bold max-sm:flex-1"
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
