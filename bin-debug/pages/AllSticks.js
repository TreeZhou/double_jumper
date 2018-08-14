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
var AllSticks = (function (_super) {
    __extends(AllSticks, _super);
    function AllSticks() {
        var _this = _super.call(this) || this;
        _this.eachStageDistance = 30; // 每个阶段的间隔
        _this.minDistance = 30;
        _this.allStickList = [];
        // public stickList:eui.Group;
        // 每个阶段跳板的最大间距
        _this.STICK_STAGE_DISTANSE = [
            {
                minHeight: 0,
                maxHeight: 1000,
                distance: 40
            },
            {
                minHeight: 1001,
                maxHeight: 2000,
                distance: 50
            },
            {
                minHeight: 2001,
                maxHeight: 4000,
                distance: 60
            },
            {
                minHeight: 4001,
                maxHeight: 6000,
                distance: 70
            },
        ];
        return _this;
    }
    AllSticks.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    AllSticks.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.initStickData();
    };
    AllSticks.prototype.initStickData = function () {
        this.preStickY = this.stage.$stageHeight;
    };
    /**
     * 计算当前这个屏跳板的间距
     */
    AllSticks.prototype.caculateStickDistance = function (nowStage) {
        var distand = null;
        var meter = nowStage * this.STAGE_METER;
        var list = this.STICK_STAGE_DISTANSE;
        var len = list.length;
        for (var i = 0; i < len; i++) {
            if (meter >= list[i].minHeight && meter <= list[i].maxHeight || i >= len - 1) {
                distand = Math.ceil(Math.abs(Math.random() * (list[i].distance - this.minDistance)) + this.minDistance);
                break;
            }
        }
        return distand;
    };
    /**
     * 初始化第一屏的踏板的位置，随机为主
     */
    AllSticks.prototype.initSticket = function (groupBox, nowStage) {
        var i = 0;
        var y = this.stage.$stageHeight;
        var pedalObj = null;
        var sticketObj = null;
        while (y > 0) {
            sticketObj = this.createSticket(nowStage, this.preStickY, i, groupBox);
            pedalObj = sticketObj.stickObj;
            groupBox = sticketObj.groupBox;
            y = pedalObj.$y;
            this.preStickY = pedalObj.$y;
            i++;
        }
        this.lastOneStickY = y - pedalObj.height;
        console.log('最后的跳板', this.lastOneStickY, this.preStickY);
        return groupBox;
    };
    // 当当前的最后那个跳板大于某个值，就创建下一屏的跳板
    AllSticks.prototype.addNewPetals = function (groupBox, nowStage) {
        var i = 0;
        var y = 0;
        var pedalObj = null;
        var sticketObj = null;
        if (this.lastOneStickY > (this.eachStageDistance + this.minDistance)) {
            this.preStickY = 0;
            nowStage++;
            while (y > -this.stage.$stageHeight) {
                sticketObj = this.createSticket(nowStage, this.preStickY, i, groupBox);
                pedalObj = sticketObj.stickObj;
                groupBox = sticketObj.groupBox;
                y = pedalObj.$y;
                this.preStickY = pedalObj.$y;
                i++;
            }
            this.lastOneStickY = y - pedalObj.height;
        }
        return nowStage;
    };
    /**
     * 创建踏板对象
    */
    AllSticks.prototype.createSticket = function (nowStage, initY, num, groupBox) {
        var stickObj = null;
        var spring = null;
        var distance = this.caculateStickDistance(nowStage);
        stickObj = new StickItem();
        groupBox.addChild(stickObj);
        stickObj.$y = initY - (distance + stickObj.height);
        stickObj.$x = Math.random() * (this.stage.stageWidth - stickObj.width);
        // console.log('我的宽度和高度',stickObj.TYPE_STATUS,stickObj.width, stickObj.height);
        stickObj.meter = this.changeToMeter(stickObj.$y, nowStage);
        return {
            stickObj: stickObj,
            groupBox: groupBox
        };
    };
    // private stickMove() {
    // 	let list = this.stickList.$children;
    // 	let springList = this.springList.$children;
    // 	let springLen = springList.length;
    // 	let len = list.length;
    // 	let item, springItem;
    // 	let speed;
    // 	speed = this.player.nowSpeed;
    // 	for (let i = 0; i < len; i++) {
    // 		item = list[i];
    // 		item.$y = item.$y + speed;     // this.frameNum
    // 	}
    // 	for (let j = 0; j < springLen; j++) {
    // 		springItem = springList[j];
    // 		springItem.$y = springItem.$y + speed;
    // 	}
    // 	this.lastPetalY = this.lastPetalY + speed;
    // }
    AllSticks.prototype.stickMoveLeftAndRight = function (allStickList) {
        var list = allStickList;
        var len = list.length;
        var item;
        for (var i = 0; i < len; i++) {
            item = list[i];
            if (item.TYPE_STATUS === item.TYPE_HORIZONTAL) {
                item.leftAndRightMove();
            }
        }
    };
    return AllSticks;
}(BasePage));
__reflect(AllSticks.prototype, "AllSticks");
//# sourceMappingURL=AllSticks.js.map