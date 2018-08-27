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
var AllGameBarrier = (function (_super) {
    __extends(AllGameBarrier, _super);
    function AllGameBarrier() {
        var _this = _super.call(this) || this;
        _this.minDistance = 30; // 最小间隔
        _this.eachStageDistance = 30; // 每个阶段的间隔
        return _this;
    }
    AllGameBarrier.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.setInitData();
    };
    AllGameBarrier.prototype.setInitData = function () {
        this.lastBarrierY = this.stage.$stageHeight;
        this.gameLevel = new GameLevel();
        this.probabilityLevel = new ProbabilityClass();
    };
    /**
     * 初始化刚开始的跳板
     */
    AllGameBarrier.prototype.initSticket = function (groupBox) {
        var pedalObj = null;
        var list = this.gameLevel.normalSticketLevel({
            maxDistance: 40,
            minDistance: 30,
            lastY: this.stage.$stageHeight,
            stageW: this.stage.$stageWidth
        });
        for (var i = 0; i < list.length; i++) {
            groupBox.addChild(list[i].roleObj);
            pedalObj = list[i].roleObj;
        }
        this.lastBarrierY = pedalObj.$y - pedalObj.height - this.gameLevel.checkIsHasChildHeight(pedalObj);
        return groupBox;
    };
    /**
     * 创建下一屏的跳板
     */
    AllGameBarrier.prototype.addNewSticket = function (groupBox, playerMeter) {
        var pedalObj = null;
        if (this.lastBarrierY > (this.eachStageDistance + this.minDistance)) {
            var levelFun = this.probabilityLevel.getLevelName(playerMeter);
            if (this.gameLevel && levelFun.levelName) {
                var list = this.gameLevel[levelFun.levelName]({
                    maxDistance: levelFun.maxDistance,
                    minDistance: levelFun.minDistance,
                    lastY: this.lastBarrierY,
                    stageW: this.stage.$stageWidth
                });
                for (var i = 0; i < list.length; i++) {
                    groupBox.addChild(list[i].roleObj);
                    pedalObj = list[i].roleObj;
                }
                this.lastBarrierY = pedalObj.$y - pedalObj.height - 20 - this.gameLevel.checkIsHasChildHeight(pedalObj);
            }
        }
    };
    /**
     * 回收移除出舞台的对象
     */
    AllGameBarrier.prototype.recycleAllObject = function (obj) {
        if (obj.TYPE_NAME) {
            if (obj.$children[1]) {
                var item = obj.$children[1];
                obj.removeChild(item);
                this.gameLevel.recycleObj(item, item.TYPE_NAME);
            }
            this.gameLevel.recycleObj(obj, obj.TYPE_NAME);
        }
    };
    /**
     * 检测所有在舞台的障碍物，进行相应的运动
     */
    AllGameBarrier.prototype.barrierMoved = function (allStickList) {
        var list = allStickList;
        var len = list.length;
        var item;
        if (list.length) {
            list = list.filter(function (item, index) {
                return (item.$y + item.height) >= 0;
            });
        }
        for (var i = 0; i < list.length; i++) {
            item = list[i];
            if (item.horzontalMove) {
                item.horzontalMove();
            }
        }
    };
    return AllGameBarrier;
}(eui.Component));
__reflect(AllGameBarrier.prototype, "AllGameBarrier");
//# sourceMappingURL=AllGameBarrier.js.map