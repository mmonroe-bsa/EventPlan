import type { RosterViewLevel } from "@/lib/rbac";

export interface RosterPerson {
  id: string;
  firstName: string;
  lastName: string;
  unit: string;
  roleLabel: string;
  checkInStatus: "CHECKED_IN" | "NOT_CHECKED_IN";
  stationAssignment?: string | null;
  email?: string | null;
  phone?: string | null;
}

export function serializeRosterEntry(person: RosterPerson, viewLevel: RosterViewLevel) {
  const base = {
    id: person.id,
    name: `${person.firstName} ${person.lastName}`.trim(),
    unit: person.unit,
    roleLabel: person.roleLabel,
    checkInStatus: person.checkInStatus,
    stationAssignment: person.stationAssignment ?? null
  };

  if (viewLevel === "PII") {
    return {
      ...base,
      email: person.email ?? null,
      phone: person.phone ?? null
    };
  }

  return base;
}
