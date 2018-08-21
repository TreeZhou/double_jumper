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
        // public propsClass:StagePropClass;
        _this.hasPropsStage = 3;
        _this.METER_STAGE_LIST = [
            {
                minHeight: 0,
                maxHeight: 600,
                distance: 30,
                pointRateList: [0.1, 0.7, 0.2, 0],
                singlePoprsRate: {
                    spring: 0,
                    trampoline: 0,
                    springShoes: 1,
                    wing: 0,
                    rocket: 0,
                    protectionCover: 0,
                    diamond: 0,
                    moreOneLife: 0
                },
                moreSticketRate: {
                    fixation: 0.7,
                    horizontal: 0.1,
                    hitDisable: 0.1,
                    oneceHit: 0.1
                },
                signleSticketRate: {
                    fixation: 0.9,
                    horizontal: 0.1,
                    hitDisable: 0,
                    oneceHit: 0
                },
            },
            {
                minHeight: 600,
                maxHeight: 2000,
                distance: 30,
                pointRateList: [0.1, 0.7, 0.2, 0],
                singlePoprsRate: {
                    spring: 0,
                    trampoline: 0,
                    springShoes: 1,
                    wing: 0,
                    rocket: 0,
                    protectionCover: 0,
                    diamond: 0,
                    moreOneLife: 0
                },
                moreSticketRate: {
                    fixation: 0.7,
                    horizontal: 0.1,
                    hitDisable: 0.1,
                    oneceHit: 0.1
                },
                signleSticketRate: {
                    fixation: 0.9,
                    horizontal: 0.1,
                    hitDisable: 0,
                    oneceHit: 0
                },
            },
            {
                minHeight: 2000,
                maxHeight: 5000,
                distance: 40,
                pointRateList: [0.2, 0.5, 0.2, 0.1],
                singlePoprsRate: {
                    spring: 0,
                    trampoline: 0.8,
                    springShoes: 0,
                    wing: 0.2,
                    rocket: 0,
                    protectionCover: 0,
                    diamond: 0,
                    moreOneLife: 0
                },
                moreSticketRate: {
                    fixation: 0.5,
                    horizontal: 0.3,
                    hitDisable: 0.1,
                    oneceHit: 0.1
                },
                signleSticketRate: {
                    fixation: 0.7,
                    horizontal: 0.2,
                    hitDisable: 0,
                    oneceHit: 0.1
                },
            },
            {
                minHeight: 5000,
                maxHeight: 10000,
                distance: 50,
                pointRateList: [0.2, 0.4, 0.2, 0.2],
                singlePoprsRate: {
                    spring: 0,
                    trampoline: 0.8,
                    springShoes: 0,
                    wing: 0.2,
                    rocket: 0,
                    protectionCover: 0,
                    diamond: 0,
                    moreOneLife: 0
                },
                moreSticketRate: {
                    fixation: 0.5,
                    horizontal: 0.3,
                    hitDisable: 0.1,
                    oneceHit: 0.1
                },
                signleSticketRate: {
                    fixation: 0.7,
                    horizontal: 0.2,
                    hitDisable: 0,
                    oneceHit: 0.1
                },
            },
        ];
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
        this.setCheckPoints = new SetCheckPoints();
    };
    /**
     * 计算当前这个屏跳板的间距
     */
    // public caculateStickDistance(nowStage) {
    // 	let distand = null;
    // 	let meter = nowStage * this.STAGE_METER;
    // 	let list = this.STICK_STAGE_DISTANSE;
    // 	let len = list.length;
    // 	for (let i = 0; i < len; i++) {
    // 		if (meter >= list[i].minHeight && meter <= list[i].maxHeight || i >= len - 1) {
    // 			distand = Math.ceil(Math.abs(Math.random() * (list[i].distance - this.minDistance)) + this.minDistance);
    // 			break;
    // 		}
    // 	}
    // 	return distand;
    // }
    /**
     * 根据当前阶段的道具各个数量设置对应出现的概率
    */
    // public getPropPercentName(nowStage,propsName) {
    // 	let propsObj = null;
    // 	let meter = nowStage * this.STAGE_METER;
    // 	let list = this.STICK_STAGE_DISTANSE;
    // 	let len = list.length;
    // 	let index = 0;
    // 	let getMyKey = null;
    // 	index = this.getNowPropIndex(nowStage);
    // 	propsObj = list[index][propsName];
    // 	getMyKey = this.getRandomKey(propsObj);
    // 	return getMyKey;
    // }
    // public getNowPropIndex(nowStage) {
    // 	let meter = nowStage * this.STAGE_METER;
    // 	let list = this.STICK_STAGE_DISTANSE;
    // 	let len = list.length;
    // 	let index = 0;
    // 	for (let i = 0; i < len; i++) {
    // 		if (meter >= list[i].minHeight && meter <= list[i].maxHeight || i >= len - 1) {
    // 			// propsObj = list[i].props;
    // 			index = i;
    // 			break;
    // 		}
    // 	}
    // 	return index;
    // }
    /**
     * 根据当前阶段的道具各个概率，获得道具的key 值，这个key值也是TYPE_STASTUS的值，如果为空，就是不设置道具
    */
    AllSticks.prototype.getRandomKey = function (percentageObj) {
        var randomNum = Math.random();
        var start = 0;
        var end = 0;
        var getMyKey = null;
        // debugger
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
    AllSticks.prototype.initSticket = function (groupBox) {
        var i = 0;
        var y = this.stage.$stageHeight;
        var pedalObj = null;
        var sticketObj = null;
        var list = this.setCheckPoints.fixtionStick({
            lastY: this.stage.$stageHeight,
            stageWidth: this.stage.$stageWidth,
            distance: 24,
            num: 20,
            keyName: 'fixation' // timing fixation
        });
        for (var i_1 = 0; i_1 < list.length; i_1++) {
            groupBox.addChild(list[i_1]);
            pedalObj = list[i_1];
            pedalObj.setStickTypeName(pedalObj.typeName);
            y = pedalObj.$y;
        }
        this.lastOneStickY = y - pedalObj.height;
        return groupBox;
    };
    // 当当前的最后那个跳板大于某个值，就创建下一屏的跳板
    AllSticks.prototype.addNewPetals = function (groupBox, playerMeter) {
        var i = 0;
        var y = 0;
        var pedalObj = null;
        var sticketObj = null;
        var fixtionList = [];
        var propsObj = null;
        var rateObj = null;
        if (this.lastOneStickY > (this.eachStageDistance + this.minDistance)) {
            this.preStickY = 0;
            rateObj = this.getNowStageItem(playerMeter);
            // nowStage++;
            if (!rateObj) {
                alert('概率对象为空');
                return;
            }
            var list = this.randomShowPoint(rateObj);
            for (var i_2 = 0; i_2 < list.length; i_2++) {
                groupBox.addChild(list[i_2]);
                if (list[i_2].resetIniData) {
                    list[i_2].resetIniData();
                }
                pedalObj = list[i_2];
                if (pedalObj.typeName) {
                    pedalObj.setStickTypeName(pedalObj.typeName);
                }
                y = pedalObj.$y;
            }
            this.lastOneStickY = y - pedalObj.height - 20;
        }
        // return nowStage;
    };
    AllSticks.prototype.getNowStageItem = function (playerMeter) {
        var list = this.METER_STAGE_LIST;
        var item = null;
        // console.log('对象的米数',playerMeter);
        if (list.length) {
            for (var i = 0; i < list.length; i++) {
                if (playerMeter >= list[i].minHeight && playerMeter < list[i].maxHeight || i === (list.length - 1)) {
                    item = list[i];
                    break;
                }
            }
        }
        return item;
    };
    AllSticks.prototype.getRateList = function (rateList) {
        var list = [];
        var num = 0;
        if (rateList.length) {
            for (var i = 0; i < rateList.length; i++) {
                num = num + rateList[i];
                list.push(num);
            }
        }
        return list;
    };
    // 随机关卡
    AllSticks.prototype.randomShowPoint = function (rateObj) {
        var randomNum = Math.random();
        var list = [];
        var rateTotalList = this.getRateList(rateObj.pointRateList);
        // console.log('随机',this.getSinglePropKey(rateObj.singlePoprsRate))
        if (randomNum > 0 && randomNum <= rateTotalList[0]) {
            list = this.setCheckPoints.setPropsAndStick({
                lastY: this.lastOneStickY,
                stageWidth: this.stage.$stageWidth,
                distance: rateObj.distance,
                propsName: this.getSinglePropKey(rateObj.singlePoprsRate),
                sticketName: 'fixation'
            });
        }
        else if (randomNum > rateTotalList[0] && randomNum <= rateTotalList[1]) {
            list = this.setCheckPoints.listSticket({
                lastY: this.lastOneStickY,
                stageWidth: this.stage.$stageWidth,
                distance: rateObj.distance,
                keyNameList: this.getMoreSticketKey(rateObj.moreSticketRate)
            });
        }
        else if (randomNum > rateTotalList[1] && randomNum <= rateTotalList[2]) {
            list = this.setCheckPoints.fixtionStick({
                lastY: this.lastOneStickY,
                stageWidth: this.stage.$stageWidth,
                distance: rateObj.distance,
                num: 6,
                keyName: this.getSinglePropKey(rateObj.signleSticketRate)
            });
        }
        else if (randomNum > rateTotalList[2] && randomNum <= rateTotalList[3]) {
            list = this.setCheckPoints.fixtionStick({
                lastY: this.lastOneStickY,
                stageWidth: this.stage.$stageWidth,
                distance: 50,
                num: 6,
                keyName: 'timing'
            });
        }
        else {
            list = this.setCheckPoints.listSticket({
                lastY: this.lastOneStickY,
                stageWidth: this.stage.$stageWidth,
                distance: rateObj.distance,
                keyNameList: this.getMoreSticketKey(rateObj.moreSticketRate)
            });
        }
        return list;
    };
    AllSticks.prototype.getMoreSticketKey = function (rateList) {
        var i = 0;
        var keyList = [];
        var keyItem = null;
        var rateNum = Math.floor(Math.random() * (Object.keys(rateList).length - 1)) + 1;
        if (rateNum >= rateList.length) {
            rateNum = rateList.length - 1;
        }
        while (i <= rateNum) {
            keyItem = this.getRandomKey(rateList);
            if (keyList.indexOf(keyItem) === -1) {
                keyList.push(keyItem);
                i++;
            }
        }
        // debugger
        return keyList;
    };
    AllSticks.prototype.getSinglePropKey = function (rateList) {
        var item = null;
        while (!item) {
            item = this.getRandomKey(rateList);
        }
        return item;
    };
    /**
     * 根据固定的跳板随机两个跳板设置概率性的道具
    */
    // private getFixtionSticket(fixtionList,nowStage,groupBox) {
    // 	let fixtionLen = fixtionList.length;
    // 	let num = this.STICK_STAGE_DISTANSE[this.getNowPropIndex(nowStage)].eachShowProps;
    // 	let stickList = [];
    // 	let randomNum=null;
    // 	let i = 0;
    // 	let getMyKey = null;
    // 	if(fixtionLen) {
    // 		num = Math.floor(Math.random()*(num-1))+1;
    // 		while(i<num && i<fixtionLen) {
    // 			randomNum = Math.floor(Math.random()*(fixtionLen-1));
    // 			if(stickList.indexOf(randomNum)===-1) {
    // 				stickList.push(randomNum);
    // 				i++;
    // 			}
    // 		}
    // 	}
    // 	for(let k=0;k<stickList.length;k++) {
    // 		getMyKey = this.getPropPercentName(nowStage,'props');
    // 		// console.log('12',getMyKey);
    // 		if(getMyKey) {
    // 			this.propsClass.setTypeStatus(getMyKey);
    // 			this.propsClass.addPropToStage(groupBox,fixtionList[stickList[k]]);
    // 			// this.STICK_STAGE_DISTANSE[propObj.stageIndex]['props'][propObj.getMyKey]--;
    // 		}
    // 	}
    // }
    // private setPropOnSticket(sticketObj,nowStage,groupBox){
    // 	let myKey = null;
    // 	let propsObj = null;
    // 	myKey = this.getPropPercentName(nowStage,'props');
    // 	if(myKey) {
    // 		this.propsClass.setTypeStatus(myKey);
    // 		propsObj = this.propsClass.addPropToStage(groupBox,sticketObj);
    // 	}
    // 	return propsObj;
    // }
    /**
     * 创建踏板对象
    */
    // public createSticket(nowStage:number,initY, num,groupBox:eui.Group) {
    // 	let stickObj = null;
    // 	let spring = null;
    // 	let distance = this.caculateStickDistance(nowStage);
    // 	let sticketHeight = 0;
    // 	let keyName = null;
    // 	stickObj =  this.createStick();   ///     Object.create(this.allPropsObjectPool['stickItem']);
    // 	keyName = this.getPropPercentName(nowStage,'sticketPercentage');
    // 	groupBox.addChild(stickObj);
    // 	stickObj.setStickTypeName(keyName);
    // 	sticketHeight=stickObj.height ? stickObj.height : 30;
    // 	stickObj.$y = initY - (distance + sticketHeight);
    // 	stickObj.$x = Math.random() * (this.stage.stageWidth - stickObj.width);
    // 	stickObj.meter = this.changeToMeter(stickObj.$y, nowStage);
    //     return {
    //         stickObj:stickObj,
    //         groupBox:groupBox
    //     };
    // }
    // private createStick(){
    // 	let item = null;
    // 	let propsList = this.stickRecyclePool;
    // 	if(propsList.length) {
    // 		item = propsList[0];
    // 		propsList.shift();
    // 	}else {
    // 		item = new StickItem();
    // 	}
    // 	return item;
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
            if (item.TYPE_STATUS === item.TYPE_TIMING && item.$y > this.stage.$stageHeight * 0.35 && !item.isPlayWood) {
                item.setTimingSticket(2000, function (thisItem) {
                    thisItem.visible = false;
                });
            }
        }
    };
    AllSticks.prototype.recycleAllObject = function (obj) {
        if (obj.TYPE_NAME) {
            // if(obj.TYPE_NAME === 'trampoline') {
            // 	this.setCheckPoints.recycleObj(obj,obj.TYPE_NAME);
            // }else if(obj.TYPE_NAME === 'wing'){
            // 	this.setCheckPoints.recycleObj(obj,obj.TYPE_NAME);
            // }else if(obj.TYPE_NAME === 'rocket'){
            // }else
            if (obj.TYPE_NAME === 'sticket') {
                this.setCheckPoints.recycleObj(obj, 'stickRecyclePool');
            }
            else if (obj.TYPE_NAME) {
                this.setCheckPoints.recycleObj(obj, obj.TYPE_NAME);
            }
        }
    };
    return AllSticks;
}(BasePage));
__reflect(AllSticks.prototype, "AllSticks");
//# sourceMappingURL=AllSticks.js.map