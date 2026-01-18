export type YouthAdult = "YOUTH" | "ADULT";
export type RoleLabel = "SM" | "ASM" | "SPL" | "ADULT" | "YOUTH";

export interface RoleValidationResult {
  valid: boolean;
  reason?: string;
}

export function validateRoleLabel(youthAdult: YouthAdult, roleLabel: RoleLabel) {
  const adultRoles: RoleLabel[] = ["SM", "ASM", "ADULT"];
  const youthRoles: RoleLabel[] = ["SPL", "YOUTH"];

  if (adultRoles.includes(roleLabel) && youthAdult !== "ADULT") {
    return { valid: false, reason: "Adult roles require ADULT membership." };
  }

  if (youthRoles.includes(roleLabel) && youthAdult !== "YOUTH") {
    return { valid: false, reason: "Youth roles require YOUTH membership." };
  }

  return { valid: true };
}

export function validateSplAdultOverride(
  youthAdult: YouthAdult,
  roleLabel: RoleLabel,
  overrideAllowed: boolean
): RoleValidationResult {
  if (roleLabel === "SPL" && youthAdult === "ADULT" && !overrideAllowed) {
    return { valid: false, reason: "SPL + ADULT requires Event Manager override." };
  }

  return { valid: true };
}

export type MedicalFormStatus =
  | "NOT_PROVIDED"
  | "ON_FILE_CURRENT"
  | "ON_FILE_EXPIRED"
  | "EXCEPTION_APPROVED";

export type MedicalFormVerificationMethod = "ATTESTED" | "VERIFIED";

export type MedicalExceptionReason =
  | "RELIGIOUS_OBJECTION"
  | "ADMIN_OVERRIDE"
  | "OTHER_NON_MEDICAL";

export interface MedicalFormInput {
  status: MedicalFormStatus;
  expirationDate?: string | null;
  verificationMethod?: MedicalFormVerificationMethod | null;
  referenceId?: string | null;
  exceptionReason?: MedicalExceptionReason | null;
}

export function validateMedicalForm(input: MedicalFormInput): RoleValidationResult {
  if (input.status === "NOT_PROVIDED") {
    return { valid: true };
  }

  if (!input.referenceId) {
    return { valid: false, reason: "Reference ID required for medical form status." };
  }

  if (
    (input.status === "ON_FILE_CURRENT" || input.status === "ON_FILE_EXPIRED") &&
    !input.expirationDate
  ) {
    return { valid: false, reason: "Expiration date required for current/expired forms." };
  }

  if (input.status === "EXCEPTION_APPROVED" && !input.exceptionReason) {
    return { valid: false, reason: "Exception reason required for approved exception." };
  }

  return { valid: true };
}

export type YptStatus = "NOT_PROVIDED" | "CURRENT" | "EXPIRED" | "EXCEPTION_APPROVED";
export type YptVerificationMethod = "ATTESTED" | "VERIFIED";
export type YptExceptionReason = "ADMIN_OVERRIDE" | "OTHER_NON_TRAINING";

export interface YptInput {
  status: YptStatus;
  expirationDate?: string | null;
  verificationMethod?: YptVerificationMethod | null;
  referenceId?: string | null;
  exceptionReason?: YptExceptionReason | null;
  isAdult: boolean;
}

export function validateYpt(input: YptInput): RoleValidationResult {
  if (!input.isAdult) {
    return { valid: true };
  }

  if (input.status === "NOT_PROVIDED") {
    return { valid: false, reason: "YPT required for adults." };
  }

  if ((input.status === "CURRENT" || input.status === "EXPIRED") && !input.expirationDate) {
    return { valid: false, reason: "YPT expiration date required." };
  }

  if (input.status === "EXCEPTION_APPROVED" && !input.exceptionReason) {
    return { valid: false, reason: "YPT exception reason required." };
  }

  return { valid: true };
}
