import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const requiredEnv = [
  "DB_HOST",
  "DB_PORT",
  "DB_USER",
  "DB_NAME",
] as const;

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Environment variable ${key} belum diatur`);
  }
}

const dbHost = process.env.DB_HOST!;
const dbPort = Number(process.env.DB_PORT!);
const dbUser = process.env.DB_USER!;
const dbPassword = process.env.DB_PASSWORD ?? "";
const dbName = process.env.DB_NAME!;

const pool = mysql.createPool({
  host: dbHost,
  port: dbPort,
  user: dbUser,
  password: dbPassword,
  database: dbName,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;