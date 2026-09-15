import TodoStateOnlyApp from "@/app/components/TodoStateOnlyApp";
import { getTodos } from "@/lib/todos";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default async function Home() {
  await delay(3000);

  const todos = await getTodos();

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-12">
      <div className="mx-auto w-full max-w-md rounded-lg bg-white p-5 shadow-md">

        <h1 className="text-center text-xl font-bold text-gray-800">
          Daftar Tugas (Todo List)
        </h1>

        <div className="my-4 border-t border-gray-200" />

        <TodoStateOnlyApp initialTodos={todos} />

      </div>
    </main>
  );
}