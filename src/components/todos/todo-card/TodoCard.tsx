import { Pencil, Trash, Undo2 } from "lucide-react";
import React from "react";
import { cn } from "../../../lib/utils";
import { TodoStatus, TodoType } from "../../../types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_API_URL } from "../../../lib/constants";
import { useTodos } from "../../../stores/useTodos";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

interface TodoCardProps {
  todo: TodoType;
}

const TodoCard = ({ todo }: TodoCardProps) => {
  const [isChecked, setIsChecked] = React.useState(todo.status === "complete");
  const queryClient = useQueryClient();
  const { setTodoForEdit } = useTodos();
  const { t } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      todoId,
      status,
    }: {
      todoId: string;
      status: TodoStatus;
    }) => {
      return axios.put<TodoType>(
        `${BASE_API_URL}/todos/${todoId}`,
        {
          status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            //'Content-Type': 'multipart/form-data'
            "Access-Control-Allow-Headers":
              "X-Requested-With,Content-Type,Cache-Control,access_token, x-xsrf-token",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: ["todosData", `${BASE_API_URL}/todos`],
      });

      if (data.status === "complete") {
        toast.success(t("complete-success"));
      }

      if (data.status === "incomplete") {
        toast(t("restore-success"));
      }

      if (data.status === "archived") {
        toast(t("archive-success", { icon: "🗑️" }));
      }
    },
  });

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    mutate({
      todoId: todo.id,
      status: todo.status === "incomplete" ? "complete" : "incomplete",
    });
  };

  const toggleArchiveTodo = () => {
    mutate({
      todoId: todo.id,
      status: todo.status === "archived" ? "incomplete" : "archived",
    });
  };

  return (
    <div
      className={cn(
        isPending && "opacity-60 pointer-events-none",
        todo.status === "archived" && "bg-red-500/20",
        "flex gap-x-2 items-center border border-gray-700 rounded-lg px-4 py-6"
      )}
    >
      <label className="inline-flex items-center space-x-2">
        {todo.status !== "archived" && (
          <input
            type="checkbox"
            className={cn(
              todo.status === "complete" && "bg-green-500",
              "form-tick appearance-none h-6 w-6 border border-gray-300 rounded-full checked:bg-green-500 checked:border-transparent focus:outline-none"
            )}
            checked={isChecked}
            onChange={toggleCheckbox}
          />
        )}
        {isChecked || todo.status === "complete" ? (
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        ) : null}
      </label>
      <p
        className={cn(
          (isChecked || todo.status === "complete") && "line-through italic",
          "flex-grow"
        )}
      >
        {todo.name}
      </p>
      <div className="flex items-center gap-x-4">
        {todo.status === "incomplete" && (
          <button
            disabled={isPending}
            className="bg-slate-500/20 p-2 rounded-md hover:bg-slate-500/50 transition"
            onClick={() => setTodoForEdit({ todo })}
          >
            <Pencil />
          </button>
        )}
        <button
          disabled={isPending}
          className={cn(
            todo.status === "archived"
              ? "hover:bg-green-500/80 bg-green-500/50"
              : "hover:bg-red-500/50 bg-red-500/20",
            "p-2 rounded-md transition disabled:cursor-not-allowed"
          )}
          onClick={toggleArchiveTodo}
        >
          {todo.status === "archived" ? (
            <Undo2 />
          ) : (
            <Trash className="stroke-red-500" />
          )}
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
