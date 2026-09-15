"use client";

import { useState } from "react";
import { Todo } from "@/types/todo";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

type TodoStateOnlyAppProps = {
  initialTodos: Todo[];
};

export default function TodoStateOnlyApp({
  initialTodos,
}: TodoStateOnlyAppProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  function handleAddTodo(title: string) {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);
  }

  function handleToggleTodo(id: number) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  function handleDeleteTodo(id: number) {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== id)
    );
  }

  return (
    <div className="space-y-6">
      <TodoForm onAddTodo={handleAddTodo} />

      <TodoList
        todos={todos}
        onToggleTodo={handleToggleTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </div>
  );
}