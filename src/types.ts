export type SectionName =
  | "purpose"
  | "objectives"
  | "deliverables"
  | "staff"
  | "schedule"
  | "risks"
  | "tasks"
  | "communications";

export interface SectionStatus {
  section: SectionName;
  status: "not-started" | "in-progress" | "complete" | "at-risk";
  summary?: string;
}

export interface Objective {
  id: string;
  title: string;
  kpi: string;
  targetMetric?: string;
  currentValue?: string;
}

export interface Deliverable {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  acceptanceCriteria?: string;
  ownerId?: string;
  linkedObjectiveIds?: string[];
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  contact?: string;
  availability?: string;
  responsibilities?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "blocked" | "done";
  ownerId?: string;
  dueDate?: string;
  startDate?: string;
  dependencyIds?: string[];
  deliverableIds?: string[];
  objectiveIds?: string[];
  riskIds?: string[];
}

export interface ScheduleMilestone {
  id: string;
  title: string;
  startDate: string;
  endDate?: string;
  dependencyIds?: string[];
}

export interface Risk {
  id: string;
  title: string;
  description?: string;
  likelihood?: "low" | "medium" | "high";
  impact?: "low" | "medium" | "high";
  mitigations?: string;
  ownerId?: string;
  linkedTaskIds?: string[];
  linkedDeliverableIds?: string[];
  hazardNotes?: string;
}

export interface Communication {
  id: string;
  channel: string;
  audience: string;
  ownerId?: string;
  cadence?: string;
  messageOutline?: string;
  linkedMilestoneIds?: string[];
}

export interface Plan {
  id: string;
  name: string;
  eventDate?: string;
  description?: string;
  template?: string;
  sections: SectionStatus[];
  objectives: Objective[];
  deliverables: Deliverable[];
  staff: StaffMember[];
  tasks: Task[];
  schedule: ScheduleMilestone[];
  risks: Risk[];
  communications: Communication[];
}

export interface TemplateDefinition {
  name: string;
  summary: string;
  objectives: Partial<Objective>[];
  deliverables: Partial<Deliverable>[];
  staff: Partial<StaffMember>[];
  schedule: Partial<ScheduleMilestone>[];
  risks: Partial<Risk>[];
  communications: Partial<Communication>[];
}
