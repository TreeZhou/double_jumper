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
var LeafSticket = (function (_super) {
    __extends(LeafSticket, _super);
    function LeafSticket() {
        var _this = _super.call(this) || this;
        _this.TYPE_NAME = 'leafSticket';
        _this.createSticketSkin('leafStick');
        return _this;
    }
    LeafSticket.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    LeafSticket.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.setStickNormalMoveStatus(this.MOVE_HORZONTAL);
    };
    return LeafSticket;
}(Stickets));
__reflect(LeafSticket.prototype, "LeafSticket");
//# sourceMappingURL=LeafSticket.js.map