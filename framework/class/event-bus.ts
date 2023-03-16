import { DataPublisher } from "./data-publisher";
import { ElementSubscriber } from "./element-subscriber";

export class EventBus {
    private subscribeMap = new Map<DataPublisher, Array<ElementSubscriber>>();
    subscribe(subscriber: ElementSubscriber, publisher: DataPublisher): void {
        let subscribeArray = this.subscribeMap.get(publisher);
        if(!subscribeArray) {
            this.subscribeMap.set(publisher, []);
            subscribeArray = this.subscribeMap.get(publisher);
        }
        if(subscribeArray.indexOf(subscriber) !== -1) { return; };
        subscribeArray.push(subscriber);
    }

    publish(publisher: DataPublisher, data: any): void {
        const subscribeArray = this.subscribeMap.get(publisher);
        subscribeArray.forEach( (subscriber: ElementSubscriber) => {
            subscriber.publish(data);
        })
    }
}