import { describe, expect, it } from "vitest";
import { serializeRosterEntry } from "@/lib/roster";

describe("Roster serialization", () => {
  const person = {
    id: "1",
    firstName: "Alex",
    lastName: "Rivera",
    unit: "Troop 101",
    roleLabel: "SM",
    checkInStatus: "CHECKED_IN" as const,
    stationAssignment: "First Aid",
    email: "alex@example.com",
    phone: "555-1000"
  };

  it("includes PII for PII viewers", () => {
    const result = serializeRosterEntry(person, "PII");
    expect(result).toMatchObject({ email: "alex@example.com", phone: "555-1000" });
  });

  it("excludes PII for directory viewers", () => {
    const result = serializeRosterEntry(person, "DIRECTORY") as Record<string, unknown>;
    expect(result.email).toBeUndefined();
    expect(result.phone).toBeUndefined();
  });
});
