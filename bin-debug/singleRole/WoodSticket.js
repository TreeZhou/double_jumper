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
var WoodSticket = (function (_super) {
    __extends(WoodSticket, _super);
    function WoodSticket() {
        var _this = _super.call(this) || this;
        _this.TYPE_NAME = 'woodSticket';
        _this.createMovieClipSticket(WoodSticketSkin);
        return _this;
    }
    WoodSticket.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    WoodSticket.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.setStickNormalMoveStatus(this.MOVE_FIXATION);
    };
    WoodSticket.prototype.resertData = function () {
        this.visible = true;
        this.myClipSkinObj.movePesticide.gotoAndStop(1);
    };
    WoodSticket.prototype.sticketTimeSelfSkill = function () {
        var self = this;
        this.myClipSkinObj.movePesticide.play();
        this.myClipSkinObj.movePesticide.addEventListener('complete', function () {
            self.visible = false;
        }, this);
    };
    return WoodSticket;
}(Stickets));
__reflect(WoodSticket.prototype, "WoodSticket");
//# sourceMappingURL=WoodSticket.js.map