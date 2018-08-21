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
var SpiderWeb = (function (_super) {
    __extends(SpiderWeb, _super);
    function SpiderWeb() {
        var _this = _super.call(this) || this;
        _this.TYPE_STATUS = 'spideWeb';
        _this.TYPE_NAME = 'spideWeb';
        _this.JUMP_DISTANCE = 120; // 跳跃的多少米
        return _this;
    }
    SpiderWeb.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    SpiderWeb.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.setInitData();
    };
    SpiderWeb.prototype.setInitData = function () {
        this.setJumpeHeight();
        this.setSkinData();
        this.showMonsterSkin();
    };
    SpiderWeb.prototype.setJumpeHeight = function () {
        this.JUMP_DISTANCE = this.changeToPixel(this.JUMP_DISTANCE);
    };
    SpiderWeb.prototype.setSkinData = function () {
        var self = this;
        this.skinsData = {
            'normal': self.spideWebDefault
        };
    };
    SpiderWeb.prototype.showMonsterSkin = function () {
        var nowStick;
        this.hideAllChildren();
        nowStick = this.skinsData[this.COLOR_STATUS];
        nowStick.visible = true;
        this.setThisWidthHeight({
            width: nowStick.width,
            height: nowStick.height
        });
    };
    return SpiderWeb;
}(BasePage));
__reflect(SpiderWeb.prototype, "SpiderWeb");
//# sourceMappingURL=SpiderWeb.js.map