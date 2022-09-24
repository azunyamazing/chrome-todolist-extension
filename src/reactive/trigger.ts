import { TriggerOptions } from "../constants";

export function trigger(target: object, type: TriggerOptions, key?: string, newValue?: unknown, oldValue?: unknown) {
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
