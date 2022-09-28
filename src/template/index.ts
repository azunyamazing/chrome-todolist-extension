import { compiler } from "./compiler";
import { bindElementEvent } from "./event-catch";

import type { Component } from "./type";

export function renderDOM(component: Component, ele: HTMLElement) {
  // 通过编译模板方式进行渲染
  const { template, state = {}, methods = {} } = component;
  const htmlStr = compiler(template, { state, methods });

  // 这里简单用 innerHTML 来做
  ele.innerHTML = htmlStr;

  // 绑定事件
  bindElementEvent(ele, methods);
}


export * from './compiler'
export * from './state-watch'
export * from './event-catch'
export * from './type'