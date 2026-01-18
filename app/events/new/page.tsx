import { PageShell } from "@/lib/page-shell";

export default function NewEventPage() {
  return (
    <PageShell
      title="Create district camporee"
      description="Start a new event from the district camporee template."
    >
      <div className="rounded border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">Template: District Camporee</p>
        <button className="mt-4 rounded bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
          Create event
        </button>
      </div>
    </PageShell>
  );
}
