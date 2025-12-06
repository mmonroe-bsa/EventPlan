import express from "express";
import { v4 as uuidv4 } from "uuid";
import {
  Communication,
  Deliverable,
  Objective,
  Plan,
  PlanOverview,
  Risk,
  ScheduleMilestone,
  SectionName,
  SectionStatus,
  StaffMember,
  Task,
} from "./types";
import { findTemplate, templates } from "./templates";

const app = express();
app.use(express.json());

const plans: Record<string, Plan> = {};

function parseDate(date?: string): Date | undefined {
  if (!date) return undefined;
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

function buildPlanOverview(plan: Plan): PlanOverview {
  const tasksByStatus = plan.tasks.reduce(
    (acc, task) => {
      acc.total += 1;
      if (task.status === "todo") acc.todo += 1;
      else if (task.status === "in-progress") acc.inProgress += 1;
      else if (task.status === "blocked") acc.blocked += 1;
      else if (task.status === "done") acc.done += 1;
      return acc;
    },
    { total: 0, todo: 0, inProgress: 0, blocked: 0, done: 0 }
  );

  const risksByImpact = plan.risks.reduce(
    (acc, risk) => {
      acc.total += 1;
      if (risk.impact === "high") acc.highImpact += 1;
      else if (risk.impact === "medium") acc.mediumImpact += 1;
      else if (risk.impact === "low") acc.lowImpact += 1;
      return acc;
    },
    { total: 0, highImpact: 0, mediumImpact: 0, lowImpact: 0 }
  );

  const upcomingMilestones = plan.schedule
    .map((m) => ({ milestone: m, date: parseDate(m.startDate) }))
    .filter((m) => !!m.date)
    .sort((a, b) => (a.date!.getTime() > b.date!.getTime() ? 1 : -1));

  const nextMilestone = upcomingMilestones.length > 0 ? upcomingMilestones[0].milestone : undefined;

  return {
    id: plan.id,
    name: plan.name,
    template: plan.template,
    eventDate: plan.eventDate,
    sections: plan.sections,
    objectives: { total: plan.objectives.length },
    deliverables: { total: plan.deliverables.length },
    staff: { total: plan.staff.length },
    tasks: tasksByStatus,
    risks: risksByImpact,
    schedule: { total: plan.schedule.length, nextMilestone },
    communications: { total: plan.communications.length },
  };
}

function defaultSections(): SectionStatus[] {
  const sections: SectionName[] = [
    "purpose",
    "objectives",
    "deliverables",
    "staff",
    "schedule",
    "risks",
    "tasks",
    "communications",
  ];
  return sections.map((section) => ({
    section,
    status: "not-started",
  }));
}

function applyTemplate(plan: Plan, templateName?: string) {
  const template = findTemplate(templateName);
  if (!template) return plan;

  plan.objectives = template.objectives.map((o) => ({
    ...o,
    id: uuidv4(),
    title: o.title ?? "Untitled objective",
    kpi: o.kpi ?? "",
  })) as Objective[];

  plan.deliverables = template.deliverables.map((d) => ({
    ...d,
    id: uuidv4(),
    title: d.title ?? "Untitled deliverable",
  })) as Deliverable[];

  plan.staff = template.staff.map((s) => ({
    ...s,
    id: uuidv4(),
    name: s.name ?? "TBD",
    role: s.role ?? "",
  })) as StaffMember[];

  plan.schedule = template.schedule.map((m) => ({
    ...m,
    id: uuidv4(),
    title: m.title ?? "Milestone",
    startDate: m.startDate ?? "T-0",
  })) as ScheduleMilestone[];

  plan.risks = template.risks.map((r) => ({
    ...r,
    id: uuidv4(),
    title: r.title ?? "Risk",
  })) as Risk[];

  plan.communications = template.communications.map((c) => ({
    ...c,
    id: uuidv4(),
    channel: c.channel ?? "Email",
    audience: c.audience ?? "Audience",
  })) as Communication[];

  plan.template = template.name;
  return plan;
}

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/templates", (_req, res) => {
  res.json(templates);
});

app.post("/plans", (req, res) => {
  const { name, eventDate, description, template } = req.body as Partial<Plan>;
  if (!name) {
    res.status(400).json({ error: "name is required" });
    return;
  }
  const planId = uuidv4();
  const plan: Plan = {
    id: planId,
    name,
    eventDate,
    description,
    template,
    sections: defaultSections(),
    objectives: [],
    deliverables: [],
    staff: [],
    tasks: [],
    schedule: [],
    risks: [],
    communications: [],
  };

  applyTemplate(plan, template);
  plans[planId] = plan;
  res.status(201).json(plan);
});

app.get("/plans", (_req, res) => {
  res.json(Object.values(plans));
});

app.get("/plans/:id", (req, res) => {
  const plan = plans[req.params.id];
  if (!plan) {
    res.status(404).json({ error: "plan not found" });
    return;
  }
  res.json(plan);
});

app.get("/plans/:id/overview", (req, res) => {
  const plan = plans[req.params.id];
  if (!plan) {
    res.status(404).json({ error: "plan not found" });
    return;
  }
  res.json(buildPlanOverview(plan));
});

app.patch("/plans/:id/sections/:section", (req, res) => {
  const plan = plans[req.params.id];
  const { status, summary } = req.body as Partial<SectionStatus>;
  if (!plan) return res.status(404).json({ error: "plan not found" });
  const match = plan.sections.find((s) => s.section === req.params.section);
  if (!match) return res.status(400).json({ error: "invalid section" });
  if (status) match.status = status;
  if (summary !== undefined) match.summary = summary;
  res.json(plan.sections);
});

app.post("/plans/:id/objectives", (req, res) => {
  const plan = plans[req.params.id];
  if (!plan) return res.status(404).json({ error: "plan not found" });
  const payload = req.body as Partial<Objective>;
  if (!payload.title || !payload.kpi) {
    return res.status(400).json({ error: "title and kpi are required" });
  }
  const objective: Objective = {
    id: uuidv4(),
    title: payload.title,
    kpi: payload.kpi,
    targetMetric: payload.targetMetric,
    currentValue: payload.currentValue,
  };
  plan.objectives.push(objective);
  res.status(201).json(objective);
});

app.post("/plans/:id/tasks", (req, res) => {
  const plan = plans[req.params.id];
  if (!plan) return res.status(404).json({ error: "plan not found" });
  const payload = req.body as Partial<Task>;
  if (!payload.title) return res.status(400).json({ error: "title is required" });
  const task: Task = {
    id: uuidv4(),
    title: payload.title,
    description: payload.description,
    status: payload.status ?? "todo",
    ownerId: payload.ownerId,
    dueDate: payload.dueDate,
    startDate: payload.startDate,
    dependencyIds: payload.dependencyIds ?? [],
    deliverableIds: payload.deliverableIds ?? [],
    objectiveIds: payload.objectiveIds ?? [],
    riskIds: payload.riskIds ?? [],
  };
  plan.tasks.push(task);
  res.status(201).json(task);
});

app.post("/plans/:id/risks", (req, res) => {
  const plan = plans[req.params.id];
  if (!plan) return res.status(404).json({ error: "plan not found" });
  const payload = req.body as Partial<Risk>;
  if (!payload.title) return res.status(400).json({ error: "title is required" });
  const risk: Risk = {
    id: uuidv4(),
    title: payload.title,
    description: payload.description,
    likelihood: payload.likelihood,
    impact: payload.impact,
    mitigations: payload.mitigations,
    ownerId: payload.ownerId,
    linkedTaskIds: payload.linkedTaskIds ?? [],
    linkedDeliverableIds: payload.linkedDeliverableIds ?? [],
    hazardNotes: payload.hazardNotes,
  };
  plan.risks.push(risk);
  res.status(201).json(risk);
});

app.post("/plans/:id/communications", (req, res) => {
  const plan = plans[req.params.id];
  if (!plan) return res.status(404).json({ error: "plan not found" });
  const payload = req.body as Partial<Communication>;
  if (!payload.channel || !payload.audience) {
    return res
      .status(400)
      .json({ error: "channel and audience are required" });
  }
  const communication: Communication = {
    id: uuidv4(),
    channel: payload.channel,
    audience: payload.audience,
    ownerId: payload.ownerId,
    cadence: payload.cadence,
    messageOutline: payload.messageOutline,
    linkedMilestoneIds: payload.linkedMilestoneIds ?? [],
  };
  plan.communications.push(communication);
  res.status(201).json(communication);
});

app.post("/plans/:id/deliverables", (req, res) => {
  const plan = plans[req.params.id];
  if (!plan) return res.status(404).json({ error: "plan not found" });
  const payload = req.body as Partial<Deliverable>;
  if (!payload.title) return res.status(400).json({ error: "title is required" });
  const deliverable: Deliverable = {
    id: uuidv4(),
    title: payload.title,
    description: payload.description,
    dueDate: payload.dueDate,
    acceptanceCriteria: payload.acceptanceCriteria,
    ownerId: payload.ownerId,
    linkedObjectiveIds: payload.linkedObjectiveIds ?? [],
  };
  plan.deliverables.push(deliverable);
  res.status(201).json(deliverable);
});

app.post("/plans/:id/staff", (req, res) => {
  const plan = plans[req.params.id];
  if (!plan) return res.status(404).json({ error: "plan not found" });
  const payload = req.body as Partial<StaffMember>;
  if (!payload.name || !payload.role) {
    return res.status(400).json({ error: "name and role are required" });
  }
  const staff: StaffMember = {
    id: uuidv4(),
    name: payload.name,
    role: payload.role,
    contact: payload.contact,
    availability: payload.availability,
    responsibilities: payload.responsibilities,
  };
  plan.staff.push(staff);
  res.status(201).json(staff);
});

app.post("/plans/:id/schedule", (req, res) => {
  const plan = plans[req.params.id];
  if (!plan) return res.status(404).json({ error: "plan not found" });
  const payload = req.body as Partial<ScheduleMilestone>;
  if (!payload.title || !payload.startDate) {
    return res
      .status(400)
      .json({ error: "title and startDate are required" });
  }
  const milestone: ScheduleMilestone = {
    id: uuidv4(),
    title: payload.title,
    startDate: payload.startDate,
    endDate: payload.endDate,
    dependencyIds: payload.dependencyIds ?? [],
  };
  plan.schedule.push(milestone);
  res.status(201).json(milestone);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`EventPlan API running on port ${PORT}`);
});
