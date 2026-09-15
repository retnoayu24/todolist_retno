import Link from "next/link";
import { Todo } from "@/types/todo";

type TaskDetailCardProps = {
  todo: Todo;
};

export default function TaskDetailCard({
  todo,
}: TaskDetailCardProps) {
  return (
    <div className="w-full max-w-2xl rounded-lg bg-white p-5 shadow-md">
      
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-800">
          Detail Tugas
        </h1>

        <Link
          href="/"
          className="rounded bg-gray-200 px-3 py-1.5 text-[10px] text-gray-600 hover:bg-gray-300"
        >
          Kembali ke Daftar
        </Link>
      </div>

      <div className="my-4 border-t border-gray-200" />

      <div className="space-y-4">
        
        <div>
          <p className="text-[9px] font-medium uppercase text-gray-400">
            ID Tugas
          </p>

          <p className="mt-1 text-xs text-gray-700">
            #{todo.id}
          </p>
        </div>

        <div>
          <p className="text-[9px] font-medium uppercase text-gray-400">
            Judul Tugas
          </p>

          <h2 className="mt-1 text-sm font-bold text-gray-800">
            {todo.title}
          </h2>
        </div>

        <div>
          <p className="text-[9px] font-medium uppercase text-gray-400">
            Deskripsi
          </p>

          <div className="mt-2 rounded-md border border-gray-200 bg-gray-50 p-3">
            <p className="text-[10px] leading-relaxed text-gray-600">
              {todo.description}
            </p>
          </div>
        </div>

        <div>
          <p className="text-[9px] font-medium uppercase text-gray-400">
            Status
          </p>

          <span
            className={`mt-1 inline-block rounded-full px-2.5 py-1 text-[9px] font-medium ${
              todo.completed
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {todo.completed ? "✓ Selesai" : "Belum selesai"}
          </span>
        </div>

        <div>
          <p className="text-[9px] font-medium uppercase text-gray-400">
            Tanggal Dibuat
          </p>

          <p className="mt-1 text-[10px] text-gray-600">
            {todo.createdAt}
          </p>
        </div>

      </div>
    </div>
  );
}