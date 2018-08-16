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
var GameOverPage = (function (_super) {
    __extends(GameOverPage, _super);
    function GameOverPage() {
        return _super.call(this) || this;
    }
    GameOverPage.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GameOverPage.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.beginListenEvent();
    };
    GameOverPage.prototype.setScoreText = function (text) {
        this.scoreText.text = text;
    };
    /**
     * 监听点击事件
     */
    GameOverPage.prototype.beginListenEvent = function () {
        var _this = this;
        this.playAgain.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.parent.removeChild(_this);
            Main.gamePage = new GamePage();
            Main.instance.addChild(Main.gamePage);
            // Main.gamePage.visible = true;
            Main.gamePage.beginGame();
        }, this);
    };
    return GameOverPage;
}(BasePage));
__reflect(GameOverPage.prototype, "GameOverPage");
//# sourceMappingURL=GameOverPage.js.map