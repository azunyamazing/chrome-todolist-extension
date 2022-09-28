/**
 * 编译模板 & 替换事件和状态
 */

import { useId } from "../utils/use-id";
import type { Component } from "./type";

export enum EventType {
  CLICK = "onClick",
  CHANGE = "onChange",
}

export enum StateType {
  ATTR = 'attribute',
  VALUE = 'value'
}

export interface EventNodeType {
  type: EventType;
  flag: string;
  exp: string;
}

export interface StateNodeType {
  flag: string;
  values: Array<{
    type: StateType.ATTR;
    key: string;
    exp: string;
  } | {
    type: StateType.VALUE;
    exp: string;
  }>;
}

export type ComponentNode = EventNodeType | StateNodeType;

export const componentEventMap = new Map<string, EventNodeType>();
export const componentStateMap = new Map<string, StateNodeType>();

export type CompilerOptions = Omit<Component, "template">;

// 简单处理事件和状态的绑定
export function compiler(template: string, options: CompilerOptions) {
  let str = compilerEvent(template, options.methods, componentEventMap);
  str = compilerState(str, options.state, componentStateMap);
  return str;
}

// 编译模板事件
export function compilerEvent(template: string, events: CompilerOptions["methods"] = {}, map: Map<string, EventNodeType>): string {
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

// 编译模板状态
const tagStateRegexp = /<.*(\{\s*[a-zA-Z\.]+\s*\})\s*[^<>]*\/?>/;
const valueStateRegexp = /<[^>]+>\s*(\{\{\s*[a-zA-Z\.]+\s*\}\})\s*<\/[a-z]+>/;
export function compilerState(template: string, state: CompilerOptions["state"] = {}, map: Map<string, StateNodeType>): string {
  let result = template;

  // 处理 tag 上的 { state.name } 表达式
  result = result.replace(new RegExp(tagStateRegexp, 'g'), (tagStr) => {
    // 过滤出所有类似 <div name={ state.name } > 标签
    const values: StateNodeType['values'] = [];

    // 过滤出所有类似 name={ state.name } 语句
    const value = tagStr.replace(/[a-zA-Z\.]+=\{\s*([a-zA-Z\.]+)\s*\}/g, (stateStr, exp: string) => {
      // 存储当前的 key 以及对应的表达式
      const key = stateStr.split('=')[0];
      values.push({ type: StateType.ATTR, key, exp })
      const realValue = exp.split(".").reduce((result, key) => result[key], state);
      return `${key}="${realValue}"`;
    })

    const { flag, template: result } = compilerNodeFlag(value)
    map.set(flag, { flag, values, })
    return result
  })

  // 处理 tag 内 {{ state.name }} 表达式
  result = result.replace(new RegExp(valueStateRegexp, 'g'), (tagStr) => {
    const values: StateNodeType['values'] = [];

    // 过滤出所有类似 {{ state.name }} 语句
    const value = tagStr.replace(/\{\{\s*([a-zA-Z\.]+)\s*\}\}/g, (stateStr, exp: string) => {
      values.push({ type: StateType.VALUE, exp, })
      const realValue = exp.split(".").reduce((result, key) => result[key], state);
      return realValue
    })

    const { flag, template: result } = compilerNodeFlag(value)
    if (map.has(flag)) {
      map.get(flag).values.push(...values);
    } else {
      map.set(flag, { flag, values })
    }
    return result
  })
  return result;
}

const flagRegExp = /.*data-dom-([a-z0-9]+)\s*.*/;
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