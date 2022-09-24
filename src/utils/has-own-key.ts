export function hasOwnKey(target: object, key: string): key is keyof typeof target {
  return Object.prototype.hasOwnProperty.call(target, key);
}
