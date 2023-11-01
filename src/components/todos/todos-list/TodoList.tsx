import { TodoType } from "../../../types/types";
import TodoCard from "../todo-card/TodoCard";

const TodosList = ({ todos }: { todos: TodoType[] }) => {
  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodosList;