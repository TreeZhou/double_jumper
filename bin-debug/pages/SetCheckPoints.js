var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SetCheckPoints = (function () {
    function SetCheckPoints() {
        this.minDistance = 30;
        this.stickRecyclePool = [];
        this.fixtionHeight = {
            'fixation': {
                height: 32,
                width: 126
            }
        };
    }
    SetCheckPoints.prototype.createStick = function () {
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
    SetCheckPoints.prototype.fixtionStick = function (obj) {
        // interface obj{
        // }
        var list = [];
        var perY = obj.lastY;
        var keyName = 'fixation';
        var objHeight = this.fixtionHeight[keyName].height;
        var objWidth = this.fixtionHeight[keyName].width;
        for (var i = 0; i < obj.num; i++) {
            var item = this.createStick();
            var ranDistance = Math.ceil(Math.abs(Math.random() * (obj.distance - this.minDistance)) + this.minDistance);
            item.$y = perY - objHeight - ranDistance;
            item.$x = this.randomObjX(obj.stageWidth, objWidth);
            item.typeName = keyName;
            perY = item.$y;
            list.push(item);
        }
        return list;
    };
    SetCheckPoints.prototype.randomObjX = function (stageWidth, objWidth) {
        var randomX = 0;
        randomX = Math.random() * (stageWidth - objWidth);
        return randomX;
    };
    return SetCheckPoints;
}());
__reflect(SetCheckPoints.prototype, "SetCheckPoints");
//# sourceMappingURL=SetCheckPoints.js.map