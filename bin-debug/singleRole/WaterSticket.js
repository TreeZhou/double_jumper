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
var WaterSticket = (function (_super) {
    __extends(WaterSticket, _super);
    function WaterSticket() {
        var _this = _super.call(this) || this;
        _this.TYPE_NAME = 'waterSticket';
        _this.createMovieClipSticket(WaterSticketSkin);
        return _this;
    }
    WaterSticket.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    WaterSticket.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.randomStatus();
    };
    WaterSticket.prototype.resertData = function () {
        this.visible = true;
        this.myClipSkinObj.movePesticide.gotoAndStop(1);
    };
    WaterSticket.prototype.randomStatus = function () {
        var random = Math.random();
        if (random > 0.6) {
            this.setStickNormalMoveStatus(this.MOVE_HORZONTAL);
        }
        else {
            this.setStickNormalMoveStatus(this.MOVE_FIXATION);
        }
    };
    WaterSticket.prototype.sticketSelfSkill = function () {
        var self = this;
        this.myClipSkinObj.movePesticide.play();
        this.myClipSkinObj.movePesticide.addEventListener('complete', function () {
            self.visible = false;
        }, this);
    };
    return WaterSticket;
}(Stickets));
__reflect(WaterSticket.prototype, "WaterSticket");
//# sourceMappingURL=WaterSticket.js.map