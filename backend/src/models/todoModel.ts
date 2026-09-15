import pool from "../config/db.js";

export interface Todo {
  id: number;
  user_id: number;
  task: string;
  is_completed: boolean;
}

export async function findTodosByUserId(
  userId: number
): Promise<Todo[]> {
  const [rows] = await pool.execute(
    "SELECT * FROM todos WHERE user_id = ? ORDER BY id DESC",
    [userId]
  );

  return rows as Todo[];
}

export async function findTodoById(
  id: number,
  userId: number
): Promise<Todo | null> {
  const [rows] = await pool.execute(
    "SELECT * FROM todos WHERE id = ? AND user_id = ? LIMIT 1",
    [id, userId]
  );

  const todos = rows as Todo[];

  return todos.length > 0 ? todos[0]! : null;
}

export async function createTodo(
  userId: number,
  task: string
): Promise<number> {
  const [result] = await pool.execute(
    "INSERT INTO todos (user_id, task) VALUES (?, ?)",
    [userId, task]
  );

  const insertResult = result as {
    insertId: number;
  };

  return insertResult.insertId;
}

export async function updateTodo(
  id: number,
  userId: number,
  task: string,
  isCompleted: boolean
): Promise<void> {
  await pool.execute(
    `UPDATE todos
     SET task = ?, is_completed = ?
     WHERE id = ? AND user_id = ?`,
    [task, isCompleted, id, userId]
  );
}

export async function deleteTodo(
  id: number,
  userId: number
): Promise<void> {
  await pool.execute(
    "DELETE FROM todos WHERE id = ? AND user_id = ?",
    [id, userId]
  );
}