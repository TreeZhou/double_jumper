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
var WaterSticketSkin = (function (_super) {
    __extends(WaterSticketSkin, _super);
    function WaterSticketSkin() {
        var _this = _super.call(this) || this;
        _this.skinList = {
            'default': 'waterDefaultMove'
        };
        _this.createMoveObj(_this.skinList[_this.skinType], { width: 123, height: 31 });
        return _this;
    }
    return WaterSticketSkin;
}(BaseMovieClip));
__reflect(WaterSticketSkin.prototype, "WaterSticketSkin");
//# sourceMappingURL=WaterSticketSkin.js.map