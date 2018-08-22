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
var BaseSkin = (function (_super) {
    __extends(BaseSkin, _super);
    function BaseSkin() {
        var _this = _super.call(this) || this;
        _this.skinType = 'default';
        _this.skinList = {
            'default': {}
        };
        return _this;
    }
    BaseSkin.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    BaseSkin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    BaseSkin.prototype.setSkinSource = function (skinImg) {
        this.baseImg = new egret.Bitmap();
        this.baseImg.texture = RES.getRes(skinImg);
        this.width = this.baseImg.width;
        this.height = this.baseImg.height;
        this.addChild(this.baseImg);
    };
    BaseSkin.prototype.changeSkinTexture = function (skinImg) {
        this.baseImg.texture = RES.getRes(skinImg);
    };
    BaseSkin.prototype.getSkinID = function (skinObjName) {
        var skinID = this.skinList[this.skinType][skinObjName];
        return skinID;
    };
    BaseSkin.prototype.createSkinImg = function (skinObjName) {
        var skinID = this.getSkinID(skinObjName);
        this.setSkinSource(skinID);
    };
    BaseSkin.prototype.changeBaseImg = function (skinObjName) {
        var skinID = this.getSkinID(skinObjName);
        this.changeSkinTexture(skinID);
    };
    return BaseSkin;
}(eui.Component));
__reflect(BaseSkin.prototype, "BaseSkin", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=BaseSkin.js.map