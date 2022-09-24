import { TriggerOptions } from "../constants";
import { hasOwnKey } from "../utils/has-own-key";
import { isEqual } from "../utils/is-equal";
import { isObject } from "../utils/is-object";
import { trigger } from "./trigger";
import { useReactive } from "./use-reactive";

export function createGetter() {
  return (target: object, key: string, receiver: object) => {
    const value = Reflect.get(target, key, receiver);

    // 订阅...

    if (isObject(value)) {
      // 对象进行递归代理
      return useReactive(value);
    }

    return value;
  };
}

export function createSetter() {
  return (target: object, key: string, value: unknown, receiver: object) => {
    const oldValue = target[key];

    if (!hasOwnKey(target, key)) {
      // 之前没有当前 key, 看作新增
      trigger(target, TriggerOptions.ADD, key, value);
    } else if (!isEqual(value, oldValue)) {
      // 当前 key 前后值不一样, 看作修改
      trigger(target, TriggerOptions.SET, key, value, oldValue);
    }

    return Reflect.set(target, key, value, receiver);;
  };
}
const get = createGetter();
const set = createSetter();

export function deleteProperty(target: object, key: string) {
  // 当前 key 存在, 且能 deleteProperty 值为 true, 看作删除
  const oldValue = target[key];
  const hasDelete = Reflect.deleteProperty(target, key);

  if (hasOwnKey(target, key) && hasDelete) {
    trigger(target, TriggerOptions.DELETE, key, undefined, oldValue);
  }

  return hasDelete;
}

export const mutableHandlers: ProxyHandler<object> = {
  get,
  set,
  deleteProperty,
};
