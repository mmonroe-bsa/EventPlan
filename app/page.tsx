import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-4 px-6 py-10">
      <h1 className="text-3xl font-semibold">EventPlan</h1>
      <p className="text-slate-600">
        Internal event operations workspace for district camporees.
      </p>
      <div className="flex gap-3">
        <Link className="rounded bg-slate-900 px-4 py-2 text-white" href="/login">
          Login
        </Link>
        <Link className="rounded border border-slate-200 px-4 py-2" href="/dashboard">
          Dashboard
        </Link>
      </div>
    </main>
  );
}
