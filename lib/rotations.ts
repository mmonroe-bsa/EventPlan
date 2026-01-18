export type RoleLabel = "SM" | "ASM" | "SPL" | "ADULT" | "YOUTH";

export interface UnitMember {
  userId: string;
  roleLabel: RoleLabel;
  email: string;
}

export function rotationPublishRecipients(members: UnitMember[]) {
  return members.filter((member) => member.roleLabel === "SM" || member.roleLabel === "ASM");
}
