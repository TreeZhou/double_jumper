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
var BasePage = (function (_super) {
    __extends(BasePage, _super);
    function BasePage() {
        var _this = _super.call(this) || this;
        _this.STAGE_METER = 200; // 一屏等于多少米
        _this.COLOR_STATUS = 'normal';
        _this.COLOR_DEFAULE = 'normal';
        return _this;
    }
    BasePage.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //  this.percentHeight=100;
        // this.percentWidth =100;
    };
    BasePage.prototype.createMoveObj = function (dataName, thisMoveObj) {
        var data = RES.getRes(dataName + "_png");
        var textr = RES.getRes(dataName + "_json");
        var mcFactory = new egret.MovieClipDataFactory(textr, data);
        var movePesticide = new egret.MovieClip(mcFactory.generateMovieClipData(dataName));
        thisMoveObj.addChild(movePesticide);
        return movePesticide;
    };
    /**
     * 像素更换成多少米
    */
    BasePage.prototype.changeToMeter = function (y, stage) {
        var meterNum = null;
        if (y > 0) {
            meterNum = (this.stage.$stageHeight - y) / this.stage.$stageHeight * this.STAGE_METER + (stage - 1) * this.STAGE_METER;
        }
        else {
            meterNum = (Math.abs(y)) / this.stage.$stageHeight * this.STAGE_METER + stage * this.STAGE_METER;
        }
        return meterNum;
    };
    /**
     * 米换成像素
     */
    BasePage.prototype.changeToPixel = function (meter) {
        var pixel = 0;
        var stage = meter / this.STAGE_METER;
        // let leftStage = (meter%this.STAGE_METER)/this.STAGE_METER;
        pixel = stage * this.stage.$stageHeight;
        return pixel;
    };
    // 检查是否超过屏幕底线，是的话就移除该对象
    BasePage.prototype.checkISOverStage = function (fatherBox) {
        var list = fatherBox.$children;
        var len = list.length;
        var item;
        var removeChildList = [];
        var nowLen, nowList;
        for (var i = 0; i < len; i++) {
            item = list[i];
            if (item.$y >= this.stage.$stageHeight) {
                removeChildList.push(item);
            }
        }
        if (removeChildList.length) {
            for (var j = 0; j < removeChildList.length; j++) {
                if (removeChildList[j]) {
                    fatherBox.removeChild(removeChildList[j]);
                }
            }
        }
        return fatherBox;
    };
    BasePage.prototype.hideAllChildren = function () {
        var len = this.$children.length;
        for (var i = 0; i < len; i++) {
            this.$children[i].visible = false;
        }
    };
    return BasePage;
}(eui.Component));
__reflect(BasePage.prototype, "BasePage");
//# sourceMappingURL=BasePage.js.map