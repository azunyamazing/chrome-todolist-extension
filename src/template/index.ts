import { compiler } from "./compiler";
import { bindEvent } from "./effect";

import type { Component } from "./type";

export function renderDOM(component: Component, ele: HTMLElement) {
  // 通过编译模板方式进行渲染
  const { template, state = {}, methods = {} } = component;
  const htmlStr = compiler(template, { state, methods });

  console.log('htmlStr', htmlStr);

  // 这里简单用 innerHTML 来做吧
  ele.innerHTML = htmlStr;

  // 绑定事件
  bindEvent(methods);
}
