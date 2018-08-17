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
var RocketProp = (function (_super) {
    __extends(RocketProp, _super);
    function RocketProp() {
        var _this = _super.call(this) || this;
        _this.TYPE_STATUS = 'rocket';
        _this.TYPE_NAME = "rocket";
        _this.JUMP_DISTANCE = 1500;
        _this.UP_DISTANCE = 80;
        _this.DOWN_DISTANCE = 100;
        return _this;
    }
    RocketProp.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    RocketProp.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.setSkinData();
        this.setJumpeHeight();
    };
    RocketProp.prototype.setSkinData = function () {
        var self = this;
        this.skinsData = {
            'normal': self.rocketDefault
        };
    };
    RocketProp.prototype.setJumpeHeight = function () {
        this.JUMP_DISTANCE = this.changeToPixel(this.JUMP_DISTANCE);
    };
    RocketProp.prototype.playShowDownTram = function () {
        this.hideAllChildren();
        this.skinsData[this.COLOR_STATUS].visible = true;
    };
    return RocketProp;
}(BasePage));
__reflect(RocketProp.prototype, "RocketProp");
//# sourceMappingURL=RocketProp.js.map