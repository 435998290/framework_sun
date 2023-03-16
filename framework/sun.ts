import { DataPublisher } from "./class/data-publisher";
import { ElementSubscriber } from "./class/element-subscriber";
import { EventBus } from "./class/event-bus";
import { SunType } from "./type";
import { getBindItem, processModelString } from "./utils/process-utils";
import { dataPublishInitUtil } from "./utils/event-bus-utils";

export class Sun {
  data: Record<string, any>;
  fragment: {};
  publisherPool: Record<string, DataPublisher>;
  eventBus: EventBus;
  constructor(sunObj: SunType) {
    this.data = sunObj.data || {};
    this.publisherPool = {};
    this.initData();
    this.initBindings();
  }
  private initData() {
    console.log("start initData");
    this.publisherPool = {};
    this.eventBus = new EventBus();
    //这里去给data内属性去挂载setter
    for (const item in this.data) {
      dataPublishInitUtil(this.data, item, this.publisherPool, this.eventBus);
    }
  }
  private initBindings() {
    let elements = document.getElementById("app");
    // let fragment = document.createDocumentFragment();
    if (elements) {
      const sModel = elements.getAttribute("s-model");
      // console.error('first child', elements.childNodes[0].attributes );
      let nodesList = elements.childNodes;
      nodesList.forEach((node) => {
        this.processDataBindings(node);
      });
    }
    // return fragment;
  }

  //去订阅节点需要消费的数据
  private processDataBindings(node: Node) {
    const elementSubscriber = new ElementSubscriber(node as Element);
    const nodeValue = node.textContent;
    const bindItems = getBindItem(nodeValue);
    if (bindItems) {
      bindItems.forEach((item) => {
        try {
          const dataKey = processModelString(item);
          const bindData = this.publisherPool[dataKey];
          console.error("bindData", item, bindData);
          if (bindData) {
            this.eventBus.subscribe(elementSubscriber, bindData);
          }
        } catch (err) {
          console.error(err.message);
        }
      });
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      const bindSModel = (node as Element).getAttribute("s-model");
      const attrValue = bindSModel.slice(2, -2);
      // Object.defineProperties(node, )
      console.info("s-model", node);
    }
    //     fragment.appendChild(node);
    console.info("attr", node);
  }

  //这里去递归挂载setter
  private dataPublishInit(data: any) {
    console.error("publisherPool", this.publisherPool, data);
    const keyList = Object.keys(data);
    if (keyList.length > 0) {
      keyList.forEach((key) => {
        //这里数组的处理不好，之后优化下
        dataPublishInitUtil(data, key, this.publisherPool, this.eventBus);
        console.log("key", key, data, data[key]);
        this.dataPublishInit(data[key]);
      });
    }
  }
}
