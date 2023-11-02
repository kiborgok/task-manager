export type TodoStatus = "incomplete" | "complete" | "archived";

export interface TodoType {
  createdAt: Date;
  userId: string;
  name: string;
  status: TodoStatus;
  id: string;
}

export interface UserType {
  createdAt: string;
  email: string;
  avatar: string;
  password: string;
  id: string;
}