/**
 * 编译模板 & 替换事件和状态
 *
 * 将 <div onClick={onClick}>{{ count }}</div> 编译成 <div data-dom-eriri>0</div>
 */

import { useId } from "../utils/use-id";
import type { Component } from "./type";

export enum EventType {
  CLICK = "onClick",
  CHANGE = "onChange",
}

interface EventNodeType {
  type: EventType;
  flag: string;
  exp: string;
}

interface StateNodeType {
  exp: string;
  value: unknown;
}

export type ComponentNode = EventNodeType | StateNodeType;

export const componentEventMap = new Map<string, EventNodeType>();
export const componentStateMap = new Map<string, StateNodeType>();

export type CompilerOptions = Omit<Component, "template">;

// 简单处理事件和状态的绑定
export function compiler(template: string, options: CompilerOptions) {
  let str = compilerEventBinding(template, options.methods, componentEventMap);
  str = compilerStateBinding(str, options.state, componentStateMap);

  return str;
}
export function compilerEventBinding(template: string, events: CompilerOptions["methods"] = {}, map: Map<string, EventNodeType>): string {
  console.log("template", template);

  let result = template;

  const eventList: Array<EventType> = [EventType.CLICK, EventType.CHANGE];

  eventList.forEach((event) => {
    const regexp = new RegExp(`<.*${event}=\\{(.*)\\}\\s*/?>`, "g");
    const clearRegexp = new RegExp(`\\s*${event}=\\{.*\\}`);

    result = result.replace(regexp, (str, key) => {
      // 清除事件标记
      str = str.replace(clearRegexp, "");

      const { template, flag } = compilerNodeFlag(str);
      map.set(flag, {
        type: event,
        flag,
        exp: key.trim(),
      });
      return template;
    });
  });

  return result;
}

// TODO: 这里应该也通过 flag 来进行保存结果

export function compilerStateBinding(template: string, state: CompilerOptions["state"] = {}, map: Map<string, StateNodeType>): string {
  template.match(/\{\s*([a-zA-Z\.]+)\s*\}/g)?.forEach((exp) => {
    const key = exp.slice(1, -1).trim();
    const value = key.split(".").reduce((result, key) => result[key], state);

    map.set(key, value);
  });

  return template;
}

const flagRegExp = /data-dom-(.*)\s*/;
const addFlagRegExp = /(.[^\/])(\/?>)/;

export function compilerNodeFlag(template: string) {
  let flag = "";

  if (flagRegExp.test(template)) {
    flag = template.replace(flagRegExp, "$1");
  } else {
    flag = useId();
    template = template.replace(addFlagRegExp, (str, $1, $2) => {
      return `${$1.trim()} data-dom-${flag}${$2}`;
    });
  }

  return {
    flag,
    template,
  };
}
