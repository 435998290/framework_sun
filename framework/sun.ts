import { SunType } from "./type";

export class Sun {
    data: {};
    constructor(sunObj: SunType) {
        this.data = sunObj.data || {};
        this.initData();
    }
    private initData() {
        console.log('start initData');
        Object.defineProperty(this, "data", {
                set: function (data: Object) {
                    console.log(data);
                }
            }
        )
    }
}