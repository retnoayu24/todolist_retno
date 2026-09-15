"use client";

import React, { useState } from "react";
import { TaskItem } from "@/types/api-todo";
import { todoService } from "@/services/todoService";

interface ApiTodoListProps {
  initialTasks: TaskItem[];
}

export default function ApiTodoList({
  initialTasks,
}: ApiTodoListProps) {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);

  const handleToggleTask = async (
    id: number,
    currentCompleted: boolean
  ) => {
    const targetStatus = !currentCompleted;

    // Optimistic Update
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: targetStatus,
            }
          : task
      )
    );

    try {
      await todoService.updateTodo(id, {
        completed: targetStatus,
      });
    } catch (error) {
      console.error(
        "Gagal update status:",
        error
      );

      // Rollback jika request gagal
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? {
                ...task,
                completed: currentCompleted,
              }
            : task
        )
      );
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Daftar Tugas (Todo List)
        </h1>

        <div className="my-4 border-t border-gray-300" />

        {/* List Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-700">
            Daftar Tugas
          </h2>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            {tasks.length} item
          </span>
        </div>

        {/* Empty State */}
        {tasks.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
            <p className="text-gray-500">
              Tidak ada tugas tersedia.
            </p>
          </div>
        ) : (
          /* Todo List */
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`rounded-lg border p-4 transition-all ${
                  task.completed
                    ? "border-green-200 bg-green-50"
                    : "border-gray-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() =>
                      handleToggleTask(
                        task.id,
                        task.completed
                      )
                    }
                    className="h-5 w-5 cursor-pointer"
                  />

                  {/* Todo Title */}
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-sm font-medium ${
                        task.completed
                          ? "text-gray-400 line-through"
                          : "text-gray-700"
                      }`}
                    >
                      {task.title}
                    </p>
                  </div>

                  {/* ID */}
                  <span className="hidden rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-600 sm:inline-block">
                    ID: #{task.id}
                  </span>

                  {/* User */}
                  <span className="hidden rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600 sm:inline-block">
                    User: {task.userId}
                  </span>

                  {/* Status */}
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      task.completed
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {task.completed
                      ? "Selesai"
                      : "Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}