/**
 * 事件捕获, 统一在外层父节点监听事件, 分配事件处理器 (某些事件不会冒泡 / video 这种元素事件没有必要委托给上层)
 */

import { componentEventMap } from "./compiler";
import { EventType } from "../constants";

import type { ComponentEventMap } from "./compiler";
import type { Component } from "./type";

// 利用事件冒泡机制去监听事件 (不是所有事件都可以冒泡, 也可以通过 flag 找到对应 dom 节点去监听事件)
export function bindElementEvent(ele: HTMLElement, methods: Component["methods"]) {
  ele.addEventListener('click', createEventHandler(EventType.CLICK));
  ele.addEventListener('change', createEventHandler(EventType.CHANGE))
}

export const BaseEventPool = [EventType.CLICK]
export const SyntheticEventPool = [EventType.CHANGE]

// 根据监听事件类型分配对应的事件处理器
export function createEventHandler(type: EventType) {
  return (e: Event) => {
    const ele = e.target as HTMLElement;
    const flagStr = Object.keys(ele.dataset).find(key => key.startsWith('dom'));
    if (flagStr) {
      const flag = flagStr.toLowerCase().slice(3);
      const eventObject = componentEventMap.get(flag)
      if (!eventObject) {
        return;
      }

      if (BaseEventPool.includes(type)) {
        baseEventHandler(type, componentEventMap);
      } else if (SyntheticEventPool.includes(type)) {
        syntheticEventHander(type, componentEventMap)
      }
    }
  }
}

// 根据事件类型执行对应的事件回调
export function baseEventHandler(type: EventType, map: ComponentEventMap) {

  console.log('触发了事件', type);
}

// 某些事件是合成事件 eg: onChange
export function syntheticEventHander(type: EventType, map: ComponentEventMap) {
  console.log('触发了事件', type);
}