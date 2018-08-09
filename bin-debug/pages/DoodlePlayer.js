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
var DoodlePlayer = (function (_super) {
    __extends(DoodlePlayer, _super);
    function DoodlePlayer() {
        var _this = _super.call(this) || this;
        _this.SIDE_STATUS = 1;
        _this.SIDE_RIGHT = 1; // 右边
        _this.SIDE_LEFT = 2; // 左边
        return _this;
    }
    DoodlePlayer.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    DoodlePlayer.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    DoodlePlayer.prototype.setSideStatus = function (sideStatus) {
        switch (sideStatus) {
            case this.SIDE_LEFT:
                this.SIDE_STATUS = this.SIDE_LEFT;
                break;
            case this.SIDE_RIGHT:
                this.SIDE_STATUS = this.SIDE_RIGHT;
                break;
        }
        this.changePlaySide();
    };
    DoodlePlayer.prototype.changePlaySide = function () {
        switch (this.SIDE_STATUS) {
            case this.SIDE_LEFT:
                this.DoodleNormalRight.visible = false;
                this.DoodleNormalLeft.visible = true;
                break;
            case this.SIDE_RIGHT:
                this.DoodleNormalRight.visible = true;
                this.DoodleNormalLeft.visible = false;
                break;
        }
    };
    return DoodlePlayer;
}(eui.Component));
__reflect(DoodlePlayer.prototype, "DoodlePlayer", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=DoodlePlayer.js.map