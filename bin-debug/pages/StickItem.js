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
var StickItem = (function (_super) {
    __extends(StickItem, _super);
    function StickItem() {
        var _this = _super.call(this) || this;
        _this.meter = 0;
        _this.TYPE_STATUS = 1; // 踏板的状态
        _this.TYPE_GREEN = 1;
        _this.TYPE_BLUE = 2;
        _this.initSpeed = 2;
        _this.speed = 2;
        return _this;
    }
    StickItem.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    StickItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.setTypeStick(this.TYPE_GREEN);
        // console.log('wode',this);
        this.setInitLeftOrRightMove();
        // this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
    };
    StickItem.prototype.setInitLeftOrRightMove = function () {
        var random = Math.random();
        if (random > 0.5) {
            this.speed = this.initSpeed;
        }
        else {
            this.speed = -this.initSpeed;
        }
    };
    StickItem.prototype.leftAndRightMove = function () {
        // console.log('这个对象',this.x,this.width,this.stage.$stageWidth,this.speed);
        // debugger;
        if (this.x + this.width >= this.stage.$stageWidth) {
            this.speed = -this.initSpeed;
        }
        else if (this.x <= 0) {
            this.speed = this.initSpeed;
        }
        // console.log('这个对象2',this.x,this.width,this.stage.$stageWidth,this.speed);
        // debugger;
        this.x = this.x + this.speed;
    };
    StickItem.prototype.setTypeStick = function (type) {
        switch (type) {
            case this.TYPE_BLUE:
                this.TYPE_STATUS = this.TYPE_BLUE;
                break;
            default:
                this.TYPE_STATUS = this.TYPE_GREEN;
                break;
        }
        this.showStickImg();
    };
    StickItem.prototype.showStickImg = function () {
        switch (this.TYPE_STATUS) {
            case this.TYPE_BLUE:
                this.stickImgGreen.visible = false;
                this.stickImgBule.visible = true;
                break;
            default:
                this.stickImgGreen.visible = true;
                this.stickImgBule.visible = false;
                break;
        }
    };
    return StickItem;
}(eui.Component));
__reflect(StickItem.prototype, "StickItem", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=StickItem.js.map