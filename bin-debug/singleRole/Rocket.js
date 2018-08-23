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
var Rocket = (function (_super) {
    __extends(Rocket, _super);
    function Rocket(sticketObj) {
        var _this = _super.call(this) || this;
        _this.TYPE_NAME = 'rocketProp';
        _this.createPropSkin(RocketSkin, 'rocket');
        _this.setChildXY(sticketObj);
        return _this;
    }
    Rocket.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Rocket.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return Rocket;
}(BaseProps));
__reflect(Rocket.prototype, "Rocket");
//# sourceMappingURL=Rocket.js.map