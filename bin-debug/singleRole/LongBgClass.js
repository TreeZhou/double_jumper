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
var LongBgClass = (function (_super) {
    __extends(LongBgClass, _super);
    function LongBgClass() {
        var _this = _super.call(this) || this;
        _this.createrLongSkin();
        _this.setLongBgSkin('longBg_default');
        _this.setInitSkinPosition();
        return _this;
    }
    LongBgClass.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    LongBgClass.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    LongBgClass.prototype.createrLongSkin = function () {
        this.bmpSkin1 = new LongBgSkin('longBg_default');
        this.bmpSkin2 = new LongBgSkin('longBg_default');
        this.bmpSkin3 = new LongBgSkin('longBg_default');
        this.addChild(this.bmpSkin1);
        this.addChild(this.bmpSkin2);
        this.addChild(this.bmpSkin3);
    };
    /**
     * 改变皮肤
     * @param skinName
     */
    LongBgClass.prototype.setLongBgSkin = function (skinName) {
        this.bmpSkin1.changeBaseImg(skinName);
        this.bmpSkin2.changeBaseImg(skinName);
        this.bmpSkin3.changeBaseImg(skinName);
        this.bgHeight = this.bmpSkin1.height;
    };
    /**
     * 初始化设置皮肤的位置
     */
    LongBgClass.prototype.setInitSkinPosition = function () {
        this.bmpSkin1.$y = 0;
        this.bmpSkin2.$y = -this.bgHeight;
        this.bmpSkin3.$y = this.bgHeight;
    };
    /**
     * 序列帧移动
     */
    LongBgClass.prototype.run = function (_moveNum) {
        if (this.bmpSkin3.$y > this.bgHeight) {
            this.bmpSkin3.$y = this.bmpSkin2.$y - this.bgHeight;
        }
        if (this.bmpSkin1.y > this.bgHeight) {
            this.bmpSkin1.y = this.bmpSkin3.y - this.bgHeight;
        }
        if (this.bmpSkin2.y > this.bgHeight) {
            this.bmpSkin2.y = this.bmpSkin1.y - this.bgHeight;
        }
        this.bmpSkin1.y += _moveNum;
        this.bmpSkin2.y += _moveNum;
        this.bmpSkin3.y += _moveNum;
    };
    /**
     * 游戏结束时的移动
     */
    LongBgClass.prototype.runDown = function (_moveNum) {
        if (this.bmpSkin1.$y < -this.bgHeight) {
            this.bmpSkin1.$y = this.bmpSkin2.$y + this.bgHeight;
        }
        if (this.bmpSkin2.y < -this.bgHeight) {
            this.bmpSkin2.y = this.bmpSkin3.y + this.bgHeight;
        }
        if (this.bmpSkin3.y < -this.bgHeight) {
            this.bmpSkin3.y = this.bmpSkin1.y + this.bgHeight;
        }
        this.bmpSkin1.y -= _moveNum;
        this.bmpSkin2.y -= _moveNum;
        this.bmpSkin3.y -= _moveNum;
    };
    return LongBgClass;
}(eui.Component));
__reflect(LongBgClass.prototype, "LongBgClass");
//# sourceMappingURL=LongBgClass.js.map