import { ElementSubscriber } from "./class/element-subscriber";



//获取双大括号绑定的数据
export const getBindItem = (textContent: string) => {
  const rules = /{{[\w]+}}/g;
  return textContent.match(rules);
};
