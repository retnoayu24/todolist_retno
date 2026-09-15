import pool from "../config/db.js";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export async function findUserByUsername(
  username: string
): Promise<User | null> {
  const [rows] = await pool.execute(
    "SELECT * FROM users WHERE username = ? LIMIT 1",
    [username]
  );

  const users = rows as User[];

  return users.length > 0 ? users[0]! : null;
}

export async function findUserByEmail(
  email: string
): Promise<User | null> {
  const [rows] = await pool.execute(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email]
  );

  const users = rows as User[];

  return users.length > 0 ? users[0]! : null;
}

export async function findUserById(
  id: number
): Promise<User | null> {
  const [rows] = await pool.execute(
    "SELECT * FROM users WHERE id = ? LIMIT 1",
    [id]
  );

  const users = rows as User[];

  return users.length > 0 ? users[0]! : null;
}

export async function createUser(
  username: string,
  email: string,
  password: string
): Promise<number> {
  const [result] = await pool.execute(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, password]
  );

  const insertResult = result as {
    insertId: number;
  };

  return insertResult.insertId;
}