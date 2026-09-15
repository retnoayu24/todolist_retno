"use client";

import { FormEvent, useState } from "react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password dan konfirmasi password tidak sama");
      return;
    }

    alert("Registrasi berhasil");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-[250px] rounded-md bg-white px-5 py-5 shadow-md">

        <div className="text-center">
          <h1 className="text-base font-semibold text-gray-800">
            Register
          </h1>

          <p className="mt-0.5 text-[9px] text-gray-500">
            Buat akun baru
          </p>
        </div>

        <div className="my-3 border-t border-gray-200" />

        <form onSubmit={handleSubmit} className="space-y-2.5">

          <div>
            <label className="mb-1 block text-[9px] text-gray-700">
              Nama Lengkap:
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Masukkan nama"
              className="h-7 w-full rounded border border-gray-300 px-2 text-[9px] outline-none focus:border-[#2B7FFF]"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-[9px] text-gray-700">
              Email:
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Masukkan email"
              className="h-7 w-full rounded border border-gray-300 px-2 text-[9px] outline-none focus:border-[#2B7FFF]"
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
              className="h-7 w-full rounded border border-gray-300 px-2 text-[9px] outline-none focus:border-[#2B7FFF]"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-[9px] text-gray-700">
              Konfirmasi Password:
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Ulangi password"
              className="h-7 w-full rounded border border-gray-300 px-2 text-[9px] outline-none focus:border-[#2B7FFF]"
              required
            />
          </div>

          <button
            type="submit"
            className="h-7 w-full rounded bg-[#2B7FFF] text-[9px] font-medium text-white hover:bg-[#2474F0]"
          >
            Register
          </button>
        </form>

        <div className="my-3 border-t border-gray-200" />

        <p className="text-center text-[8px] text-gray-600">
          Sudah punya akun?{" "}
          <a
            href="/login"
            className="text-[#2B7FFF] hover:underline"
          >
            Login di sini
          </a>
        </p>

      </div>
    </div>
  );
}