import { DataPublisher } from "../class/data-publisher";

export const dataPublishInitUtil = (
  data: any,
  item: any,
  publisherPool: any,
  eventBus: any
) => {
  const dataPublisher = new DataPublisher(item, data[item]);
  publisherPool[item] = dataPublisher;
  console.info("publisherPool initialized successfully", publisherPool);
  console.error("item", item);
  Object.defineProperty(data, item, {
    set: (data: Object) => {
      console.log("data changed", data);
      const publisher = publisherPool[item];
      eventBus.publish(publisher, { key: item, value: data });
    },
  });
};
