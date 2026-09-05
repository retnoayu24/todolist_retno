import TodoForm from "@/app/components/TodoForm";
import TodoItem from "@/app/components/TodoItem";
import TodoList from "@/app/components/TodoList";
import { getTodos } from "@/lib/todos";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default async function Home() {
  await delay(3000);

  const todos = getTodos();

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-12">
      <div className="mx-auto w-full max-w-md rounded-lg bg-white p-5 shadow-md">

        <h1 className="text-center text-xl font-bold text-gray-800">
          Daftar Tugas (Todo List)
        </h1>

        <div className="my-4 border-t border-gray-200" />

        <TodoForm />

        <h2 className="mb-3 mt-5 text-sm font-semibold text-gray-700">
          Tugas Anda
        </h2>

        <TodoList todos={todos} />

      </div>
    </main>
  );
}