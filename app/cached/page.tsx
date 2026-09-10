import TodoCachedApp from "./components/TodoCachedApp";
import { getTodos } from "@/lib/todos";

export default async function CachedTodoPage() {
  const initialTodos = await getTodos();

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-12">
      <div className="mx-auto w-full max-w-md rounded-lg bg-white p-5 shadow-md">
        <h1 className="text-center text-xl font-bold text-gray-800">
          Daftar Tugas (Todo List)
        </h1>

        <div className="my-4 border-t border-gray-200" />

        <TodoCachedApp
          initialTodos={initialTodos}
        />
      </div>
    </main>
  );
}