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
var Monster = (function (_super) {
    __extends(Monster, _super);
    function Monster(skinName) {
        var _this = _super.call(this) || this;
        _this.TYPE_NAME = 'monsterProp';
        _this.createPropSkin(MonsterSkin, skinName);
        return _this;
        // this.setChildXY(sticketObj);
    }
    Monster.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Monster.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return Monster;
}(BaseProps));
__reflect(Monster.prototype, "Monster");
//# sourceMappingURL=Monster.js.map