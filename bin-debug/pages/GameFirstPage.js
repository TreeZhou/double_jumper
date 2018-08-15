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
var GameFirstPage = (function (_super) {
    __extends(GameFirstPage, _super);
    function GameFirstPage() {
        return _super.call(this) || this;
    }
    GameFirstPage.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GameFirstPage.prototype.childrenCreated = function () {
        this.percentHeight = 100;
        this.percentWidth = 100;
        _super.prototype.childrenCreated.call(this);
        this.eventListen();
    };
    GameFirstPage.prototype.eventListen = function () {
        this.beginPlayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showPlayGamePage, this);
    };
    GameFirstPage.prototype.showPlayGamePage = function () {
        this.parent.removeChild(this);
        Main.gamePage = new GamePage();
        Main.instance.addChild(Main.gamePage);
        Main.gamePage.beginGame();
    };
    return GameFirstPage;
}(BasePage));
__reflect(GameFirstPage.prototype, "GameFirstPage");
//# sourceMappingURL=GameFirstPage.js.map