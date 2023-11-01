import { useState, useEffect } from "react";
import { useTodos } from "../../../stores/useTodos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_API_URL } from "../../../lib/constants";
import { Check, Loader, Plus } from "lucide-react";
import { cn } from "../../../lib/utils";

const AddTodoForm = () => {
  const { todoForEdit, setTodoForEdit } = useTodos();
  const [todoInput, setTodoInput] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (todoForEdit) {
      setTodoInput(todoForEdit.name);
    }
  }, [todoForEdit]);

  const { mutate, isPending } = useMutation({
    mutationFn: (newTodo: { name: string; userId: string }) => {
      if (todoForEdit) {
        return axios.put(`${BASE_API_URL}/todos/${todoForEdit.id}`, {
          ...newTodo,
        });
      } else {
        return axios.post(`${BASE_API_URL}/todos`, {
          ...newTodo,
          status: "incomplete",
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todosData", `${BASE_API_URL}/todos`],
      });
      setTodoInput("");
      setTodoForEdit({ todo: null });
    },
  });

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ name: todoInput, userId: "1234" });
  };
  return (
    <form
      action=""
      className="w-full flex justify-between gap-x-4 items-center"
      onSubmit={handleAddTodo}
    >
      <input
        type="text"
        name="todo"
        id="todo"
        value={todoInput}
        disabled={isPending}
        onChange={(e) => setTodoInput(e.target.value)}
        placeholder="Write your next task..."
        className="flex-1 rounded-lg bg-gray-700 focus:stroke-gray-400 focus-visible:stroke-gray-400 focus:outline-gray-400 focus-visible:outline-1 font-mono font-light px-4 py-2"
      />

      <button
        type="submit"
        data-testid="add-todo"
        className={cn(
          todoForEdit
            ? "bg-green-600 hover:bg-green-600/90 disabled:bg-green-600/40"
            : "bg-orange-600 hover:bg-orange-600/90 disabled:bg-orange-600/30",
          "transition-colors ease flex items-center justify-center rounded-full p-2 disabled:cursor-not-allowed"
        )}
        disabled={todoInput.trim() === "" || isPending}
      >
        {isPending ? (
          <Loader strokeWidth={2} id="plus-icon" className="animate-spin" />
        ) : todoForEdit ? (
          <Check strokeWidth={2} />
        ) : (
          <Plus strokeWidth={2} id="plus-icon" />
        )}
      </button>
    </form>
  );
};

export default AddTodoForm;
