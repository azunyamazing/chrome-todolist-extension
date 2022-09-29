/**
 * 这里执行页面渲染完之后, 监听到状态更新时, 局部更新页面
 */

import { TriggerOptions } from "../constants";
import { isEqual } from "../utils";
import { componentStateMap, StateType } from "./compiler";
import type { ComponentStateMap } from "./compiler";

export function createTriggerHandler() {
  // 因为就一个组件所以只保存了一个  多个代理可以通过创建多个实例去监听
  let initTarget: object = null;

  return function trigger(target: object, type: TriggerOptions, key?: string, newValue?: unknown, oldValue?: unknown) {
    // console.log('componentStateMap', componentStateMap);

    switch (type) {
      case TriggerOptions.GET:
        if (!initTarget) {
          // 简单粗暴深度克隆
          initTarget = JSON.parse(JSON.stringify(target));
        }
        break;

      case TriggerOptions.ADD:
        console.log(`新增属性：${key} = ${newValue}`);
        break;

      case TriggerOptions.SET:
        console.log(`修改属性：${key} 的值, 从 ${oldValue} 改为 ${newValue}`);
        handleStateChange(initTarget, key, newValue, componentStateMap)
        break;

      case TriggerOptions.DELETE:
        console.log(`删除属性：${key}`);
        break;

      default:
        break;
    }
  }
}

export type StateChange = { flag: string; type: StateType.ATTR; key: string; value: unknown } | { flag: string; type: StateType.VALUE; value: unknown }

// 这里简单暴力一点 遍历 map, 检查属性值是否改变去更新 dom
export function handleStateChange(target: object, key: string, value: unknown, map: ComponentStateMap) {
  // 将所有 change 先缓存下来, 检查完毕后一起更新
  const changes: Array<StateChange> = [];

  for (const [flag, stateNode] of map) {
    stateNode.values.forEach((stateNode) => {
      const { exp, type } = stateNode;
      if (!exp.endsWith(key)) {
        return;
      }
      console.log('exp', exp);
      const keys = exp.split('.');
      let index = 0;
      let prevValue: unknown = undefined;
      while (index < keys.length) {
        prevValue = target[keys[index]];
        ++index;
      }
      if (!isEqual(prevValue, value)) {
        if (type === StateType.ATTR) {
          changes.push({ flag, type, value, key: stateNode.key })
        } else if (type === StateType.VALUE) {
          changes.push({ flag, type, value })
        }
      }
    })
  }

  changes.forEach((change) => {
    const ele = document.querySelector(`[data-dom-${change.flag}]`);
    switch (change.type) {
      case StateType.ATTR:
        ele.setAttribute(change.key, String(change.value));
        break;
      case StateType.VALUE:
        ele.innerHTML = String(change.value);
        break;
    }
  })
}