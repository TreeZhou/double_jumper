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
var CloudSticket = (function (_super) {
    __extends(CloudSticket, _super);
    function CloudSticket() {
        var _this = _super.call(this) || this;
        _this.TYPE_NAME = 'cloudSticket';
        _this.createSticketSkin('cloudDefault');
        return _this;
    }
    CloudSticket.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    CloudSticket.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.setStickNormalMoveStatus(this.MOVE_FIXATION);
    };
    CloudSticket.prototype.sticketSelfSkill = function () {
        this.visible = false;
    };
    return CloudSticket;
}(Stickets));
__reflect(CloudSticket.prototype, "CloudSticket");
//# sourceMappingURL=CloudSticket.js.map