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
var Spring = (function (_super) {
    __extends(Spring, _super);
    function Spring(sticketObj) {
        var _this = _super.call(this) || this;
        _this.TYPE_NAME = 'springProp';
        _this.JUMP_DISTANCE = 200;
        _this.createPropSkin(SpringSkin, '');
        _this.setChildXY(sticketObj);
        return _this;
    }
    Spring.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Spring.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    Spring.prototype.resertData = function () {
        this.visible = true;
        this.mySkinObj.movePesticide.gotoAndStop(1);
    };
    Spring.prototype.sticketSelfSkill = function () {
        var self = this;
        this.mySkinObj.movePesticide.play();
        this.mySkinObj.movePesticide.addEventListener('complete', function () {
            self.visible = false;
        }, this);
    };
    return Spring;
}(BaseProps));
__reflect(Spring.prototype, "Spring");
