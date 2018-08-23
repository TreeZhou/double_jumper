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
var GameLevel = (function (_super) {
    __extends(GameLevel, _super);
    function GameLevel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 常规随机跳板
     */
    GameLevel.prototype.normalSticketLevel = function (obj) {
        var list = this.getCreateClassList(['normalSticket'], obj.num, obj.maxDistance, obj.minDistance);
        var pointList = this.randomPointXY(list, obj.lastY, obj.stageW);
        return pointList;
    };
    /**
     * 随机常规和移动跳板
     */
    GameLevel.prototype.norHorSticketLevel = function (obj) {
        var list = this.getCreateClassList(['normalSticket', 'leafSticket'], obj.num, obj.maxDistance, obj.minDistance);
        var pointList = this.randomPointXY(list, obj.lastY, obj.stageW);
        return pointList;
    };
    /**
     * 常规跳板和翅膀道具
     */
    GameLevel.prototype.norWingPropLevel = function (obj) {
        var list = this.singleSticketAndProp(['normalSticket', 'wingProp'], obj.num, obj.maxDistance, obj.minDistance);
        var pointList = this.randomPointXY(list, obj.lastY, obj.stageW);
        return pointList;
    };
    return GameLevel;
}(CalculatePonitXY));
__reflect(GameLevel.prototype, "GameLevel");
//# sourceMappingURL=GameLevel.js.map