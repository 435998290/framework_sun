import { VNode } from "./h";

export const patch = (oldNode: VNode, newNode: VNode): VNode => {
  // tag 校验
  oldNode.tag = newNode.tag;
  // property更新
  const oldNodeProperty = oldNode.properties || {};
  const newNodeProperty = newNode.properties || {};
  oldNode.properties = propertiesPatch(oldNodeProperty, newNodeProperty);
  oldNode.children = childrenPatch(oldNode.children, newNode.children);
  return oldNode;
};

const propertiesPatch = (oldNodeProperties: any, newNodeProperties: any) => {
  for (const oldProp in oldNodeProperties) {
    console.error('oldProp', oldProp)
    if (newNodeProperties[oldProp]) {
      newNodeProperties[oldProp] !== oldNodeProperties[oldProp] &&
        (oldNodeProperties[oldProp] = newNodeProperties[oldProp]);
    } else {
      delete oldNodeProperties[oldProp];
    }
  }
  for (const newProp in newNodeProperties) {
    if (!oldNodeProperties[newProp]) {
      oldNodeProperties[newProp] = newNodeProperties[newProp];
    }
  }
  console.error('oldNodeProperties', oldNodeProperties)
  return oldNodeProperties;
};

const childrenPatch = (
  oldNodeChildren: VNode[] | string,
  newNodeChildren: VNode[] | string
) => {
  //如果有一个是string，那么直接把新节点的children更新到旧节点上即可
  if (!Array.isArray(oldNodeChildren) || !Array.isArray(newNodeChildren)) {
    return newNodeChildren;
  }
  const oldChildrenLength = oldNodeChildren.length;
  const newChildrenLength = newNodeChildren.length;
  const minLength = Math.min(oldChildrenLength, newChildrenLength);
  //遍历下方节点去patch，更新旧节点的子节点
  for (let i = 0; i < minLength; i++) {
    const oldChildItem = oldNodeChildren[i];
    const newChildItem = newNodeChildren[i];
    if (oldChildItem !== newChildItem) {
      oldNodeChildren[i] = patch(oldChildItem, newChildItem);
    }
  }
  return oldNodeChildren.slice(0, minLength).concat(newNodeChildren.slice(minLength, newChildrenLength));
};
