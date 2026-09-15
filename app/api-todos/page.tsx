import ApiTodoList from "./components/ApiTodoList";
import { getTasks } from "@/lib/tasks";

export default async function ApiTodosPage() {
  const initialTasks = await getTasks({
    limit: 15,
    skip: 0,
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <ApiTodoList
        initialTasks={initialTasks.tasks}
      />
    </main>
  );
}