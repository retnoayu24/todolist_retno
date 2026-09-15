"use client";

import TodoForm from "@/app/components/TodoForm";
import TodoList from "@/app/components/TodoList";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Todo } from "@/types/todo";

type TodoCachedAppProps = {
  initialTodos: Todo[];
};

export default function TodoCachedApp({
  initialTodos,
}: TodoCachedAppProps) {
  const [todos, setTodos] = useLocalStorage<Todo[]>(
    "TODO_LIST_CACHE",
    initialTodos
  );

  function handleAddTodo(title: string) {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTodos((currentTodos) => [
      ...currentTodos,
      newTodo,
    ]);
  }

  function handleToggleTodo(id: number) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      )
    );
  }

  function handleDeleteTodo(id: number) {
    setTodos((currentTodos) =>
      currentTodos.filter(
        (todo) => todo.id !== id
      )
    );
  }

  function handleResetToDefault() {
    if (
      confirm(
        "Kembalikan data cache ke daftar tugas awal?"
      )
    ) {
      setTodos(initialTodos);
    }
  }

  return (
    <div className="space-y-6">
      <TodoForm onAddTodo={handleAddTodo} />

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>
          Cache aktif (localStorage: TODO_LIST_CACHE)
        </span>

        <button
          type="button"
          onClick={handleResetToDefault}
          className="hover:text-red-500 hover:underline"
        >
          Reset ke Data Awal
        </button>
      </div>

      <TodoList
        todos={todos}
        onToggleTodo={handleToggleTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </div>
  );
}