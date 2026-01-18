import { Button } from "@/components/ui/button";
import { PageShell } from "@/lib/page-shell";

export default function LoginPage() {
  return (
    <PageShell
      title="Login"
      description="Use your invite-based account to access event operations."
    >
      <form className="flex max-w-md flex-col gap-3 rounded border border-slate-200 bg-white p-6 shadow-sm">
        <label className="flex flex-col gap-1 text-sm font-medium">
          Email
          <input
            className="rounded border border-slate-200 px-3 py-2"
            name="email"
            placeholder="you@example.com"
            type="email"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Password
          <input
            className="rounded border border-slate-200 px-3 py-2"
            name="password"
            placeholder="••••••••"
            type="password"
          />
        </label>
        <Button type="submit">Sign in</Button>
      </form>
    </PageShell>
  );
}
