export const enum TriggerOptions {
  SET = "set",
  ADD = "add",
  DELETE = "delete",
}

export enum EventType {
  CLICK = "onClick",
  CHANGE = "onChange",
}

export const EventPool = [EventType.CHANGE, EventType.CLICK]