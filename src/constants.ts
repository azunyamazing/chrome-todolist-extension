export const enum TriggerOptions {
  SET = "set",
  ADD = "add",
  DELETE = "delete",
}

export enum EventType {
  CLICK = "click",
  CHANGE = "change",
  INPUT = 'input'
}

// react 中有些事件时合成事件 例如 oninput 也会触发 onChange
export const EventPool = {
  [EventType.CLICK]: [EventType.CLICK],
  [EventType.INPUT]: [EventType.INPUT, EventType.CHANGE],
  [EventType.CHANGE]: [EventType.CHANGE],
}