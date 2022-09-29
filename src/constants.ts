export const enum TriggerOptions {
  GET = 'get',
  SET = "set",
  ADD = "add",
  DELETE = "delete",
}

export enum EventType {
  CLICK = "click",
  CHANGE = "change",
  INPUT = 'input'
}

// react 中有些事件是合成事件 例如 input 事件也会触发 onChange
export const EventPool = {
  [EventType.CLICK]: [EventType.CLICK],
  [EventType.INPUT]: [EventType.INPUT, EventType.CHANGE],
  [EventType.CHANGE]: [EventType.CHANGE],
}