export function shuffleArr<T>(arr: T[], inx: number): T[] {
  if (inx === 0) return arr;
  const first = arr.slice(0, inx);
  const last = arr.slice(inx);
  return [...last, ...first];
}