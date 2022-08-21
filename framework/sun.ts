import { DataPublisher } from "./class/data-publisher";
import { ElementSubscriber } from "./class/element-subscriber";
import { SunType } from "./type";
import { getBindItem } from "./utils";

export class Sun {
  data: Record<string, any>;
  fragment: {};
  publisherPool: Record<string, DataPublisher>;
  constructor(sunObj: SunType) {
    this.data = sunObj.data || {};
    this.publisherPool = {};
    this.initData();
  }
  private initData() {
    console.log("start initData");
    this.publisherPool = {};
    for (const item in this.data) {
      const dataPublisher = new DataPublisher(item, this.data[item]);
      this.publisherPool[item] = dataPublisher;
      console.error(
        "publisherPool initialized successfully",
        this.publisherPool
      );
      Object.defineProperty(this.data, item, {
        set: (data: Object) => {
          console.log("data changed", data);
          this.publisherPool[item].publish(item, data);
        },
      });
    }
    this.initBindings();
  }
  private initBindings() {
    let elements = document.getElementById("app");
    let fragment = document.createDocumentFragment();
    if (elements) {
      const elementAttrs = elements.attributes;
      const sModel = elementAttrs.getNamedItem("s-model").value;
      console.error(sModel);
      // console.error('first child', elements.childNodes[0].attributes );
      let nodesList = elements.childNodes;
      nodesList.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const elementSubscriber = new ElementSubscriber(node as Element);
          const attributesMap = (node as Element).attributes;
          const nodeValue = node.textContent;
          const bindVModel = attributesMap.getNamedItem("s-model");
          const bindItems = getBindItem(nodeValue);
          if (bindItems) {
            bindItems.forEach((item) => {
              const dataKey = item.slice(2, -2);
              const bindData = this.publisherPool[dataKey];
              console.error("bindData", item, bindData);
              if (bindData) {
                bindData.subscribe(elementSubscriber);
              }
            });
          }
        }
        //     fragment.appendChild(node);
        console.error("attr", node);
      });
    }
    // return fragment;
  }
}
