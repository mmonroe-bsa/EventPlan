import { describe, expect, it } from "vitest";
import { validateSplAdultOverride } from "@/lib/validation";

describe("SPL rule enforcement", () => {
  it("rejects SPL + ADULT without override", () => {
    const result = validateSplAdultOverride("ADULT", "SPL", false);
    expect(result.valid).toBe(false);
  });

  it("allows SPL + ADULT with override", () => {
    const result = validateSplAdultOverride("ADULT", "SPL", true);
    expect(result.valid).toBe(true);
  });
});
