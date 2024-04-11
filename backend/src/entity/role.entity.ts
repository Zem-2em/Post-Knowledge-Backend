export const RoleType = {
  ADMIN: 'ADMIN',
  ACTOR: 'ACTOR',
} as const

export type RoleType = keyof typeof RoleType

export function isRoleType(value: unknown): value is RoleType {
  return (
    Object.values(RoleType).find((roleType) => roleType === value) !== undefined
  )
}
