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
        this.percentWidth = 100;
        this.percentHeight = 100;
        // this.addEventListener(egret.Event.ADDED_TO_STAGE,function(){
        // 		console.log('舞台',this.stage.$stageHeight);
        // },this);
        // let img = new NormalSticket();
        // console.log(img.width,img.height,img);
        // let pley= new Spring(img);
        // img.addChild(pley);
        // this.addChild(img);
        // img.$x = this.stage.$stageWidth/2;
        // img.$y = this.stage.$stageHeight/2;
        // console.log(img.width,img.height,img);
        // var tw = egret.Tween.get( img );
        // tw.to( {x:150}, 1000 );
        // setTimeout(()=>{
        // 	// img.changeBaseImg('purpleSmallMonster');
        // 	// img.baseImg.texture = RES.getRes('bean_face_spring_down_normal_png');
        // 	//  img.baseImg.texture = null;
        // 	//  console.log(img.baseImg);
        // 	img.sticketSelfSkill();
        // },1500)
        // let caculte = new CalculatePonitXY();
        // let list = caculte.randomPointXY([{
        // 	roleObj:new WoodSticket(),
        // 	maxDistance:50,
        // 	minDistance:40
        // },
        // {
        // 	roleObj:new WoodSticket(),
        // 	maxDistance:50,
        // 	minDistance:40
        // }
        // ],this.stage.$stageHeight,this.stage.$stageWidth);
        // for(let i=0;i<list.length;i++) {
        // 	this.addChild(list[i].roleObj);
        // }
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
}(BasePage));
__reflect(GameFirstPage.prototype, "GameFirstPage");
//# sourceMappingURL=GameFirstPage.js.map