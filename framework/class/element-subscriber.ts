import { getBindItem } from "../utils/process-utils";

export class ElementSubscriber {
  element: Element;
  bindMap: Record<string, string>; //维护节点内每个绑定数据的映射关系
  initData: {
    textContent: string;
  };
  constructor(element: Element) {
    console.log("elementSubscriber initialized");
    this.element = element;
    this.initData = { textContent: element.textContent };
    this.bindMap = {};
    const bindItems = getBindItem(element.textContent || "") || [];
    bindItems.forEach((bindItem) => {
      this.bindMap[bindItem.slice(2, -2)] = "";
    });
  }
  publish(data: { key: string; value: any }) {
    const { key, value } = data;
    console.error("start generateTextContent", key, value);
    this.bindMap[key] = value;
    console.log("bindMap", this.bindMap);
    const textContent = this.generateTextContent();
    console.error("update text content", textContent);
    this.element.textContent = textContent;
  }
  private generateTextContent() {
    for (const key in this.bindMap) {
      return this.initData.textContent.replace(`{{${key}}}`, this.bindMap[key]);
    }
  }
}
