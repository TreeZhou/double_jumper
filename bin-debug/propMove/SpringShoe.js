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
var SpringShoe = (function (_super) {
    __extends(SpringShoe, _super);
    function SpringShoe(sticketObj) {
        var _this = _super.call(this) || this;
        _this.TYPE_NAME = 'springShoeProp';
        _this.JUMP_DISTANCE = 120;
        _this.createPropSkin(SpringShoeSkin, 'springShoeSkin');
        _this.setChildXY(sticketObj);
        return _this;
    }
    SpringShoe.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    SpringShoe.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return SpringShoe;
}(BaseProps));
__reflect(SpringShoe.prototype, "SpringShoe");
