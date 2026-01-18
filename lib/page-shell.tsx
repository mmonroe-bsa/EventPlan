import Link from "next/link";

interface PageShellProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageShell({ title, description, children }: PageShellProps) {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {description ? <p className="text-slate-600">{description}</p> : null}
      </div>
      {children}
      <div>
        <Link className="text-sm text-slate-500 underline" href="/dashboard">
          Back to dashboard
        </Link>
      </div>
    </main>
  );
}
