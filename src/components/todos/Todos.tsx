import AddTodoForm from "./add-todo-form/AddTodoForm";

const Todos = () => {
  return (
      <div className="text-lg text-orange-100" aria-roledescription="todos">
        <div className="max-w-[500px] mx-auto">
          <AddTodoForm />
        </div>
      </div>
  );
};

export default Todos;
