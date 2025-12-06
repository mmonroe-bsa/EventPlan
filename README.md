# EventPlan
EventPlan is an event planning application focused on guided planning with flexible dashboards.

## Product requirements
See `docs/product_requirements.md` for the current product requirements and priorities.

## API prototype
An early Express + TypeScript prototype is included to start exercising the data model and templates.

### Prerequisites
- Node.js 20.x and npm. If you use `nvm`, run `nvm use` in the repo root (see `.nvmrc`).

### Setup
1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`

### Troubleshooting installation
- **npm not found**: Install Node.js + npm (e.g., via `nvm install` or your OS package manager) then re-run `npm install`.
- **Locked dependencies**: If your environment blocks `npm install`, try `npm ci` (with an existing lockfile) or `corepack enable` + `pnpm install` after `npm install -g pnpm`.

### Endpoints
- `GET /health` simple health check.
- `GET /templates` list available starter templates.
- `POST /plans` create a new plan (optionally pass `{ template: "Fundraiser" }`).
- `GET /plans` list all in-memory plans.
- `GET /plans/:id` get a plan.
- `PATCH /plans/:id/sections/:section` update section status/summary.
- `POST /plans/:id/tasks` add a task.
- `POST /plans/:id/risks` add a risk with optional links to tasks/deliverables.
- `POST /plans/:id/communications` add a communications grid entry.
- `POST /plans/:id/deliverables` add a deliverable.
- `POST /plans/:id/staff` add staff/roles.
- `POST /plans/:id/schedule` add a milestone.

> Note: this prototype stores data in memory and is intended for rapid iteration on the guided flow and dashboard concepts.
