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
var SpideWebSkin = (function (_super) {
    __extends(SpideWebSkin, _super);
    function SpideWebSkin(skinObjName) {
        var _this = _super.call(this) || this;
        _this.skinList = {
            'default': {
                'spideWeb': 'spiderWeb_png'
            }
        };
        _this.createSkinImg(skinObjName);
        return _this;
    }
    return SpideWebSkin;
}(BaseSkin));
__reflect(SpideWebSkin.prototype, "SpideWebSkin");
//# sourceMappingURL=SpiderWebSkin.js.map