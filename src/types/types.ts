export type TodoStatus = "incomplete" | "complete" | "archived";

export interface TodoType {
  createdAt: Date;
  userId: string;
  name: string;
  status: TodoStatus;
  id: string;
}