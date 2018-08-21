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
var MonsterProp = (function (_super) {
    __extends(MonsterProp, _super);
    function MonsterProp() {
        var _this = _super.call(this) || this;
        _this.TYPE_STATUS = 'smallMonster';
        _this.TYPE_BIG_MONSTER = 'bigMonster';
        _this.TYPE_SMALL_MONSTER = 'smallMonster';
        _this.TYPE_NAME = 'monsters';
        _this.JUMP_DISTANCE = 120; // 跳跃的多少米
        return _this;
    }
    MonsterProp.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    MonsterProp.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.setInitData();
    };
    MonsterProp.prototype.setInitData = function () {
        this.setJumpeHeight();
        this.setSkinData();
        this.showMonsterSkin();
    };
    MonsterProp.prototype.setJumpeHeight = function () {
        this.JUMP_DISTANCE = this.changeToPixel(this.JUMP_DISTANCE);
    };
    MonsterProp.prototype.setSkinData = function () {
        var self = this;
        this.skinsData = {
            'normal': {
                bigMonster: [self.bigGreenMonster],
                smallMonster: [self.smallPurpleMonster],
            }
        };
    };
    MonsterProp.prototype.setStickTypeName = function (typeName) {
        this.setTypeStatus(typeName);
        this.showMonsterSkin();
    };
    MonsterProp.prototype.setTypeStatus = function (type) {
        switch (type) {
            case this.TYPE_BIG_MONSTER:
                this.TYPE_STATUS = this.TYPE_BIG_MONSTER;
                break;
            case this.TYPE_SMALL_MONSTER:
                this.TYPE_STATUS = this.TYPE_SMALL_MONSTER;
                break;
            default:
                this.TYPE_STATUS = this.TYPE_SMALL_MONSTER;
                break;
        }
    };
    MonsterProp.prototype.showMonsterSkin = function () {
        var nowStick;
        this.hideAllChildren();
        nowStick = this.randomShowSameType(this.skinsData[this.COLOR_STATUS][this.TYPE_STATUS]);
        nowStick.visible = true;
        this.setThisWidthHeight({
            width: nowStick.width,
            height: nowStick.height
        });
    };
    return MonsterProp;
}(BasePage));
__reflect(MonsterProp.prototype, "MonsterProp");
//# sourceMappingURL=MonsterProp.js.map