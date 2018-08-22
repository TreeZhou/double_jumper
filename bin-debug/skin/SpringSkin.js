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
var SpringSkin = (function (_super) {
    __extends(SpringSkin, _super);
    function SpringSkin() {
        var _this = _super.call(this) || this;
        _this.skinList = {
            'default': 'normalSpringMove'
        };
        _this.createMoveObj(_this.skinList[_this.skinType], { width: 35, height: 36 });
        return _this;
    }
    return SpringSkin;
}(BaseMovieClip));
__reflect(SpringSkin.prototype, "SpringSkin");
//# sourceMappingURL=SpringSkin.js.map