import { getTodoById } from "@/lib/todos";
import TaskDetailCard from "./components/taskdetailcard";
import TaskNotFound from "./tasknotfound";

type TaskPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TaskPage({
  params,
}: TaskPageProps) {
  const { id } = await params;

  const todo = getTodoById(Number(id));

  if (!todo) {
    return <TaskNotFound />;
  }

  return (
    <main className="flex min-h-screen items-start justify-center bg-gray-100 px-4 py-12">
      <TaskDetailCard todo={todo} />
    </main>
  );
}