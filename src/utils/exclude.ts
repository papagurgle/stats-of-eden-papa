export function exclude<Player, Key extends keyof Player>(
  player: Player,
  keys: Key[]
): Omit<Player, Key> {
  // @ts-expect-error https://www.prisma.io/docs/orm/prisma-client/queries/excluding-fields
  return Object.fromEntries(Object.entries(player).filter(([key]) => !keys.includes(key)));
}
