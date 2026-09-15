"use client";

import { Todo } from "@/types/todo";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
}: TodoItemProps) {
  return (
    <div
      className={`flex items-center gap-3 rounded-md border px-3 py-3 ${
        todo.completed
          ? "border-green-200 bg-green-50"
          : "border-gray-200 bg-white"
      }`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-4 w-4 accent-[#2B7FFF]"
      />

      <span
        className={`flex-1 text-sm ${
          todo.completed
            ? "text-gray-400 line-through"
            : "text-gray-700"
        }`}
      >
        {todo.title}
      </span>

      <a
        href={`/task/${todo.id}`}
        className="text-xs font-medium text-[#2B7FFF] hover:underline"
      >
        Detail
      </a>

      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        title="Hapus tugas"
        className="text-xs font-medium text-red-500 hover:underline"
      >
        Hapus
      </button>
    </div>
  );
}