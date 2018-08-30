var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CalculatePonitXY = (function () {
    function CalculatePonitXY() {
        this.objectPool = new ObjectPool();
    }
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
        if (item.$children[1]) {
            height = item.$children[1].height;
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
                item = this.objectPool.createSkinObj(recycleNameList[j]);
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
        item = this.objectPool.createSkinObj(recycleName, monsterType);
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
                item = this.objectPool.createSkinObj(recycleNameList[0]);
                propItem = this.objectPool.createSkinObj(recycleNameList[1], item);
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
    // public recycleObj(obj,typeName){
    //     this.allPropsPool[typeName].push(obj);
    // }
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
        var roleObj = null;
        var random = Math.random();
        var isLeft = random > 0.5 ? false : true;
        var leftDistance = 0;
        var rightDistance = 0;
        if (listLength) {
            for (var i = 0; i < listLength; i++) {
                item = pointList[i];
                roleObj = item.roleObj;
                if (i < 4) {
                    roleObj.x = this.randomIsLeftRightX(stageW, roleObj.width, isLeft);
                    roleObj.y = preY - roleObj.height - this.setRandomDistance(item.maxDistance, item.minDistance);
                    isLeft = !isLeft;
                    preY = roleObj.y - this.checkIsHasChildHeight(roleObj);
                }
                else if (i >= 4) {
                    if (i === 4) {
                        roleObj.x = this.randomObjX(stageW, roleObj.width);
                        roleObj.y = preY - roleObj.height - this.setRandomDistance(item.maxDistance, item.minDistance);
                        leftDistance = roleObj.x;
                        rightDistance = stageW - roleObj.x - roleObj.width;
                    }
                    else {
                        if (leftDistance > rightDistance) {
                            roleObj.x = this.randomObjX(leftDistance, roleObj.width);
                            roleObj.y = preY - roleObj.height - this.setRandomDistance(item.maxDistance, item.minDistance);
                            preY = roleObj.y - this.checkIsHasChildHeight(roleObj);
                        }
                        else {
                            roleObj.x = this.randomMinX(rightDistance, pointList[4].roleObj.x + pointList[4].roleObj.width, roleObj.width);
                            roleObj.y = preY - roleObj.height - this.setRandomDistance(item.maxDistance, item.minDistance);
                            preY = roleObj.y - this.checkIsHasChildHeight(roleObj);
                        }
                    }
                }
            }
        }
        return pointList;
    };
    return CalculatePonitXY;
}());
__reflect(CalculatePonitXY.prototype, "CalculatePonitXY");
//# sourceMappingURL=CalculatePonitXY.js.map