var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var BasePage = (function (_super) {
    __extends(BasePage, _super);
    function BasePage() {
        var _this = _super.call(this) || this;
        _this.STAGE_METER = 200; // 一屏等于多少米
        return _this;
    }
    // public imgH:number = 0;
    BasePage.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    /**
     * 像素更换成多少米
    */
    BasePage.prototype.changeToMeter = function (y, stage) {
        var meterNum = null;
        if (y > 0) {
            meterNum = (this.stage.$stageHeight - y) / this.stage.$stageHeight * this.STAGE_METER + (stage - 1) * this.STAGE_METER;
        }
        else {
            meterNum = (Math.abs(y)) / this.stage.$stageHeight * this.STAGE_METER + stage * this.STAGE_METER;
        }
        return meterNum;
    };
    BasePage.prototype.doodleChangeToMeter = function (y) {
        var num = 0;
        num = Math.ceil((y / this.stage.$stageHeight) * this.STAGE_METER);
        return num;
    };
    /**
     * 米换成像素
     */
    BasePage.prototype.changeToPixel = function (meter) {
        var pixel = 0;
        var stage = meter / this.STAGE_METER;
        pixel = stage * this.stage.$stageHeight;
        return pixel;
    };
    // 检查是否超过屏幕底线，是的话就移除该对象
    // public checkISOverStage(fatherBox,callback:Function) {
    // 	let list = fatherBox.$children;
    // 	let len = list.length;
    // 	let item;
    // 	let removeChildList = [];
    // 	let nowLen, nowList;
    // 	for (let i = 0; i < len; i++) {
    // 		item = list[i];
    // 		if (item.$y >= this.stage.$stageHeight) {
    // 			removeChildList.push(item);
    // 		}
    // 	}
    // 	if (removeChildList.length) {
    // 		for (let j = 0; j < removeChildList.length; j++) {
    // 			if (removeChildList[j]) {
    // 				fatherBox.removeChild(removeChildList[j]);
    // 				callback(removeChildList[j]);
    // 			}
    // 		}
    // 	}
    //     return fatherBox;
    // }
    /**
     * 随机出传入数组中的一个值
     */
    BasePage.prototype.randomShowSameType = function (list) {
        var len = list.length;
        var randomNum, item;
        if (!len) {
            alert('随机的跳板数组长度不对!');
            return;
        }
        if (len === 1) {
            item = list[0];
        }
        else {
            randomNum = Math.floor(Math.random() * len);
            if (randomNum >= len) {
                randomNum = len - 1;
            }
            else if (randomNum < 0) {
                randomNum = 0;
            }
            item = list[randomNum];
        }
        return item;
    };
    return BasePage;
}(eui.Component));
__reflect(BasePage.prototype, "BasePage");
