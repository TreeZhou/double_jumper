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
var BaseNormalPage = (function (_super) {
    __extends(BaseNormalPage, _super);
    function BaseNormalPage() {
        return _super.call(this) || this;
    }
    BaseNormalPage.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.percentHeight = 100;
        this.percentWidth = 100;
    };
    return BaseNormalPage;
}(eui.Component));
__reflect(BaseNormalPage.prototype, "BaseNormalPage");
//# sourceMappingURL=BaseNormalPage.js.map