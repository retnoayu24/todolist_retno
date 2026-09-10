"use client";

import { FormEvent, useState } from "react";

type TodoFormProps = {
  onAddTodo: (title: string) => void;
};

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    onAddTodo(trimmedTitle);
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Masukkan tugas..."
        className="flex-1 rounded-lg border px-4 py-2"
      />

      <button
        type="submit"
        disabled={!title.trim()}
        className="rounded-lg bg-black px-5 py-2 text-white disabled:opacity-50"
      >
        Tambah
      </button>
    </form>
  );
}