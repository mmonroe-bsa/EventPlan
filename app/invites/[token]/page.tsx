import { PageShell } from "@/lib/page-shell";

export default function InvitePage() {
  return (
    <PageShell
      title="Accept invitation"
      description="Confirm your account details to join the event roster."
    >
      <form className="flex max-w-md flex-col gap-3 rounded border border-slate-200 bg-white p-6 shadow-sm">
        <label className="flex flex-col gap-1 text-sm font-medium">
          Full name
          <input className="rounded border border-slate-200 px-3 py-2" name="name" />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Password
          <input className="rounded border border-slate-200 px-3 py-2" name="password" type="password" />
        </label>
        <button className="rounded bg-slate-900 px-4 py-2 text-sm font-semibold text-white" type="submit">
          Accept invite
        </button>
      </form>
    </PageShell>
  );
}
