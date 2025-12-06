# EventPlan Product Requirements

## Vision
EventPlan helps teams plan events collaboratively through a guided workflow and flexible data views. New plans default to a step-by-step wizard but users can freely navigate between sections and switch to direct data views at any time.

## Core user stories
- **Create and manage multiple plans** with multi-user collaboration.
- **Guided planning wizard** with skip/back navigation; existing plans can open any section directly.
- **Dashboard overview** showing sections (purpose, objectives/KPIs, deliverables, staff, schedule, risks, tasks, communications) with status and deep links.
- **Dual-mode UI** that toggles between guided flow and inline-editable dashboards/tables.
- **Templates** for event types (fundraiser, activity, campout, training, etc.) with ability to configure/save new templates.
- **Notifications** via email for reminders, due dates, and risk impacts.

## Feature details
### Planning flow
- Steps: purpose, success objectives/KPIs, deliverables, key staff, schedule, risks & hazard analyses, tasks, communications plan.
- Navigation: skip/return to steps without losing data; backward/forward buttons and section sidebar.

### Dashboard overview
- Clickable cards for each section showing completion/status (e.g., draft, in progress, complete, at risk).
- Surfacing key metrics: upcoming milestones, overdue tasks, risk count by severity, communication cadence readiness.

### Templates
- Starter templates pre-populated per event type (fundraiser/activity/campout/training).
- Admin/owner can create/edit templates: default objectives, deliverables, staff roles, schedule milestones, risks, communications grid.
- Apply template to new plan with ability to adjust values before saving.

### Tasks and schedule
- Views: list, Kanban, and Gantt/timeline.
- Task attributes: owner, due date, status, dependencies, tags, linked deliverables/objectives.
- Dependencies auto-adjust dates; warn when critical path changes threaten event date.
- Bulk rescheduling and history/audit of adjustments.

### Risks and hazard analysis
- Attributes: title, description, likelihood, impact, mitigations, owner, linked tasks/deliverables.
- Hazard analysis fields for safety/operations; ability to mark mitigations as tasks.
- Alerts when linked tasks slip.

### Staff and assignments
- Staff attributes: role, contact info, responsibilities, availability.
- Assign tasks and deliverables; visualize workload indicators.

### Communications plan
- Channel grid (channel, audience, owner, cadence, message outline, materials).
- Timeline for communications aligned with schedule milestones.

### Collaboration and access
- Multi-user plans with roles: owner, editor, viewer (for future permissions).
- Real-time co-editing target; MVP can begin with optimistic updates and later add presence.

### Exports and sharing
- Shareable overview page; later add PDF/CSV exports.

## Data model (draft)
- **Plan**: id, name, event_date, description, template_id?, status.
- **Objective**: id, plan_id, title, KPI definition, target_metric, current_value.
- **Deliverable**: id, plan_id, title, description, due_date, acceptance_criteria, owner_id?, linked_objective_ids.
- **Staff**: id, plan_id, name, role, contact, availability, responsibilities.
- **Task**: id, plan_id, title, description, status, owner_id?, due_date, start_date, dependency_ids, deliverable_ids, objective_ids, risk_ids.
- **ScheduleMilestone**: id, plan_id, title, start_date, end_date, dependency_ids.
- **Risk**: id, plan_id, title, description, likelihood, impact, mitigations, owner_id?, linked_task_ids, linked_deliverable_ids, hazard_notes.
- **Communication**: id, plan_id, channel, audience, owner_id?, cadence, message_outline, linked_milestone_ids.
- **Template**: id, name, defaults for all entities.

## MVP priorities
1) Wizard + dashboard shell with navigation between sections.
2) Data model + API for plans, objectives, deliverables, staff, tasks, schedule milestones, risks, communications, templates.
3) List/Kanban task views; simple Gantt MVP; dependency-based date adjustment warnings.
4) Template selection on plan creation with inline edit.
5) Email reminder hooks for due dates and risk changes.

## Open questions
- Preferred tech stack for front-end (React/Next, Vue/Nuxt) and back-end (Node/Nest, Rails, Django)?
- Should we support SSO or simple login in MVP once auth is enabled?
- How granular should permissions be in early iterations?
- Any compliance constraints for data storage/hosting?
