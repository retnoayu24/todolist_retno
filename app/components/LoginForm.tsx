"use client";

import { FormEvent, useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    alert("Login berhasil");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-[250px] rounded-md bg-white px-5 py-5 shadow-md">
        
        <div className="text-center">
          <h1 className="text-base font-semibold text-gray-800">
            Login
          </h1>

          <p className="mt-0.5 text-[9px] text-gray-500">
            Masuk ke akun Anda
          </p>
        </div>

        <div className="my-3 border-t border-gray-200" />

        <form onSubmit={handleSubmit} className="space-y-2.5">
          <div>
            <label className="mb-1 block text-[9px] text-gray-700">
              Email / Username:
            </label>

            <input
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Masukkan email"
              className="h-7 w-full rounded border border-gray-300 px-2 text-[9px] outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-[9px] text-gray-700">
              Password:
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Masukkan password"
              className="h-7 w-full rounded border border-gray-300 px-2 text-[9px] outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="h-7 w-full rounded bg-blue-600 text-[9px] font-medium text-white hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <div className="my-3 border-t border-gray-200" />

        <p className="text-center text-[8px] text-gray-600">
          Belum punya akun?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:underline"
          >
            Daftar di sini
          </a>
        </p>
      </div>
    </div>
  );
}