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
        var objNum = 10;
        var list = this.getCreateClassList(['normalSticket'], objNum, obj.maxDistance, obj.minDistance);
        var pointList = this.randomPointXY(list, obj.lastY, obj.stageW);
        return pointList;
    };
    /**
     * 随机常规和移动跳板
     */
    GameLevel.prototype.norHorSticketLevel = function (obj) {
        var objNum = 6;
        var list = this.getCreateClassList(['normalSticket', 'leafSticket'], objNum, obj.maxDistance, obj.minDistance);
        var pointList = this.randomPointXY(list, obj.lastY, obj.stageW);
        return pointList;
    };
    /**
     * 常规跳板和翅膀道具
     */
    GameLevel.prototype.norWingPropLevel = function (obj) {
        var objNum = 1;
        var list = this.singleSticketAndProp(['normalSticket', 'wingProp'], objNum, obj.maxDistance, obj.minDistance);
        var pointList = this.randomPointXY(list, obj.lastY, obj.stageW);
        return pointList;
    };
    /**
     * 常规跳板和火箭
     */
    GameLevel.prototype.norRocketPropLevel = function (obj) {
        var objNum = 1;
        var list = this.singleSticketAndProp(['normalSticket', 'rocketProp'], objNum, obj.maxDistance, obj.minDistance);
        var pointList = this.randomPointXY(list, obj.lastY, obj.stageW);
        return pointList;
    };
    /**
     * 常规跳板和弹簧鞋
     */
    GameLevel.prototype.norSpringShoePropLevel = function (obj) {
        var objNum = 1;
        var list = this.singleSticketAndProp(['normalSticket', 'springShoeProp'], objNum, obj.maxDistance, obj.minDistance);
        var pointList = this.randomPointXY(list, obj.lastY, obj.stageW);
        return pointList;
    };
    /**
     * 常规跳板和弹簧
     */
    GameLevel.prototype.norSpringPropLevel = function (obj) {
        var objNum = 1;
        var list = this.singleSticketAndProp(['normalSticket', 'springProp'], objNum, obj.maxDistance, obj.minDistance);
        var pointList = this.randomPointXY(list, obj.lastY, obj.stageW);
        return pointList;
    };
    /**
     * 水滴跳板和一次性跳板左右排列
     */
    GameLevel.prototype.waterOneHitLeftRight = function (obj) {
        var objNum = 3;
        var list = this.getCreateClassList(['waterSticket', 'cloudSticket', 'cloudSticket', 'waterSticket'], objNum, obj.maxDistance, obj.minDistance);
        var pointList = this.leftAndRightPointXY(list, obj.lastY, obj.stageW);
        return pointList;
    };
    /**
     * 木材跳板左右排列
     */
    GameLevel.prototype.woodSticketLeftRight = function (obj) {
        var objNum = 6;
        var list = this.getCreateClassList(['woodSticket'], objNum, 80, 50);
        var pointList = this.leftAndRightPointXY(list, obj.lastY, obj.stageW);
        return pointList;
    };
    /**
     *  绿色怪兽关卡左右
     */
    GameLevel.prototype.greenMonsterLeftRight = function (obj) {
        var objNum = 1;
        var singleList = this.singleSticketAndProp(['normalSticket', 'protectionProp'], objNum, obj.maxDistance, obj.minDistance);
        var normalStickt = this.getCreateClassList(['normalSticket'], 3, 50, 30);
        var monsterlist = this.createMonster('monsterProp', 'greenBigMonster', 50, 30);
        var sticketList = this.getCreateClassList(['normalSticket'], 6, 50, 30);
        var concatList = singleList.concat(normalStickt, monsterlist, sticketList);
        var pointList = this.monsterOne(concatList, obj.lastY, obj.stageW);
        return pointList;
    };
    /**
     * 紫色怪兽关卡左右
     */
    GameLevel.prototype.purpleMonsterLeftRight = function (obj) {
        var objNum = 1;
        var singleList = this.singleSticketAndProp(['normalSticket', 'protectionProp'], objNum, obj.maxDistance, obj.minDistance);
        var normalStickt = this.getCreateClassList(['normalSticket'], 3, 50, 30);
        var monsterlist = this.createMonster('monsterProp', 'purpleSmallMonster', 50, 30);
        var sticketList = this.getCreateClassList(['normalSticket'], 6, 50, 30);
        var concatList = singleList.concat(normalStickt, monsterlist, sticketList);
        var pointList = this.monsterOne(concatList, obj.lastY, obj.stageW);
        return pointList;
    };
    return GameLevel;
}(CalculatePonitXY));
__reflect(GameLevel.prototype, "GameLevel");
//# sourceMappingURL=GameLevel.js.map