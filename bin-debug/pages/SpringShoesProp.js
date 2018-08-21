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
var SpringShoesProp = (function (_super) {
    __extends(SpringShoesProp, _super);
    function SpringShoesProp() {
        var _this = _super.call(this) || this;
        _this.TYPE_STATUS = 'springShoes';
        _this.TYPE_NAME = 'springShoes';
        _this.JUMP_DISTANCE = 100; // 跳跃的多少米
        return _this;
    }
    // public imgW:number = 60;
    // public imgH:number = 31;
    SpringShoesProp.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    SpringShoesProp.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.setInitData();
        this.showMonsterSkin();
    };
    SpringShoesProp.prototype.setInitData = function () {
        this.setJumpeHeight();
        this.setSkinData();
    };
    SpringShoesProp.prototype.setJumpeHeight = function () {
        this.JUMP_DISTANCE = this.changeToPixel(this.JUMP_DISTANCE);
    };
    SpringShoesProp.prototype.setSkinData = function () {
        var self = this;
        this.skinsData = {
            'normal': self.springShoeDefault
        };
    };
    SpringShoesProp.prototype.showMonsterSkin = function () {
        var nowStick;
        this.hideAllChildren();
        nowStick = this.skinsData[this.COLOR_STATUS];
        nowStick.visible = true;
        this.setThisWidthHeight({
            width: nowStick.width,
            height: nowStick.height
        });
    };
    return SpringShoesProp;
}(BasePage));
__reflect(SpringShoesProp.prototype, "SpringShoesProp");
//# sourceMappingURL=SpringShoesProp.js.map