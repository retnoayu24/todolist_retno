"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">
        Terjadi Kesalahan
      </h1>

      <p>
        Maaf, terjadi kesalahan pada aplikasi.
      </p>

      <button
        onClick={() => reset()}
        className="rounded-md bg-black px-4 py-2 text-white"
      >
        Coba Lagi
      </button>
    </main>
  );
}