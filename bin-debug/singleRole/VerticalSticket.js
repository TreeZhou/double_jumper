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
var VerticalSticket = (function (_super) {
    __extends(VerticalSticket, _super);
    function VerticalSticket() {
        var _this = _super.call(this) || this;
        _this.TYPE_NAME = 'verticalSticket';
        _this.createSticketSkin('leafStick');
        return _this;
    }
    VerticalSticket.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    VerticalSticket.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.setStickNormalMoveStatus(this.MOVE_VERTICAL);
        this.setSkinPosition();
    };
    VerticalSticket.prototype.setSkinPosition = function () {
        var positionY = Math.random() * this.verDistance;
        this.mySticketSkin.$y = positionY;
    };
    return VerticalSticket;
}(Stickets));
__reflect(VerticalSticket.prototype, "VerticalSticket");
//# sourceMappingURL=VerticalSticket.js.map