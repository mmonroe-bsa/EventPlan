import { describe, expect, it } from "vitest";
import { hasOverlap } from "@/lib/shifts";

describe("Shift overlap", () => {
  it("detects overlap for same time", () => {
    const existing = [
      { id: "1", start: new Date("2024-08-01T10:00:00Z"), end: new Date("2024-08-01T11:00:00Z") }
    ];
    const candidate = {
      id: "2",
      start: new Date("2024-08-01T10:30:00Z"),
      end: new Date("2024-08-01T11:30:00Z")
    };
    expect(hasOverlap(existing, candidate)).toBe(true);
  });

  it("allows non-overlapping shifts", () => {
    const existing = [
      { id: "1", start: new Date("2024-08-01T08:00:00Z"), end: new Date("2024-08-01T09:00:00Z") }
    ];
    const candidate = {
      id: "2",
      start: new Date("2024-08-01T09:00:00Z"),
      end: new Date("2024-08-01T10:00:00Z")
    };
    expect(hasOverlap(existing, candidate)).toBe(false);
  });
});
