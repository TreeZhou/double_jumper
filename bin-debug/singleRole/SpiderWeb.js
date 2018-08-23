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
var SpiderWeb = (function (_super) {
    __extends(SpiderWeb, _super);
    function SpiderWeb(sticketObj) {
        var _this = _super.call(this) || this;
        _this.TYPE_NAME = 'spiderWebProp';
        _this.createPropSkin(SpideWebSkin, 'spideWeb');
        _this.setChildXY(sticketObj);
        return _this;
    }
    SpiderWeb.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    SpiderWeb.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return SpiderWeb;
}(BaseProps));
__reflect(SpiderWeb.prototype, "SpiderWeb");
//# sourceMappingURL=SpiderWeb.js.map