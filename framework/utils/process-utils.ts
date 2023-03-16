//过滤双大括号获取里面的model的key
export const processModelString = (attrStr: string) => {
  const S_MODEL_PRE = "{{";
  const S_MODEL_END = "}}";
  if (attrStr.startsWith(S_MODEL_PRE) && attrStr.endsWith(S_MODEL_END)) {
    const attrKey = attrStr.slice(S_MODEL_PRE.length, 0 - S_MODEL_END.length);
    return attrKey;
  }
  throw new Error("无效的model名");
};

//获取双大括号绑定的数据
export const getBindItem = (textContent: string) => {
  const rules = /{{[\w]+}}/g;
  return textContent.match(rules);
};
