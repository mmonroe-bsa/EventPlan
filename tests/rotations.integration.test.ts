import { describe, expect, it } from "vitest";
import { rotationPublishRecipients } from "@/lib/rotations";

describe("Rotation publish recipients", () => {
  it("sends only to SM and ASM", () => {
    const recipients = rotationPublishRecipients([
      { userId: "1", roleLabel: "SM", email: "sm@example.com" },
      { userId: "2", roleLabel: "ASM", email: "asm@example.com" },
      { userId: "3", roleLabel: "SPL", email: "spl@example.com" }
    ]);

    expect(recipients.map((r) => r.email)).toEqual(["sm@example.com", "asm@example.com"]);
  });
});
