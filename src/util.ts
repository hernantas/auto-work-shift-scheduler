export function getCircularNumber(index: number, size: number): number {
  return (((index + size) % size) + size) % size;
}
