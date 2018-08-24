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
var BaseProps = (function (_super) {
    __extends(BaseProps, _super);
    function BaseProps() {
        var _this = _super.call(this) || this;
        _this.JUMP_DISTANCE = 120;
        return _this;
    }
    BaseProps.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    BaseProps.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.caculateJumpDistance();
    };
    BaseProps.prototype.setPropsXY = function (referStick) {
        var randomNum = Math.random();
        var itemX = 0;
        if (randomNum > 0.5) {
            itemX = 10;
        }
        else {
            itemX = referStick.width - this.width - 10;
        }
        return itemX;
    };
    BaseProps.prototype.setChildXY = function (sticketObj) {
        this.x = this.setPropsXY(sticketObj);
        this.y = -this.height;
    };
    BaseProps.prototype.caculateJumpDistance = function () {
        this.JUMP_DISTANCE = this.changeToPixel(this.JUMP_DISTANCE);
    };
    /**
     * 生成道具皮肤
     */
    BaseProps.prototype.createPropSkin = function (cliClass, skinName) {
        this.mySkinObj = new cliClass(skinName);
        this.addChild(this.mySkinObj);
        this.width = this.mySkinObj.width;
        this.height = this.mySkinObj.height;
    };
    /**
     * 每个道具各自的技能点
     */
    BaseProps.prototype.sticketSelfSkill = function () {
    };
    /**
    * 各自重置数据的函数
    */
    BaseProps.prototype.resertData = function () {
        this.visible = true;
    };
    return BaseProps;
}(BasePage));
__reflect(BaseProps.prototype, "BaseProps");
//# sourceMappingURL=BasePoprs.js.map