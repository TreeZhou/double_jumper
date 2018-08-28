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
var NormalSticket = (function (_super) {
    __extends(NormalSticket, _super);
    function NormalSticket() {
        var _this = _super.call(this) || this;
        _this.sticketName = ['soilStick', 'stoneStick'];
        _this.TYPE_NAME = 'normalSticket';
        _this.createNormalSticket();
        return _this;
    }
    NormalSticket.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    NormalSticket.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.setStickNormalMoveStatus(this.MOVE_FIXATION);
    };
    NormalSticket.prototype.createNormalSticket = function () {
        var random = Math.random();
        var skinName = null;
        var skinObj = null;
        skinName = this.sticketName[1];
        // if(random > 0.5) {
        //     skinName = this.sticketName[0];
        // }else {
        //     skinName = this.sticketName[1];
        // }
        this.createSticketSkin(skinName);
    };
    return NormalSticket;
}(Stickets));
__reflect(NormalSticket.prototype, "NormalSticket");
