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
var WingProp = (function (_super) {
    __extends(WingProp, _super);
    function WingProp() {
        var _this = _super.call(this) || this;
        _this.TYPE_STATUS = 'wing';
        _this.TYPE_NAME = "wing";
        _this.JUMP_DISTANCE = 1000;
        return _this;
    }
    WingProp.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    WingProp.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.setSkinData();
        this.setJumpeHeight();
    };
    WingProp.prototype.setJumpeHeight = function () {
        this.JUMP_DISTANCE = this.changeToPixel(this.JUMP_DISTANCE);
    };
    WingProp.prototype.setSkinData = function () {
        var self = this;
        this.skinsData = {
            'normal': self.wingDefault
        };
    };
    WingProp.prototype.playShowDownTram = function () {
        this.hideAllChildren();
        this.skinsData[this.COLOR_STATUS].visible = true;
    };
    return WingProp;
}(BasePage));
__reflect(WingProp.prototype, "WingProp");
//# sourceMappingURL=WingProp.js.map