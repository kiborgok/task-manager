import { render } from "@testing-library/react";
import TodoCard from "./TodoCard";
import { TodoType } from "../../../types/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../lib/i18n";

test("renders todo card component", () => {
  const queryClient = new QueryClient();
  const todo: TodoType = {
    createdAt: new Date(),
    id: "123",
    name: "Test",
    status: "incomplete",
    userId: "23456",
  };
  render(
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <TodoCard todo={todo} />
      </QueryClientProvider>
    </I18nextProvider>
  );
});
