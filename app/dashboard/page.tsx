import Link from "next/link";
import { PageShell } from "@/lib/page-shell";

export default function DashboardPage() {
  return (
    <PageShell title="Dashboard" description="Select an event workspace or start a new camporee.">
      <div className="flex flex-col gap-3">
        <Link className="w-fit rounded bg-slate-900 px-4 py-2 text-sm font-semibold text-white" href="/events/new">
          Create camporee from template
        </Link>
        <div className="rounded border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-600">No active events yet.</p>
        </div>
      </div>
    </PageShell>
  );
}
