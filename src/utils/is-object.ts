export function isObject(target: unknown): target is Record<string, any>;

export function isObject(target: unknown) {
  return typeof target === "object" && target !== null;
}
