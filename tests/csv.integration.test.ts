import { describe, expect, it } from "vitest";
import { parseCsv } from "@/lib/csv";

describe("CSV import", () => {
  it("accepts valid rows and rejects invalid rows", () => {
    const csv = [
      "unitNumber,unitType,firstName,lastName,email,phone,youthAdult,roleLabel",
      "101,TROOP,Alex,Rivera,alex@example.com,555-1111,ADULT,SM",
      ",STAFF,Jamie,Lee,jamie@example.com,555-2222,ADULT,SPL"
    ].join("\n");

    const result = parseCsv(csv);
    expect(result.accepted).toHaveLength(1);
    expect(result.rejected).toHaveLength(1);
  });
});
