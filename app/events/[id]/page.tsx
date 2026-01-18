import Link from "next/link";
import { PageShell } from "@/lib/page-shell";

const links = [
  { href: "/events/1/tasks", label: "Tasks" },
  { href: "/events/1/checklists", label: "Checklists" },
  { href: "/events/1/schedule", label: "Schedule" },
  { href: "/events/1/units", label: "Units" },
  { href: "/events/1/roster", label: "Roster" },
  { href: "/events/1/ops-log", label: "Ops log" },
  { href: "/events/1/issues", label: "Issues" },
  { href: "/events/1/incidents", label: "Incidents" },
  { href: "/events/1/stations", label: "Stations" },
  { href: "/events/1/rotations", label: "Rotations" },
  { href: "/events/1/shifts", label: "Shifts" },
  { href: "/events/1/plan", label: "Plan" },
  { href: "/events/1/after-action", label: "After action" }
];

export default function EventOverviewPage() {
  return (
    <PageShell title="Event workspace" description="Manage the district camporee plan and roster.">
      <div className="grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.href}
            className="rounded border border-slate-200 bg-white px-4 py-3 text-sm font-medium shadow-sm"
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
