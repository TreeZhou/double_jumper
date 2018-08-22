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
        _super.prototype.childrenCreated.call(this);
        this.eventListen();
        var img = new DouDing();
        console.log(img.width, img.height, img);
        this.addChild(img);
        // setTimeout(()=>{
        // 	img.changeBaseImg('purpleSmallMonster');
        // 	// img.baseImg.texture = RES.getRes('bean_face_spring_down_normal_png');
        // 	//  img.baseImg.texture = null;
        // 	 console.log(img.baseImg);
        // },1500)
        // var image = new eui.Image();
        // image.source = "bean_face_normal_png";
        // console.log(image.width,image.height,image);
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
}(BaseNormalPage));
__reflect(GameFirstPage.prototype, "GameFirstPage");
//# sourceMappingURL=GameFirstPage.js.map