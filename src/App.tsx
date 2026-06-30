import { useEffect, useMemo, useState } from "react";
import ToggleTheme from "./components/ToggleTheme";
import { Sparkles, Plus, Check, Trash2, Circle } from "lucide-react";

interface Todos {
  id: number;
  text: string;
  completed: boolean;
}

const App = () => {
  const [input, setInput] = useState<string>("");
  // localstore
  const [todos, setTodos] = useState<Todos[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const addTodo = () => {
    if (input.trim()) {
      setTodos((prev) => [
        ...prev,
        { id: Date.now(), text: input.trim(), completed: false },
      ]);
    }
    setInput("");
  };
  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };
  const toggleTodo = (id: number): void => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };
  const activeCount = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos],
  );

  const clearCompleted = (): void => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };
  const filtedTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    });
  }, [todos, filter]);

  return (
    <section
      className=" min-h-screen bg-gray-50 text-gray-900
     dark:text-gray-50 dark:bg-gray-900 transition-color flex flex-col"
    >
      {/* header */}
      <header
        className=" bg-white border-b border-gray-200
       dark:bg-gray-800 dark:border-gray-700 transition-colors"
      >
        <div className="container flex items-center justify-between">
          <div className="flex items-start gap-2.5">
            {/* icon */}
            <span
              className="size-10 md:size-14 bg-purple-500 flex items-center 
            justify-center text-white rounded-xl transition-colors shrink-0
             dark:bg-purple-600"
            >
              <Sparkles />
            </span>
            <div>
              <h1 className="text-3xl font-semibold sm:text-5xl text-purple-500 dark:text-purple-400 ">
                {" "}
                My Task
              </h1>
              <p className="text-sm sm:text-base mt-1 text-gray-600 dark:text-gray-400 transition-colors">
                {" "}
                Stay organized, stay Productive
              </p>
            </div>
          </div>
          <ToggleTheme />
        </div>
      </header>

      {/* main */}
      <main className="container">
        <div className="max-w-3xl w-full mx-auto space-y-6">
          {/* input section */}
          <div
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
          hover:border-purple-400! rounded-xl flex items-center gap-2 p-2 justify-between transition-colors"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
              placeholder="What's on your mind?"
              className="text-gray-900 dark:text-white 
            flex-1 px-5 py-4 "
            />
            <button
              className="bg-purple-500 text-white dark:bg-purple-600 p-4 rounded-xl hover:bg-purple-600
            transition-colors dark:hover:bg-purple-500 disabled:opacity-50"
              onClick={addTodo}
              disabled={!input.trim()}
            >
              <Plus />
            </button>
          </div>
          {/* filter */}

          <div
            className="flex gap-2 bg-white dark:bg-gray-800 border border-gray-200
        dark:border-gray-700 rounded-xl transition-colors p-1 sm:p-2"
          >
            {(["all", "active", "completed"] as const).map((btn) => (
              <button
                key={btn}
                onClick={() => setFilter(btn)}
                className={`flex-1 px-4 py-3 rounded-xl font-semibold text-sm sm:text-base capitalize text-gray-600 bg-gray-100 dark:bg-gray-700 transition-colors dark:text-gray-400 
              ${
                filter === btn
                  ? "bg-purple-500 dark:bg-purple-600 text-white"
                  : "text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400"
              }`}
              >
                {btn}
              </button>
            ))}
          </div>
          {/* todo list */}

          <div
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 
        dark:border-gray-700 transition-colors divide-y divide-gray-200/30"
          >
            <div>
              {filtedTodos.length === 0 ? (
                <div className=" p-12 sm:p-16 text-center">
                  {/* icon */}

                  <span
                    className="size-24 bg-purple-100 flex items-center justify-center text-purple-400
                dark:bg-purple-900 rounded-full mb-6 mx-auto dark:text-purple-600 transition-colors"
                  >
                    <Circle size={54} />
                  </span>

                  <p className="text-lg text-gray-500 dark:text-gray-400 transition-colors">
                    {filter === "completed"
                      ? "No completed Task yet"
                      : filter === "active"
                        ? "All Caugh Up!"
                        : "Start adding your task"}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200/60 dark:divide-gray-200/20 max-h-96 overflow-y-auto">
                  {filtedTodos.map((todo) => (
                    // list
                    <div
                      className=" flex items-center justify-between p-4 group"
                      key={todo.id}
                    >
                      <div className="flex items-center gap-3.5">
                        <button
                          className={`size-6 border rounded-full flex items-center justify-center ${
                            todo.completed
                              ? "bg-purple-500 dark:bg-purple-600 border-purple-500 dark:border-purple-600"
                              : "border-gray-300 hover:border-purple-600 dark:border-gray-600 dark:hover:border-purple-400"
                          }`}
                          onClick={() => toggleTodo(todo.id)}
                        >
                          {todo.completed && (
                            <Check size={16} className="text-white" />
                          )}
                        </button>
                        <p
                          className={`transition ${todo.completed ? "line-through text-gray-400 dark:text-gray-500" : "text-gray-800 dark:text-gray-100"}`}
                        >
                          {todo.text}
                        </p>
                      </div>
                      <button
                        className="size-8 flex items-center justify-center bg-red-100 hover:bg-red-200
           text-red-600 rounded-xl dark:bg-red-900 dark:text-red-400 dark:hover:bg-red-800
           opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        <Trash2 />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {filtedTodos.length > 0 && (
              <div className=" flex items-center justify-between py-4 px-5">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-200 transition-colors">
                  ({activeCount}) {activeCount === 1 ? "item" : "items"} left
                </p>
                {todos.some((todo) => todo.completed) && (
                  <button
                    className="text-red-600 hover:text-red-700 focus:text-red-700
                dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900
                dark:focus:bg-red-900 transition-colors px-4 rounded-xl py-2"
                    onClick={clearCompleted}
                  >
                    clear completed
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      {/* footer */}

      <footer className="mt-auto">
        <p className=" container text-center text-sm text-gray-600 dark:text-gray-500 ">
          &copy; {new Date().getFullYear()} Made with Dmytro coding. Press{" "}
          <kbd className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-800 transition-colors">
            Enter
          </kbd>{" "}
          to add task quickly
        </p>
      </footer>
    </section>
  );
};

export default App;
