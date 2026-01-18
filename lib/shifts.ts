export interface Shift {
  id: string;
  start: Date;
  end: Date;
}

export function hasOverlap(existing: Shift[], candidate: Shift): boolean {
  return existing.some((shift) =>
    Math.max(shift.start.getTime(), candidate.start.getTime()) <
    Math.min(shift.end.getTime(), candidate.end.getTime())
  );
}
