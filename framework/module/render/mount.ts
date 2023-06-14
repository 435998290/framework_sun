import { VNode } from "./h";

export const mount = (vNode: VNode, container: Element) => {
  const { tag, properties, children } = vNode;
  //新建节点
  const element = document.createElement(tag);
  //属性挂载
  if (properties) {
    for (const prop in vNode.properties) {
      element.setAttribute(prop, vNode.properties[prop]);
    }
  }
  //挂载子节点
  if (children) {
    if (Array.isArray(children)) {
      children.forEach((child) => {
        mount(child, element);
      });
    }
    if (typeof children === "string") {
      element.textContent = children;
    }
  }
  console.error("element", element);
  container.appendChild(element);
};
