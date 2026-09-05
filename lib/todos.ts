import { Todo } from "@/types/todo";

export const todos: Todo[] = [
  {
    id: 1,
    title: "Belajar React Server Components (RSC)",
    description:
      "Mempelajari konsep dasar Server Components pada Next.js dan perbedaannya dengan Client Components.",
    completed: true,
    createdAt: "2026-08-20",
  },
  {
    id: 2,
    title: "Memahami Next.js App Router",
    description:
      "Memahami sistem routing berbasis folder menggunakan App Router pada Next.js.",
    completed: true,
    createdAt: "2026-08-21",
  },
  {
    id: 3,
    title: "Membuat Aplikasi Todo List",
    description:
      "Membangun aplikasi Todo List menggunakan Next.js dengan struktur komponen yang modular.",
    completed: false,
    createdAt: "2026-08-22",
  },
  {
    id: 4,
    title: "Eksplorasi Client Components",
    description:
      "Mempelajari penggunaan Client Components untuk menangani interaksi pada browser.",
    completed: false,
    createdAt: "2026-08-23",
  },
];

export function getTodos() {
  return todos;
}

export function getTodoById(id: number) {
  return todos.find((todo) => todo.id === id);
}