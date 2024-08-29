export function oneByte(value: number) {
  const array = new Uint8Array(new ArrayBuffer(1));
  array[0] = value;
  return array;
}
