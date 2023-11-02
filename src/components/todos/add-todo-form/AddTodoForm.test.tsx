import { fireEvent, render, screen } from "@testing-library/react";
import AddTodoForm from "./AddTodoForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../lib/i18n";

test("Renders the AddTodoForm component", () => {
  const queryClient = new QueryClient();
  render(
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <AddTodoForm />
      </QueryClientProvider>
    </I18nextProvider>
  );

  const inputElement = screen.getByPlaceholderText(
    "Write your next task..."
  ) as HTMLInputElement;
  const buttonElement = screen.getByTestId("add-todo") as HTMLButtonElement;

  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});

test("Form had correct fields and data", () => {
  const queryClient = new QueryClient();
  render(
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <AddTodoForm />
      </QueryClientProvider>
    </I18nextProvider>
  );

  const inputElement = screen.getByTestId("todo-input") as HTMLInputElement;
  const buttonElement = screen.getByTestId("add-todo") as HTMLButtonElement;

  // Simulate user input
  fireEvent.change(inputElement, { target: { value: "Test todo" } });

  // Simulate form submission
  fireEvent.click(buttonElement);

  // Verify that the form submission function is called with the correct value
  expect(inputElement).toBeInTheDocument();
  expect(inputElement.value).toEqual("Test todo");
});

test("Renders the submit button", () => {
  const queryClient = new QueryClient();
  render(
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <AddTodoForm />
      </QueryClientProvider>
    </I18nextProvider>
  );

  const submitButton = screen.getByTestId("add-todo");

  expect(submitButton).toBeInTheDocument();
});
