import { compiler } from "./compiler";
import { createElement } from "./create-element";
import type { Component } from "./type";

export function renderDOM(component: Component, ele: HTMLElement) {
  // TODO: 通过编译模板方式进行渲染
  // const { template, state = {}, methods = {} } = component;
  // const htmlStr = compiler(template, { state, methods });

  const dom = createElement(component);

  // 这里简单用 innerHTML 来做吧
  ele.innerHTML = dom;
}
