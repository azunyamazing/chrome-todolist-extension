/**
 * 事件捕获, 统一在外层父节点监听事件, 分配事件处理器 (某些事件不会冒泡 / video | audio 等这种特殊事件没有进行委托)
 */

import { componentEventMap } from "./compiler";
import { EventPool, EventType } from "../constants";

import type { EventNodeType } from "./compiler";
import type { Component } from "./type";

// 通过事件委托去监听事件 (不是所有事件都可以冒泡, 也可以通过 flag 找到对应 dom 节点去监听事件)
export function bindElementEvent(ele: HTMLElement, methods: Component["methods"]) {
  Object.keys(EventPool).forEach((eventName: EventType) => {
    ele.addEventListener(eventName, createEventHandler(eventName, methods));
  })
}

// input 元素触发 oninput, react 中也是会触发 onChange
export const SyntheticEventPool = [EventType.CHANGE, EventType.INPUT];

// 根据监听事件类型分配对应的事件处理器
export function createEventHandler(type: EventType, methods: Component["methods"]) {
  return (domEvent: Event) => {
    const ele = domEvent.target as HTMLElement;
    const flagStr = Object.keys(ele.dataset).find(key => key.startsWith('dom'));
    if (flagStr) {
      const flag = flagStr.toLowerCase().slice(3);
      const eventObject = componentEventMap.get(flag)
      if (!eventObject) {
        return;
      }
      eventHandler(type, domEvent, eventObject, methods)
    }
  }
}

// 处理事件
export function eventHandler(type: EventType, domEvent: Event, eventObject: EventNodeType, methods: Component["methods"]) {
  const events = EventPool[type];
  events.forEach((eventName) => {
    const event = eventObject.values.find(({ type }) => type === eventName);
    // 如果绑定了事件就执行
    if (event) {
      // 这里可以添加一些对于 exp 的判断, 可能是函数名, 也可能是匿名函数, 也可能是立即调用函数
      // 这里简单当成函数变量去做 :)
      const method = methods[event.exp]
      method(domEvent);
    }
  });
}