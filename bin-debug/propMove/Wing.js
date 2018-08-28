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
var Wing = (function (_super) {
    __extends(Wing, _super);
    function Wing(sticketObj) {
        var _this = _super.call(this) || this;
        _this.JUMP_DISTANCE = 1000;
        _this.TYPE_NAME = 'wingProp';
        _this.createPropSkin(WingSkin, 'wing');
        _this.setChildXY(sticketObj);
        return _this;
    }
    Wing.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Wing.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        // this.caculateJumpDistance();
    };
    return Wing;
}(BaseProps));
__reflect(Wing.prototype, "Wing");
