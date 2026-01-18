import { validateRoleLabel, validateSplAdultOverride } from "@/lib/validation";

export interface CsvRow {
  unitNumber?: string;
  unitType: "TROOP" | "STAFF";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  youthAdult: "YOUTH" | "ADULT";
  roleLabel: "SM" | "ASM" | "SPL" | "ADULT" | "YOUTH";
}

export interface CsvImportResult {
  accepted: CsvRow[];
  rejected: { row: CsvRow; reason: string }[];
}

const requiredHeaders = [
  "unitNumber",
  "unitType",
  "firstName",
  "lastName",
  "email",
  "phone",
  "youthAdult",
  "roleLabel"
];

export function parseCsv(input: string): CsvImportResult {
  const [headerLine, ...lines] = input.trim().split(/\r?\n/);
  const headers = headerLine.split(",").map((value) => value.trim());

  requiredHeaders.forEach((header) => {
    if (!headers.includes(header)) {
      throw new Error(`Missing required header: ${header}`);
    }
  });

  const accepted: CsvRow[] = [];
  const rejected: { row: CsvRow; reason: string }[] = [];

  for (const line of lines) {
    if (!line.trim()) {
      continue;
    }
    const values = line.split(",").map((value) => value.trim());
    const row = headers.reduce((acc, header, index) => {
      acc[header] = values[index] ?? "";
      return acc;
    }, {} as Record<string, string>);

    const mapped: CsvRow = {
      unitNumber: row.unitNumber || undefined,
      unitType: row.unitType as CsvRow["unitType"],
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      phone: row.phone,
      youthAdult: row.youthAdult as CsvRow["youthAdult"],
      roleLabel: row.roleLabel as CsvRow["roleLabel"]
    };

    const roleValidation = validateRoleLabel(mapped.youthAdult, mapped.roleLabel);
    if (!roleValidation.valid) {
      rejected.push({ row: mapped, reason: roleValidation.reason ?? "Invalid role." });
      continue;
    }

    const splOverride = validateSplAdultOverride(mapped.youthAdult, mapped.roleLabel, false);
    if (!splOverride.valid) {
      rejected.push({ row: mapped, reason: splOverride.reason ?? "Invalid SPL override." });
      continue;
    }

    if (mapped.unitType === "TROOP" && !mapped.unitNumber) {
      rejected.push({ row: mapped, reason: "Troop requires unitNumber." });
      continue;
    }

    accepted.push(mapped);
  }

  return { accepted, rejected };
}
