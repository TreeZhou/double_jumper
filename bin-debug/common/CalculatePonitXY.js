var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CalculatePonitXY = (function () {
    function CalculatePonitXY() {
        this.allPropsClass = {
            woodSticket: WoodSticket,
            waterSticket: WaterSticket,
            normalSticket: NormalSticket,
            leafSticket: LeafSticket,
            cloudSticket: CloudSticket,
            monsterProp: Monster,
            mushroomProp: Mushroom,
            rocketProp: Rocket,
            spiderWebProp: SpiderWeb,
            springProp: Spring,
            springShoeProp: SpringShoe,
            wingProp: Wing,
            protectionProp: ProtectionProp,
            bulletProp: Bullet
        };
        this.allPropsPool = {
            woodSticket: [],
            waterSticket: [],
            normalSticket: [],
            leafSticket: [],
            cloudSticket: [],
            monsterProp: [],
            mushroomProp: [],
            rocketProp: [],
            spiderWebProp: [],
            springProp: [],
            springShoeProp: [],
            wingProp: [],
            protectionProp: [],
            bulletProp: []
        };
    }
    CalculatePonitXY.prototype.createSkinObj = function (recycleName, fatherObj) {
        var item = null;
        var propsList = this.allPropsPool[recycleName];
        var objClass = this.allPropsClass[recycleName];
        if (this.allPropsPool[recycleName].length) {
            item = this.allPropsPool[recycleName][0];
            this.allPropsPool[recycleName].shift();
            item.resertData();
        }
        else {
            if (fatherObj) {
                item = new objClass(fatherObj);
            }
            else {
                item = new objClass();
            }
        }
        return item;
    };
    CalculatePonitXY.prototype.randomObjX = function (stageWidth, objWidth) {
        var randomX = 0;
        randomX = Math.random() * (stageWidth - objWidth);
        return randomX;
    };
    CalculatePonitXY.prototype.randomMinX = function (distanceW, minW, objWidth) {
        var randomX = 0;
        randomX = Math.random() * (distanceW - objWidth) + minW;
        return randomX;
    };
    CalculatePonitXY.prototype.randomIsLeftRightX = function (stageWidth, objWidth, isLeft) {
        var randomX = 0;
        if (isLeft) {
            randomX = Math.random() * (stageWidth / 2 - objWidth);
        }
        else {
            randomX = Math.random() * (stageWidth / 2 - objWidth) + stageWidth / 2;
        }
        return randomX;
    };
    CalculatePonitXY.prototype.setRandomDistance = function (maxDiastance, minDistance) {
        var random = Math.ceil(Math.abs(Math.random() * (maxDiastance - minDistance)) + minDistance);
        return random;
    };
    CalculatePonitXY.prototype.checkIsHasChildHeight = function (item) {
        var height = 0;
        // console.log('高度1',item);
        if (item.$children[1]) {
            height = item.$children[1].height;
            // console.log('高度2',height);
        }
        return height;
    };
    /**
     * 创建跳板和道具对象，存入数组
     */
    CalculatePonitXY.prototype.getCreateClassList = function (recycleNameList, createNum, maxDiastance, minDistance) {
        var list = [];
        var item = null;
        for (var i = 0; i < createNum; i++) {
            for (var j = 0; j < recycleNameList.length; j++) {
                item = this.createSkinObj(recycleNameList[j]);
                list.push({
                    roleObj: item,
                    maxDistance: maxDiastance,
                    minDistance: minDistance
                });
            }
        }
        return list;
    };
    /**
     * 创建怪兽的对象
     */
    CalculatePonitXY.prototype.createMonster = function (recycleName, monsterType, maxDiastance, minDistance) {
        var list = [];
        var item = null;
        item = this.createSkinObj(recycleName, monsterType);
        list.push({
            roleObj: item,
            maxDistance: maxDiastance,
            minDistance: minDistance
        });
        return list;
    };
    /**
     * 单个跳板和单个道具的结合
     */
    CalculatePonitXY.prototype.singleSticketAndProp = function (recycleNameList, createNum, maxDiastance, minDistance) {
        var listLength = recycleNameList.length;
        var item = null;
        var propItem = null;
        var list = [];
        if (listLength) {
            for (var i = 0; i < createNum; i++) {
                item = this.createSkinObj(recycleNameList[0]);
                propItem = this.createSkinObj(recycleNameList[1], item);
                item.addChild(propItem);
                list.push({
                    roleObj: item,
                    maxDistance: maxDiastance,
                    minDistance: minDistance
                });
            }
        }
        return list;
    };
    /**
     * 存入回收的数据
     */
    CalculatePonitXY.prototype.recycleObj = function (obj, typeName) {
        this.allPropsPool[typeName].push(obj);
    };
    /**
     *设计关卡点的XY
     */
    /**
     *随机位置的关卡点
      pointList:[{
        roleObj:any,
        maxDistance:number,
        minDistance:number
    }]
     */
    CalculatePonitXY.prototype.randomPointXY = function (pointList, lastY, stageW) {
        var listLength = pointList.length;
        var preY = lastY;
        var item = null;
        if (listLength) {
            for (var i = 0; i < listLength; i++) {
                item = pointList[i];
                item.roleObj.x = this.randomObjX(stageW, item.roleObj.width);
                item.roleObj.y = preY - item.roleObj.height - this.setRandomDistance(item.maxDistance, item.minDistance);
                preY = item.roleObj.y - this.checkIsHasChildHeight(item.roleObj);
            }
        }
        return pointList;
    };
    /**
     * 左右左右的位置关卡点
     */
    CalculatePonitXY.prototype.leftAndRightPointXY = function (pointList, lastY, stageW) {
        var listLength = pointList.length;
        var preY = lastY;
        var item = null;
        var random = Math.random();
        var isLeft = random > 0.5 ? false : true;
        if (listLength) {
            for (var i = 0; i < listLength; i++) {
                item = pointList[i];
                item.roleObj.x = this.randomIsLeftRightX(stageW, item.roleObj.width, isLeft);
                item.roleObj.y = preY - item.roleObj.height - this.setRandomDistance(item.maxDistance, item.minDistance);
                preY = item.roleObj.y - this.checkIsHasChildHeight(item.roleObj);
                console.log(item.roleObj.height);
                isLeft = !isLeft;
            }
        }
        return pointList;
    };
    /**
     * 怪兽关卡点
     */
    CalculatePonitXY.prototype.monsterOne = function (pointList, lastY, stageW) {
        var listLength = pointList.length;
        var preY = lastY;
        var item = null;
        var random = Math.random();
        var isLeft = random > 0.5 ? false : true;
        var leftDistance = 0;
        var rightDistance = 0;
        if (listLength) {
            for (var i = 0; i < listLength; i++) {
                item = pointList[i];
                if (i < 4) {
                    item.roleObj.x = this.randomIsLeftRightX(stageW, item.roleObj.width, isLeft);
                    item.roleObj.y = preY - item.roleObj.height - this.setRandomDistance(item.maxDistance, item.minDistance);
                    isLeft = !isLeft;
                    preY = item.roleObj.y - this.checkIsHasChildHeight(item.roleObj);
                }
                else if (i >= 4) {
                    if (i === 4) {
                        item.roleObj.x = this.randomObjX(stageW, item.roleObj.width);
                        item.roleObj.y = preY - item.roleObj.height - this.setRandomDistance(item.maxDistance, item.minDistance);
                        leftDistance = item.roleObj.x;
                        rightDistance = stageW - item.roleObj.x - item.roleObj.width;
                    }
                    else {
                        if (leftDistance > rightDistance) {
                            item.roleObj.x = this.randomObjX(leftDistance, item.roleObj.width);
                            item.roleObj.y = preY - item.roleObj.height - this.setRandomDistance(item.maxDistance, item.minDistance);
                            preY = item.roleObj.y - this.checkIsHasChildHeight(item.roleObj);
                        }
                        else {
                            item.roleObj.x = this.randomMinX(rightDistance, pointList[4].roleObj.x + pointList[4].roleObj.width, item.roleObj.width);
                            item.roleObj.y = preY - item.roleObj.height - this.setRandomDistance(item.maxDistance, item.minDistance);
                            preY = item.roleObj.y - this.checkIsHasChildHeight(item.roleObj);
                        }
                    }
                }
                // if(i>3) {
                //     item.roleObj.x = this.randomIsLeftRightX(stageW,pointList[4].roleObj.x +pointList[4].roleObj.width,item.roleObj.width,isLeft);
                // }else {
                //     item.roleObj.x = this.randomIsLeftRightX(stageW,stageW/2,item.roleObj.width,isLeft);
                // }
                // item.roleObj.y = preY - item.roleObj.height - this.setRandomDistance(item.maxDistance,item.minDistance);
                // if(i!=4) {
                //     preY = item.roleObj.y-this.checkIsHasChildHeight(item.roleObj);
                // }
                // if(i<=4||item.roleObj.y<pointList[4].roleObj.y) {
                //     isLeft = !isLeft;
                // }
            }
        }
        return pointList;
    };
    return CalculatePonitXY;
}());
__reflect(CalculatePonitXY.prototype, "CalculatePonitXY");
//# sourceMappingURL=CalculatePonitXY.js.map