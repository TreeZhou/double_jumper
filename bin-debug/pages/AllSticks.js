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
        _this.minDistance = 40;
        _this.allStickList = [];
        // public stickList:eui.Group;
        // 每个阶段跳板的最大间距
        _this.STICK_STAGE_DISTANSE = [
            {
                minHeight: 0,
                maxHeight: 1000,
                distance: 50,
                props: {
                    spring: 0,
                    trampoline: 5,
                    springShoe: 0,
                    bambooFly: 5,
                    rocketShip: 0,
                    protectionCover: 0,
                    diamond: 0,
                    moreOneLife: 0
                },
                propsPercentage: {}
            },
            {
                minHeight: 1001,
                maxHeight: 2000,
                distance: 60,
                props: {
                    spring: 0,
                    trampoline: 2,
                    springShoe: 0,
                    bambooFly: 5,
                    rocketShip: 1,
                    protectionCover: 0,
                    diamond: 0,
                    moreOneLife: 0
                },
                propsPercentage: {}
            },
            {
                minHeight: 2001,
                maxHeight: 4000,
                distance: 70,
                props: {
                    spring: 0,
                    trampoline: 2,
                    springShoe: 0,
                    bambooFly: 5,
                    rocketShip: 1,
                    protectionCover: 0,
                    diamond: 0,
                    moreOneLife: 0
                },
                propsPercentage: {}
            },
            {
                minHeight: 4001,
                maxHeight: 6000,
                distance: 70,
                props: {
                    spring: 0,
                    trampoline: 10,
                    springShoe: 0,
                    bambooFly: 2,
                    rocketShip: 2,
                    protectionCover: 0,
                    diamond: 0,
                    moreOneLife: 0
                },
                propsPercentage: {}
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
        this.propsClass = new StagePropClass();
        this.addChild(this.propsClass);
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
     * 根据当前阶段的道具各个数量设置对应出现的概率
    */
    AllSticks.prototype.caculatePropPercent = function (nowStage) {
        var propsObj = null;
        var meter = nowStage * this.STAGE_METER;
        var list = this.STICK_STAGE_DISTANSE;
        var len = list.length;
        var index = 0;
        var totalMumber = 0;
        var getMyKey = null;
        for (var i = 0; i < len; i++) {
            if (meter >= list[i].minHeight && meter <= list[i].maxHeight || i >= len - 1) {
                // propsObj = list[i].props;
                index = i;
                break;
            }
        }
        for (var key in list[index].props) {
            totalMumber += list[index].props[key];
        }
        for (var key in list[index].props) {
            list[index]['propsPercentage'][key] = list[index].props[key] / totalMumber;
        }
        getMyKey = this.getRandomPropKey(list[index]['propsPercentage']);
        return {
            stageIndex: index,
            getMyKey: getMyKey
        };
    };
    /**
     * 根据当前阶段的道具各个概率，获得道具的key 值，这个key值也是TYPE_STASTUS的值，如果为空，就是不设置道具
    */
    AllSticks.prototype.getRandomPropKey = function (percentageObj) {
        var randomNum = Math.random();
        var start = 0;
        var end = 0;
        var getMyKey = null;
        for (var key in percentageObj) {
            end = start + percentageObj[key];
            if (randomNum > start && randomNum <= end) {
                getMyKey = key;
                break;
            }
            start = start + end;
        }
        return getMyKey;
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
        var fixtionList = [];
        if (this.lastOneStickY > (this.eachStageDistance + this.minDistance)) {
            this.preStickY = 0;
            nowStage++;
            while (y > -this.stage.$stageHeight) {
                sticketObj = this.createSticket(nowStage, this.preStickY, i, groupBox);
                pedalObj = sticketObj.stickObj;
                groupBox = sticketObj.groupBox;
                y = pedalObj.$y;
                this.preStickY = pedalObj.$y;
                if (pedalObj.TYPE_STATUS === pedalObj.TYPE_FIXATION) {
                    fixtionList.push(pedalObj);
                }
                i++;
            }
            this.getFixtionSticket(fixtionList, nowStage, groupBox);
            this.lastOneStickY = y - pedalObj.height;
        }
        return nowStage;
    };
    /**
     * 根据固定的跳板随机两个跳板设置概率性的道具
    */
    AllSticks.prototype.getFixtionSticket = function (fixtionList, nowStage, groupBox) {
        var fixtionLen = fixtionList.length;
        var num = 2;
        var stickList = [];
        var randomNum = null;
        var i = 0;
        var propObj = null;
        if (fixtionLen) {
            while (i < num && i < fixtionLen) {
                randomNum = Math.floor(Math.random() * (fixtionLen - 1));
                if (stickList.indexOf(randomNum) === -1) {
                    stickList.push(randomNum);
                    i++;
                }
            }
        }
        for (var k = 0; k < stickList.length; k++) {
            propObj = this.caculatePropPercent(nowStage);
            if (propObj.getMyKey) {
                this.propsClass.setTypeStatus(propObj.getMyKey);
                this.propsClass.addPropToStage(groupBox, fixtionList[stickList[k]]);
                // this.STICK_STAGE_DISTANSE[propObj.stageIndex]['props'][propObj.getMyKey]--;
            }
        }
    };
    /**
     * 创建踏板对象
    */
    AllSticks.prototype.createSticket = function (nowStage, initY, num, groupBox) {
        var stickObj = null;
        var spring = null;
        var distance = this.caculateStickDistance(nowStage);
        var sticketHeight = 0;
        stickObj = new StickItem();
        groupBox.addChild(stickObj);
        sticketHeight = stickObj.height ? stickObj.height : 30;
        stickObj.$y = initY - (distance + sticketHeight);
        stickObj.$x = Math.random() * (this.stage.stageWidth - stickObj.width);
        stickObj.meter = this.changeToMeter(stickObj.$y, nowStage);
        // if(stickObj.TYPE_STATUS === stickObj.TYPE_FIXATION) {
        // 	this.propsClass.addPropToStage(groupBox,stickObj);
        // }
        return {
            stickObj: stickObj,
            groupBox: groupBox
        };
    };
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