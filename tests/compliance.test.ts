import { describe, expect, it } from "vitest";
import { validateMedicalForm, validateYpt } from "@/lib/validation";

describe("Compliance validation", () => {
  it("requires medical reference for non-provided", () => {
    const result = validateMedicalForm({
      status: "ON_FILE_CURRENT",
      expirationDate: "2025-01-01",
      referenceId: null
    });
    expect(result.valid).toBe(false);
  });

  it("requires YPT for adults", () => {
    const result = validateYpt({ status: "NOT_PROVIDED", isAdult: true });
    expect(result.valid).toBe(false);
  });

  it("skips YPT for youth", () => {
    const result = validateYpt({ status: "NOT_PROVIDED", isAdult: false });
    expect(result.valid).toBe(true);
  });
});
