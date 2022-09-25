/**
 * @see: https://github.com/vuejs/core/blob/96ba71d0cffbb8a736365d92d1f5cd6be9afdcff/packages/reactivity/src/reactive.ts#L90
 */

import { mutableHandlers } from "./mutable-handlers";
import { isObject } from "../utils/is-object";

export function useReactive<T extends object>(target: T): T {
  return createReactiveObject<T>(target, mutableHandlers);
}

export function createReactiveObject<T extends object>(target: T, baseHandlers: ProxyHandler<T>) {
  if (!isObject(target)) {
    return target;
  }

  const proxy = new Proxy(target, baseHandlers);
  return proxy;
}
