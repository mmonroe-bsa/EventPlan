import { describe, expect, it } from "vitest";
import { getRosterViewLevel } from "@/lib/rbac";

describe("RBAC roster view", () => {
  it("grants PII to org admin", () => {
    expect(
      getRosterViewLevel({ orgRole: "ADMIN", eventRoles: [], isAssignedToEvent: false })
    ).toBe("PII");
  });

  it("grants PII to event role holders", () => {
    expect(
      getRosterViewLevel({
        orgRole: "MEMBER",
        eventRoles: ["Operations Lead"],
        isAssignedToEvent: true
      })
    ).toBe("PII");
  });

  it("returns DIRECTORY for assigned members", () => {
    expect(
      getRosterViewLevel({ orgRole: "MEMBER", eventRoles: [], isAssignedToEvent: true })
    ).toBe("DIRECTORY");
  });

  it("returns NONE for unrelated users", () => {
    expect(
      getRosterViewLevel({ orgRole: "MEMBER", eventRoles: [], isAssignedToEvent: false })
    ).toBe("NONE");
  });
});
