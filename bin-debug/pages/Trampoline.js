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
var Trampoline = (function (_super) {
    __extends(Trampoline, _super);
    function Trampoline() {
        var _this = _super.call(this) || this;
        _this.TYPE_NAME = "trampoline";
        _this.TYPE_STATUS = 'up';
        _this.TYPE_UP = 'up';
        _this.TYPE_DOWN = 'down';
        _this.JUMP_DISTANCE = 400;
        _this.UP_DISTANCE = 80;
        _this.DOWN_DISTANCE = 100;
        return _this;
    }
    Trampoline.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    // hideAllChildren
    Trampoline.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    Trampoline.prototype.setInitAllData = function () {
        this.setSkinData();
        this.setJumpeHeight();
    };
    Trampoline.prototype.setJumpeHeight = function () {
        this.JUMP_DISTANCE = this.changeToPixel(this.JUMP_DISTANCE);
    };
    Trampoline.prototype.setSkinData = function () {
        var self = this;
        this.skinsData = {
            'normal': {
                'up': self.tramTopDefault,
                'down': self.tramDownDefault
            }
        };
        this.setThisWidthHeight({
            width: this.skinsData[this.COLOR_STATUS][this.TYPE_DOWN].width,
            height: this.skinsData[this.COLOR_STATUS][this.TYPE_DOWN].height
        });
    };
    Trampoline.prototype.playShowDownTram = function () {
        var _this = this;
        this.hideAllChildren();
        this.skinsData[this.COLOR_STATUS][this.TYPE_DOWN].visible = true;
        this.setThisWidthHeight({
            width: this.skinsData[this.COLOR_STATUS][this.TYPE_DOWN].width,
            height: this.skinsData[this.COLOR_STATUS][this.TYPE_DOWN].height
        });
        setTimeout(function () {
            _this.hideAllChildren();
            _this.skinsData[_this.COLOR_STATUS][_this.TYPE_UP].visible = true;
            _this.setThisWidthHeight({
                width: _this.skinsData[_this.COLOR_STATUS][_this.TYPE_UP].width,
                height: _this.skinsData[_this.COLOR_STATUS][_this.TYPE_UP].height
            });
        }, 50);
    };
    return Trampoline;
}(BasePage));
__reflect(Trampoline.prototype, "Trampoline");
//# sourceMappingURL=Trampoline.js.map