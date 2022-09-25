import { TriggerOptions } from "../constants";
import { componentEventMap, componentStateMap } from "./compiler";
import type { Component } from "./type";

export function trigger(target: object, type: TriggerOptions, key?: string, newValue?: unknown, oldValue?: unknown) {
  console.log("componentEventMap", componentEventMap);
  console.log("componentStateMap", componentStateMap);

  switch (type) {
    case TriggerOptions.ADD:
      console.log(`新增属性：${key} = ${newValue}`);
      break;

    case TriggerOptions.SET:
      console.log(`修改属性：${key} 的值, 从 ${oldValue} 改为 ${newValue}`);
      break;

    case TriggerOptions.DELETE:
      console.log(`删除属性：${key}`);
      break;

    default:
      break;
  }
}

export function bindEvent(methods: Component["methods"]) {
  // TODO: addEventListener
}
