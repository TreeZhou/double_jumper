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
var Mushroom = (function (_super) {
    __extends(Mushroom, _super);
    function Mushroom(sticketObj) {
        var _this = _super.call(this) || this;
        _this.TYPE_NAME = 'mushroomProp';
        _this.JUMP_DISTANCE = 400;
        _this.createPropSkin(MushroomSkin, 'mushroom_down');
        _this.setChildXY(sticketObj);
        return _this;
    }
    Mushroom.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Mushroom.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return Mushroom;
}(BaseProps));
__reflect(Mushroom.prototype, "Mushroom");
//# sourceMappingURL=Mushroom.js.map