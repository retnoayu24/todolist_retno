"use client";

import { useState } from "react";
import { Todo } from "@/types/todo";

type TodoItemProps = {
  todo: Todo;
};

export default function TodoItem({ todo }: TodoItemProps) {
  const [completed, setCompleted] = useState(todo.completed);

  return (
    <div
      className={`flex items-center gap-3 rounded-md border px-3 py-3 ${
        completed
          ? "border-green-200 bg-green-50"
          : "border-gray-200 bg-white"
      }`}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={() => setCompleted(!completed)}
        className="h-4 w-4 accent-[#2B7FFF]"
      />

      <span
        className={`flex-1 text-sm ${
          completed
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
    </div>
  );
}