import { describe, expect, it } from "vitest";
import { acceptInvite } from "@/lib/invites";

describe("Invite acceptance", () => {
  it("accepts valid invite and converts memberships", () => {
    const invite = {
      id: "invite-1",
      email: "leader@example.com",
      expiresAt: new Date("2099-01-01T00:00:00Z"),
      acceptedAt: null
    };
    const pending = [
      { id: "pending-1", inviteId: "invite-1", email: "leader@example.com", unitId: "unit-1", roleLabel: "SM" }
    ];

    const result = acceptInvite(invite, pending, new Date("2024-01-01T00:00:00Z"));
    expect(result.accepted).toBe(true);
    expect(result.membershipsCreated).toEqual(["pending-1"]);
  });
});
