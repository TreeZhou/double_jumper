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
var AllSticket2 = (function (_super) {
    __extends(AllSticket2, _super);
    function AllSticket2() {
        return _super.call(this) || this;
    }
    AllSticket2.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    AllSticket2.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return AllSticket2;
}(eui.Component));
__reflect(AllSticket2.prototype, "AllSticket2", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=AllSticket2.js.map