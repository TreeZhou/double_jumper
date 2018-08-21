var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SetCheckPoints = (function () {
    function SetCheckPoints() {
        this.minDistance = 30;
        // public stickRecyclePool:any=[];
        this.stickHeightWidth = {
            'fixation': {
                height: 32,
                width: 126
            },
            'hitDisable': {
                height: 32,
                width: 126
            },
            'horizontal': {
                height: 33,
                width: 136
            },
            'oneceHit': {
                height: 32,
                width: 126
            },
            'timing': {
                height: 32,
                width: 126
            },
            'trampoline': {
                height: 18,
                width: 49
            },
            'wing': {
                height: 65,
                width: 54
            },
            'rocket': {
                height: 62,
                width: 56
            },
            'springShoes': {
                width: 60,
                height: 32
            },
            'smallMonster': {
                width: 237,
                height: 161
            },
            'bigMonster': {
                width: 286,
                height: 321
            },
        };
        this.skinPropData = {
            'trampoline': Trampoline,
            'wing': WingProp,
            'rocket': RocketProp,
            'sticket': StickItem,
            'springShoes': SpringShoesProp,
            'bigMonster': MonsterProp,
            'smallMonster': MonsterProp
        };
        this.allPropsPool = {
            'trampoline': [],
            'wing': [],
            'rocket': [],
            'stickRecyclePool': [],
            'springShoes': []
        };
    }
    // 关卡函数
    SetCheckPoints.prototype.fixtionStick = function (obj) {
        var list = [];
        var perY = obj.lastY;
        var keyName = obj.keyName;
        var objHeight = this.stickHeightWidth[keyName].height;
        var objWidth = this.stickHeightWidth[keyName].width;
        for (var i = 0; i < obj.num; i++) {
            var item = this.createOneStick({
                distance: obj.distance,
                perY: perY,
                objHeight: objHeight,
                stageWidth: obj.stageWidth,
                objWidth: objWidth,
                keyName: keyName
            });
            perY = item.$y;
            list.push(item);
        }
        return list;
    };
    SetCheckPoints.prototype.listSticket = function (obj) {
        var list = [];
        var perY = obj.lastY;
        var keyNameLength = obj.keyNameList.length;
        for (var i = 0; i < keyNameLength; i++) {
            var keyName = obj.keyNameList[i];
            var objHeight = this.stickHeightWidth[keyName].height;
            var objWidth = this.stickHeightWidth[keyName].width;
            var item = this.createOneStick({
                distance: obj.distance,
                perY: perY,
                objHeight: objHeight,
                stageWidth: obj.stageWidth,
                objWidth: objWidth,
                keyName: keyName
            });
            perY = item.$y;
            list.push(item);
        }
        return list;
    };
    SetCheckPoints.prototype.setPropsAndStick = function (obj) {
        var list = [];
        var objHeight = this.stickHeightWidth[obj.sticketName].height;
        var objWidth = this.stickHeightWidth[obj.sticketName].width;
        var item = this.createOneStick({
            distance: obj.distance,
            perY: obj.lastY,
            objHeight: objHeight,
            stageWidth: obj.stageWidth,
            objWidth: objWidth,
            keyName: obj.sticketName
        });
        var propItem = this.addPropToStage(item, obj.propsName, obj.sticketName);
        list.push(item);
        list.push(propItem);
        return list;
    };
    /**
     * 怪兽的关卡
     */
    // public setMonster
    /**
     * 可以共用的方法
     */
    SetCheckPoints.prototype.addPropToStage = function (referStick, propsName, sticketName) {
        var item = this.createSkinObj(this.skinPropData[propsName], propsName);
        item.$x = this.setPropsX(this.stickHeightWidth[propsName].width, referStick, this.stickHeightWidth[sticketName].width);
        item.$y = referStick.$y - this.stickHeightWidth[propsName].height;
        // debugger;
        // alert(item.$x+'-'+item.$y+'--'+referStick.$x+'--'+referStick.$y);
        return item;
    };
    SetCheckPoints.prototype.setPropsX = function (propsItemW, referStick, sticketW) {
        var randomNum = Math.random();
        var itemX = 0;
        if (randomNum > 0.5) {
            itemX = referStick.$x + 10;
        }
        else {
            itemX = referStick.$x + sticketW - propsItemW - 10;
        }
        return itemX;
    };
    SetCheckPoints.prototype.createSkinObj = function (objClass, recycleList) {
        var item = null;
        var propsList = this.allPropsPool[recycleList];
        if (propsList.length) {
            item = this.allPropsPool[recycleList][0];
            this.allPropsPool[recycleList].shift();
        }
        else {
            item = new objClass();
        }
        return item;
    };
    SetCheckPoints.prototype.recycleObj = function (obj, recycleName) {
        this.allPropsPool[recycleName].push(obj);
    };
    SetCheckPoints.prototype.randomObjX = function (stageWidth, objWidth) {
        var randomX = 0;
        randomX = Math.random() * (stageWidth - objWidth);
        return randomX;
    };
    SetCheckPoints.prototype.createOneStick = function (obj) {
        var item = this.createSkinObj(this.skinPropData['sticket'], 'stickRecyclePool');
        var ranDistance = Math.ceil(Math.abs(Math.random() * (obj.distance - this.minDistance)) + this.minDistance);
        item.$y = obj.perY - obj.objHeight - ranDistance;
        item.$x = this.randomObjX(obj.stageWidth, obj.objWidth);
        item.typeName = obj.keyName;
        // item.setStickTypeName(item.typeName);
        return item;
    };
    return SetCheckPoints;
}());
__reflect(SetCheckPoints.prototype, "SetCheckPoints");
//# sourceMappingURL=SetCheckPoints.js.map