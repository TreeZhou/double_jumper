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
var BaseMovieClip = (function (_super) {
    __extends(BaseMovieClip, _super);
    function BaseMovieClip() {
        var _this = _super.call(this) || this;
        _this.skinType = 'default';
        _this.skinList = {
            'default': ''
        };
        return _this;
        // this.createMoveObj(dataName,dataWH);
    }
    BaseMovieClip.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    BaseMovieClip.prototype.createMoveObj = function (dataName, dataWH) {
        var data = RES.getRes(dataName + "_png");
        var textr = RES.getRes(dataName + "_json");
        var mcFactory = new egret.MovieClipDataFactory(textr, data);
        this.movePesticide = new egret.MovieClip(mcFactory.generateMovieClipData(dataName));
        this.addChild(this.movePesticide);
        this.width = dataWH.width;
        this.height = dataWH.height;
        //  return movePesticide;
    };
    return BaseMovieClip;
}(eui.Component));
__reflect(BaseMovieClip.prototype, "BaseMovieClip");
//# sourceMappingURL=BaseMovieClip.js.map