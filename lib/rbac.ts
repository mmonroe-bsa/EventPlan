export type OrgRole = "ADMIN" | "MEMBER";
export type EventRole =
  | "Event Manager"
  | "Logistics Lead"
  | "Operations Lead"
  | "Program Lead"
  | "Registration Lead"
  | "Health & Safety Lead";

export type RosterViewLevel = "PII" | "DIRECTORY" | "NONE";

interface RosterAccessInput {
  orgRole: OrgRole;
  eventRoles: EventRole[];
  isAssignedToEvent: boolean;
}

const piiRoles: EventRole[] = [
  "Event Manager",
  "Logistics Lead",
  "Operations Lead",
  "Program Lead",
  "Registration Lead",
  "Health & Safety Lead"
];

export function getRosterViewLevel(input: RosterAccessInput): RosterViewLevel {
  if (input.orgRole === "ADMIN") {
    return "PII";
  }
  if (input.eventRoles.some((role) => piiRoles.includes(role))) {
    return "PII";
  }
  if (input.isAssignedToEvent) {
    return "DIRECTORY";
  }
  return "NONE";
}

export function canExportRoster(viewLevel: RosterViewLevel): boolean {
  return viewLevel === "PII";
}
