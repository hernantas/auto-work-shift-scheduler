export function getCircularNumber(index: number, size: number): number {
  return (((index + size) % size) + size) % size;
}

export function zeroPad(value: number, length?: number) {
  const text = String(value);
  const size = Math.max(text.length, length ?? 0);
  const leading = Array.from(new Array(size).keys())
    .map(() => "0")
    .join("");
  const fulltext = leading + text;
  return fulltext.substring(leading.length + text.length - size);
}
