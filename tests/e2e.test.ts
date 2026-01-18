import { describe, expect, it } from "vitest";
import { rotationPublishRecipients } from "@/lib/rotations";
import { parseCsv } from "@/lib/csv";

describe("Camporee flow", () => {
  it("creates plan and notifies troop leaders", () => {
    const csv = [
      "unitNumber,unitType,firstName,lastName,email,phone,youthAdult,roleLabel",
      "201,TROOP,Taylor,Kim,sm@example.com,555-3333,ADULT,SM",
      "201,TROOP,Riley,Ng,asm@example.com,555-4444,ADULT,ASM"
    ].join("\n");

    const importResult = parseCsv(csv);
    expect(importResult.accepted).toHaveLength(2);

    const recipients = rotationPublishRecipients(
      importResult.accepted.map((row, index) => ({
        userId: String(index),
        roleLabel: row.roleLabel,
        email: row.email
      }))
    );

    expect(recipients).toHaveLength(2);
  });
});
