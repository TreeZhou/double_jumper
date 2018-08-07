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
var FloorSpring = (function (_super) {
    __extends(FloorSpring, _super);
    function FloorSpring() {
        return _super.call(this) || this;
    }
    FloorSpring.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    FloorSpring.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    FloorSpring.prototype.showOffenSpring = function () {
        this.Federoffen.visible = true;
        this.Federzu.visible = false;
    };
    return FloorSpring;
}(eui.Component));
__reflect(FloorSpring.prototype, "FloorSpring", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=FloorSpring.js.map