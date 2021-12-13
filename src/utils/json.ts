/* eslint-disable @typescript-eslint/no-explicit-any */
export function deepEqual(a: any, b: any): boolean {
  if (a === b) {
    return true;
  }
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }
  if (a !== Object(a) || b !== Object(b)) {
    return false;
  }
  const props = Object.keys(a);
  if (props.length !== Object.keys(b).length) {
    return false;
  }

  return props.every(function (prop) {
    return deepEqual(a[prop], b[prop]);
  });
}
