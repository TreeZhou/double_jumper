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
            wingProp: Wing
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
            wingProp: []
        };
    }
    CalculatePonitXY.prototype.createSkinObj = function (recycleName, fatherObj) {
        var item = null;
        var propsList = this.allPropsPool[recycleName];
        var objClass = this.allPropsClass[recycleName];
        if (propsList.length) {
            item = this.allPropsPool[recycleName][0];
            this.allPropsPool[recycleName].shift();
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
    CalculatePonitXY.prototype.setRandomDistance = function (maxDiastance, minDistance) {
        var random = Math.ceil(Math.abs(Math.random() * (maxDiastance - minDistance)) + minDistance);
        return random;
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
                preY = item.roleObj.y;
            }
        }
        return pointList;
    };
    return CalculatePonitXY;
}());
__reflect(CalculatePonitXY.prototype, "CalculatePonitXY");
//# sourceMappingURL=CalculatePonitXY.js.map