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
  event: string;
}

interface StateNodeType {
  flag: string;
  key: string;
  value: unknown;
}

export type ComponentNode = EventNodeType | StateNodeType;

export const componentStateMap = new Map<string, StateNodeType>();
export const componentEventMap = new Map<string, EventNodeType>();

export type CompilerOptions = Omit<Component, "template">;

// 简单处理事件和状态的绑定
export function compiler(template: string, options: CompilerOptions) {
  return baseCompiler(template, options);
}

// TODO: 编译模板, 得到 dom 结构
const tagRegexp = /<([^>]+)>/;
export function baseCompiler(template: string, options: CompilerOptions) {
  const domStr = template.trim();

  // console.log(domStr);

  const tagStr = template.match(tagRegexp);

  // console.log("tagStr", tagStr);

  let tagName = "";
  let props: Record<string, string> = {};

  domStr.replace(tagRegexp, (str, content: string) => {
    console.log("str", str);

    // 这里未处理值也包含空格的情况
    const [tag, ...propsStr] = content.replace(/\s+/g, " ").split(" ");

    tagName = tag.toUpperCase();

    propsStr.forEach((str) => {
      if (str === "") {
        return;
      }
      let [key, value] = str.split("=");

      if (value) {
        value = /^".*"$/.test(value) ? value.slice(1, -1) : value;
      } else {
        value = key;
      }

      Object.assign(props, { [key]: value });
    });

    return str;
  });

  console.log("tag", tagName, props);

  return {
    tagName,
    props,
  };
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
        event: key.trim(),
      });
      return template;
    });
  });

  return result;
}

export function compilerStateBinding(template: string, state: CompilerOptions["state"] = {}, map: Map<string, StateNodeType>): string {
  console.log(template);

  return template;
}

const flagRegExp = /data-dom-(.*)\s*/;

export function getNodeFlag(template: string) {
  if (flagRegExp.test(template)) {
    return template.replace(flagRegExp, "$1");
  }

  return undefined;
}

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
