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
        _this.stickRecyclePool = [];
        _this.hasPropsStage = 3;
        // public stickList:eui.Group;
        // 每个阶段跳板的最大间距
        _this.STICK_STAGE_DISTANSE = [
            {
                minHeight: 0,
                maxHeight: 400,
                distance: 24,
                eachShowProps: 3,
                props: {
                    spring: 0,
                    trampoline: 0,
                    springShoe: 0,
                    wing: 0,
                    rocket: 0,
                    protectionCover: 0,
                    diamond: 0,
                    moreOneLife: 0
                },
                // propsPercentage:{},
                sticketPercentage: {
                    fixation: 0.9,
                    horizontal: 0,
                    hitDisable: 0.1,
                    oneceHit: 0
                }
            },
            {
                minHeight: 601,
                maxHeight: 1000,
                distance: 30,
                eachShowProps: 3,
                props: {
                    spring: 0,
                    trampoline: 0.8,
                    springShoe: 0,
                    wing: 0.2,
                    rocket: 0,
                    protectionCover: 0,
                    diamond: 0,
                    moreOneLife: 0
                },
                // propsPercentage:{},
                sticketPercentage: {
                    fixation: 0.8,
                    horizontal: 0.1,
                    hitDisable: 0.1,
                    oneceHit: 0
                }
            },
            {
                minHeight: 1001,
                maxHeight: 2000,
                distance: 40,
                eachShowProps: 3,
                props: {
                    spring: 0,
                    trampoline: 0.6,
                    springShoe: 0,
                    wing: 0.3,
                    rocket: 0.1,
                    protectionCover: 0,
                    diamond: 0,
                    moreOneLife: 0
                },
                // propsPercentage:{},
                sticketPercentage: {
                    fixation: 0.6,
                    horizontal: 0.1,
                    hitDisable: 0.1,
                    oneceHit: 0.2
                }
            },
            {
                minHeight: 2001,
                maxHeight: 4000,
                distance: 50,
                eachShowProps: 3,
                props: {
                    spring: 0,
                    trampoline: 0.5,
                    springShoe: 0,
                    wing: 0.3,
                    rocket: 0.2,
                    protectionCover: 0,
                    diamond: 0,
                    moreOneLife: 0
                },
                // propsPercentage:{},
                sticketPercentage: {
                    fixation: 0.5,
                    horizontal: 0.2,
                    hitDisable: 0.1,
                    oneceHit: 0.2
                }
            },
            {
                minHeight: 4001,
                maxHeight: 6000,
                distance: 60,
                eachShowProps: 3,
                props: {
                    spring: 0,
                    trampoline: 0.2,
                    springShoe: 0,
                    wing: 0.5,
                    rocket: 0.3,
                    protectionCover: 0,
                    diamond: 0,
                    moreOneLife: 0
                },
                // propsPercentage:{},
                sticketPercentage: {
                    fixation: 0.4,
                    horizontal: 0.3,
                    hitDisable: 0.1,
                    oneceHit: 0.2
                }
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
        this.hasPropsStage = 3;
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
    AllSticks.prototype.getPropPercentName = function (nowStage, propsName) {
        var propsObj = null;
        var meter = nowStage * this.STAGE_METER;
        var list = this.STICK_STAGE_DISTANSE;
        var len = list.length;
        var index = 0;
        var getMyKey = null;
        index = this.getNowPropIndex(nowStage);
        propsObj = list[index][propsName];
        getMyKey = this.getRandomKey(propsObj);
        return getMyKey;
    };
    AllSticks.prototype.getNowPropIndex = function (nowStage) {
        var meter = nowStage * this.STAGE_METER;
        var list = this.STICK_STAGE_DISTANSE;
        var len = list.length;
        var index = 0;
        for (var i = 0; i < len; i++) {
            if (meter >= list[i].minHeight && meter <= list[i].maxHeight || i >= len - 1) {
                // propsObj = list[i].props;
                index = i;
                break;
            }
        }
        return index;
    };
    /**
     * 根据当前阶段的道具各个概率，获得道具的key 值，这个key值也是TYPE_STASTUS的值，如果为空，就是不设置道具
    */
    AllSticks.prototype.getRandomKey = function (percentageObj) {
        var randomNum = Math.random();
        var start = 0;
        var end = 0;
        var getMyKey = null;
        for (var key in percentageObj) {
            // console.log('概率',start,end);
            end = start + percentageObj[key];
            if (randomNum > start && randomNum <= end) {
                getMyKey = key;
                break;
            }
            start = end;
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
        var sticket = new SetCheckPoints();
        var list = sticket.fixtionStick({
            lastY: this.stage.$stageHeight,
            stageWidth: this.stage.$stageWidth,
            distance: 24,
            num: 20
        });
        // while (y > 0) {
        //     sticketObj = this.createSticket(nowStage,this.preStickY, i,groupBox);
        //     pedalObj = sticketObj.stickObj;
        //     groupBox = sticketObj.groupBox;
        // 	y = pedalObj.$y;
        // 	this.preStickY = pedalObj.$y;
        // 	i++;
        // }
        for (var i_1 = 0; i_1 < list.length; i_1++) {
            groupBox.addChild(list[i_1]);
            pedalObj = list[i_1];
            pedalObj.setStickTypeName(pedalObj.typeName);
            console.log('pedalObj', pedalObj.$y, pedalObj.height, this.stage.$stageHeight);
            y = pedalObj.$y;
        }
        this.lastOneStickY = y - pedalObj.height;
        // console.log('最后的跳板',this.lastOneStickY ,this.preStickY)
        return groupBox;
    };
    // 当当前的最后那个跳板大于某个值，就创建下一屏的跳板
    AllSticks.prototype.addNewPetals = function (groupBox, nowStage) {
        var i = 0;
        var y = 0;
        var pedalObj = null;
        var sticketObj = null;
        var fixtionList = [];
        var propsObj = null;
        if (this.lastOneStickY > (this.eachStageDistance + this.minDistance)) {
            this.preStickY = 0;
            nowStage++;
            while (y > -this.stage.$stageHeight) {
                sticketObj = this.createSticket(nowStage, this.preStickY, i, groupBox);
                pedalObj = sticketObj.stickObj;
                groupBox = sticketObj.groupBox;
                y = pedalObj.$y;
                this.preStickY = pedalObj.$y;
                if (pedalObj.TYPE_STATUS === pedalObj.TYPE_FIXATION && nowStage === this.hasPropsStage) {
                    propsObj = this.setPropOnSticket(pedalObj, nowStage, groupBox);
                    if (propsObj) {
                        pedalObj.$y = pedalObj.$y - propsObj.DOWN_DISTANCE;
                        propsObj.$y = propsObj.$y - propsObj.DOWN_DISTANCE;
                        pedalObj.meter = this.changeToMeter(pedalObj.$y, nowStage);
                        y = propsObj.$y - propsObj.UP_DISTANCE;
                        this.preStickY = y;
                        this.hasPropsStage++;
                    }
                }
                i++;
            }
            // this.getFixtionSticket(fixtionList,nowStage,groupBox);
            this.lastOneStickY = y - pedalObj.height;
        }
        return nowStage;
    };
    /**
     * 根据固定的跳板随机两个跳板设置概率性的道具
    */
    AllSticks.prototype.getFixtionSticket = function (fixtionList, nowStage, groupBox) {
        var fixtionLen = fixtionList.length;
        var num = this.STICK_STAGE_DISTANSE[this.getNowPropIndex(nowStage)].eachShowProps;
        var stickList = [];
        var randomNum = null;
        var i = 0;
        var getMyKey = null;
        if (fixtionLen) {
            num = Math.floor(Math.random() * (num - 1)) + 1;
            while (i < num && i < fixtionLen) {
                randomNum = Math.floor(Math.random() * (fixtionLen - 1));
                if (stickList.indexOf(randomNum) === -1) {
                    stickList.push(randomNum);
                    i++;
                }
            }
        }
        for (var k = 0; k < stickList.length; k++) {
            getMyKey = this.getPropPercentName(nowStage, 'props');
            // console.log('12',getMyKey);
            if (getMyKey) {
                this.propsClass.setTypeStatus(getMyKey);
                this.propsClass.addPropToStage(groupBox, fixtionList[stickList[k]]);
                // this.STICK_STAGE_DISTANSE[propObj.stageIndex]['props'][propObj.getMyKey]--;
            }
        }
    };
    AllSticks.prototype.setPropOnSticket = function (sticketObj, nowStage, groupBox) {
        var myKey = null;
        var propsObj = null;
        myKey = this.getPropPercentName(nowStage, 'props');
        if (myKey) {
            this.propsClass.setTypeStatus(myKey);
            propsObj = this.propsClass.addPropToStage(groupBox, sticketObj);
        }
        return propsObj;
    };
    /**
     * 创建踏板对象
    */
    AllSticks.prototype.createSticket = function (nowStage, initY, num, groupBox) {
        var stickObj = null;
        var spring = null;
        var distance = this.caculateStickDistance(nowStage);
        var sticketHeight = 0;
        var keyName = null;
        stickObj = this.createStick(); ///     Object.create(this.allPropsObjectPool['stickItem']);
        keyName = this.getPropPercentName(nowStage, 'sticketPercentage');
        groupBox.addChild(stickObj);
        stickObj.setStickTypeName(keyName);
        sticketHeight = stickObj.height ? stickObj.height : 30;
        stickObj.$y = initY - (distance + sticketHeight);
        stickObj.$x = Math.random() * (this.stage.stageWidth - stickObj.width);
        stickObj.meter = this.changeToMeter(stickObj.$y, nowStage);
        return {
            stickObj: stickObj,
            groupBox: groupBox
        };
    };
    AllSticks.prototype.createStick = function () {
        var item = null;
        var propsList = this.stickRecyclePool;
        if (propsList.length) {
            item = propsList[0];
            propsList.shift();
        }
        else {
            item = new StickItem();
        }
        return item;
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
    AllSticks.prototype.recycleAllObject = function (obj) {
        if (obj.TYPE_NAME) {
            if (obj.TYPE_NAME === 'trampoline') {
                this.recycleObj(obj, this.propsClass.allPropsPool[obj.TYPE_NAME]);
            }
            else if (obj.TYPE_NAME === 'wing') {
                this.recycleObj(obj, this.propsClass.allPropsPool[obj.TYPE_NAME]);
            }
            else if (obj.TYPE_NAME === 'rocket') {
                this.recycleObj(obj, this.propsClass.allPropsPool[obj.TYPE_NAME]);
            }
            else if (obj.TYPE_NAME === 'sticket') {
                this.recycleObj(obj, this.stickRecyclePool);
            }
        }
    };
    return AllSticks;
}(BasePage));
__reflect(AllSticks.prototype, "AllSticks");
//# sourceMappingURL=AllSticks.js.map