export interface InviteRecord {
  id: string;
  email: string;
  expiresAt: Date;
  acceptedAt?: Date | null;
}

export interface PendingMembershipRecord {
  id: string;
  inviteId: string;
  email: string;
  unitId: string;
  roleLabel: string;
}

export interface AcceptInviteResult {
  accepted: boolean;
  reason?: string;
  membershipsCreated: string[];
}

export function acceptInvite(
  invite: InviteRecord,
  pendingMemberships: PendingMembershipRecord[],
  now: Date
): AcceptInviteResult {
  if (invite.acceptedAt) {
    return { accepted: false, reason: "Invite already accepted.", membershipsCreated: [] };
  }

  if (invite.expiresAt.getTime() < now.getTime()) {
    return { accepted: false, reason: "Invite expired.", membershipsCreated: [] };
  }

  const memberships = pendingMemberships
    .filter((pending) => pending.inviteId === invite.id)
    .map((pending) => pending.id);

  return { accepted: true, membershipsCreated: memberships };
}
