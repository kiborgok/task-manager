const TodosLoader = () => {
    return (
      <div className="space-y-4">
        {new Array(5).fill(0).map((_, indx) => (
          <div
            key={indx}
            className="flex gap-x-2 items-center border border-gray-700 rounded-lg px-4 py-6"
          >
            <div className="h-4 w-4 rounded-full bg-gray-700 animate-pulse" />
            <div className="h-4 w-3/4 rounded-full bg-gray-700 animate-pulse" />
          </div>
        ))}
      </div>
    );
  };
  
  export default TodosLoader;
  