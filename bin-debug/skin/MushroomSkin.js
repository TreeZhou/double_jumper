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
var MushroomSkin = (function (_super) {
    __extends(MushroomSkin, _super);
    function MushroomSkin(skinObjName) {
        var _this = _super.call(this) || this;
        _this.skinList = {
            'default': {
                'mushroom_up': 'mushroom1_png',
                'mushroom_down': 'mushroom2_png'
            }
        };
        // console.log('123');
        _this.createSkinImg(skinObjName);
        return _this;
    }
    return MushroomSkin;
}(BaseSkin));
__reflect(MushroomSkin.prototype, "MushroomSkin");
//# sourceMappingURL=MushroomSkin.js.map