import { TemplateDefinition } from "./types";

export const templates: TemplateDefinition[] = [
  {
    name: "Fundraiser",
    summary:
      "Pre-populated objectives, deliverables, and comms for donor-focused events",
    objectives: [
      {
        title: "Raise target amount",
        kpi: "Total donations",
        targetMetric: "$25,000",
      },
      { title: "Grow donor list", kpi: "New contacts", targetMetric: "150" },
    ],
    deliverables: [
      { title: "Venue contract", dueDate: "T-45" },
      { title: "Sponsorship packet", dueDate: "T-35" },
    ],
    staff: [
      { name: "Event lead", role: "Lead" },
      { name: "Sponsorship manager", role: "Partnerships" },
      { name: "Communications", role: "Marketing" },
    ],
    schedule: [
      { title: "Save the date", startDate: "T-60" },
      { title: "Donor outreach sprint", startDate: "T-40", endDate: "T-20" },
    ],
    risks: [
      { title: "Venue availability", likelihood: "medium", impact: "high" },
      { title: "Low RSVP conversion", likelihood: "medium", impact: "medium" },
    ],
    communications: [
      {
        channel: "Email",
        audience: "Donor list",
        cadence: "Initial + reminders",
        messageOutline: "Purpose, impact, RSVP link",
      },
      {
        channel: "Social",
        audience: "Followers",
        cadence: "Weekly",
        messageOutline: "Countdown posts",
      },
    ],
  },
  {
    name: "Training",
    summary:
      "Structure for training events with milestones, risks, and comms",
    objectives: [
      { title: "Participants trained", kpi: "Attendees", targetMetric: "50" },
      { title: "Satisfaction score", kpi: "Post-survey", targetMetric: "4.5/5" },
    ],
    deliverables: [
      { title: "Curriculum", dueDate: "T-30" },
      { title: "Instructor guide", dueDate: "T-21" },
    ],
    staff: [
      { name: "Lead trainer", role: "Training" },
      { name: "Coordinator", role: "Logistics" },
    ],
    schedule: [
      { title: "Pilot run", startDate: "T-20" },
      { title: "Final rehearsal", startDate: "T-7" },
    ],
    risks: [
      { title: "Low attendance", likelihood: "low", impact: "high" },
      { title: "Technical issues", likelihood: "medium", impact: "medium" },
    ],
    communications: [
      {
        channel: "Email",
        audience: "Registrants",
        cadence: "Pre/post reminders",
        messageOutline: "Prep materials, links, survey",
      },
    ],
  },
];

export function findTemplate(name?: string) {
  if (!name) return undefined;
  return templates.find((t) => t.name.toLowerCase() === name.toLowerCase());
}
