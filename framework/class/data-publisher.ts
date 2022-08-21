import { ElementSubscriber } from "./element-subscriber";

export class DataPublisher {
  subscriberList: ElementSubscriber[];
  key: any;
  value: any;
  constructor(key: string, value: any) {
    this.key = key;
    this.value = value;
    this.subscriberList = [];
  }
  subscribe(subscriber: ElementSubscriber) {
    if (this.subscriberList.indexOf(subscriber) === -1) {
      this.subscriberList.push(subscriber);
    }
  }

  publish(key: string, value: any) {
    console.error('start publish', key, value);
    console.error('subscriberList', this.subscriberList);
    this.subscriberList.forEach((subscriber) => {
      subscriber.publish(key, value);
    });
  }
}
