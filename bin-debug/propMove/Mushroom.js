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
        _this.JUMP_DISTANCE = 300;
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
    Mushroom.prototype.sticketSelfSkill = function () {
        var _this = this;
        var self = this;
        this.mySkinObj.changeBaseImg('mushroom_up');
        setTimeout(function () {
            _this.mySkinObj.changeBaseImg('mushroom_down');
        }, 300);
    };
    return Mushroom;
}(BaseProps));
__reflect(Mushroom.prototype, "Mushroom");
