import { create } from "zustand";
import { TodoType } from "../types/types";

interface TodoDataState {
  incompleteTodos: TodoType[];
  completedTodos: TodoType[];
  archivedTodos: TodoType[];
  todoForEdit: TodoType | null;
}

interface TodoDataActions {
  setTodos: ({ todos }: { todos: TodoType[] }) => void;
  setTodoForEdit: ({ todo }: { todo: TodoType | null }) => void;
}

export const useTodos = create<TodoDataState & TodoDataActions>((set) => ({
  incompleteTodos: [],
  completedTodos: [],
  archivedTodos: [],
  todoForEdit: null,
  setTodos: ({ todos }) =>
    set({
      incompleteTodos:
        todos.length > 0
          ? todos.filter((todo) => todo.status === "incomplete")
          : [],
      completedTodos:
        todos.length > 0
          ? todos.filter((todo) => todo.status === "complete")
          : [],
      archivedTodos:
        todos.length > 0
          ? todos.filter((todo) => todo.status === "archived")
          : [],
    }),
  setTodoForEdit: ({ todo }) =>
    set({
      todoForEdit: todo,
    }),
}));