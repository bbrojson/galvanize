export function oneByte(value: number) {
  const array = new Int8Array(new ArrayBuffer(1));
  array[0] = value;
  return array;
}
