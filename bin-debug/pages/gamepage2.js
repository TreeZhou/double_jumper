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
var GamePage2 = (function (_super) {
    __extends(GamePage2, _super);
    function GamePage2() {
        var _this = _super.call(this) || this;
        _this.endGame = false;
        // private doodlePlayer:eui.Component;
        _this.stickNum = 30;
        _this.childList = [];
        _this.stickMoveList = [];
        _this.isStickMove = false;
        _this.hitNowNum = null;
        _this.speedX = 0;
        _this.playerChangeY = 0;
        _this.playerBeforeY = 0;
        return _this;
    }
    GamePage2.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GamePage2.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.percentHeight = 100;
        this.percentWidth = 100;
        this.gamePage.percentHeight = 100;
        // this.beginListenEvent();  //  监听点击开始的按钮
    };
    /**
     * 监听点击事件
     */
    GamePage2.prototype.beginListenEvent = function () {
        var _this = this;
        this.playBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.beginGame();
            _this.playBtnBox.visible = false;
        }, this);
    };
    /**
     * 开始游戏
     */
    GamePage2.prototype.beginGame = function () {
        this.createDoodle();
        this.createSticket(); // 创建跳板
        this.setInitDataGame(); // 设置游戏的开始数据
        this.beginAnimateEvent(); // 开始动画监听
    };
    // 创建涂鸦
    GamePage2.prototype.createDoodle = function () {
        this.player = new DoodlePlayer();
        this.doodleBox.addChild(this.player);
        this.player.$x = this.stage.$stageWidth / 2;
        // this.player.setInitJumperData();
        this.player.orientationEvent();
    };
    //  创建跳板
    GamePage2.prototype.createSticket = function () {
        this.allSticks = new AllSticks();
        this.addChild(this.allSticks);
        this.stickList = this.allSticks.initSticket(this.stickList);
        // this.player.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddToStage, this);
    };
    GamePage2.prototype.onAddToStage = function () {
        // let list = this.stickList.$children;
        // 	console.log(list);
        // 	this.run(list);
        // // for(let i=0;i<	list.length;i++) {
        // // 	if(list.playDiasbleHitClip ) {
        // // 		list.playDiasbleHitClip (()=>{})
        // // 	}
        // // }
        var movePescide = this.createMoveObj("woodDefaultMove", this.stickList);
        console.log('rena', movePescide, this.stickList);
        // this.waterMoveCilpDefault = movePescide;
        movePescide.play();
    };
    // private run(list){
    // 	for(let i=0;i<	list.length;i++) {
    // 		if(list[i].playDiasbleHitClip) {
    // 			list[i].playDiasbleHitClip (()=>{})
    // 		}
    // 	}
    // }
    /**
     * 设置初始值
     */
    GamePage2.prototype.setInitDataGame = function () {
        this.player.visible = true;
        this.endGame = false;
        this.player.$y = this.stage.$stageHeight * 0.9;
        this.longBg.$y = 0;
        // this.nowStage = 1;
        // this.scoreText.visible = false;
        // this.getRandomPosition();  // 初始化弹簧的数据
        console.log('对象', this.player.width, this.player.height, this.player.$y, this.player.$x, this.player.anchorOffsetX, this.player.anchorOffsetY);
    };
    /**
     * 开始监听动画
     */
    GamePage2.prototype.beginAnimateEvent = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    /**
     * 动画监听函数
     */
    GamePage2.prototype.onEnterFrame = function () {
        this.player.movePlayerY();
        if (this.player.isJumperTopStop) {
            this.mapObjectMove();
        }
        this.player.moveplayerX();
        if (this.endGame) {
            this.gotoMoveBg();
        }
        else {
            this.checkIsGameOver();
            this.checkISOverStage(this.stickList, this.allSticks.recycleAllObject.bind(this.allSticks));
            this.allSticks.addNewPetals(this.stickList, this.doodleChangeToMeter(this.player.doodelMeter));
            this.allSticks.stickMoveLeftAndRight(this.stickList.$children);
        }
        if (this.player.isDown) {
            this.checkIsHitDoodle(this.stickList.$children, this.checkIsStickHit.bind(this));
            // this.checkIsHitDoodle(this.springList.$children,this.checkIsHitSpring.bind(this));
        }
        // console.log(this.stickList.$children.length);
    };
    GamePage2.prototype.checkIsGameOver = function () {
        if (this.player.$y > this.stage.$stageHeight) {
            this.player.jumpHeightHight = this.stage.$stageHeight * 0.3;
            this.player.setStartJumpeSpeed(this.stage.$stageHeight, this.player.frameNum);
            this.player.setDownAddSpeed(this.stage.$stageHeight, this.player.frameNum);
            this.endGame = true;
            this.player.isStopCaulte = true;
        }
    };
    GamePage2.prototype.gotoMoveBg = function () {
        this.removeAllList();
        if (this.player.$y > this.stage.$stageHeight + this.player.height * 1.5) {
            this.gameOver();
        }
        else {
            this.longBg.$y = this.longBg.$y - 10;
        }
    };
    GamePage2.prototype.gameOver = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.player.visible = false;
        // this.playBtnBox.visible = true;
        this.doodleBox.removeChildren();
        // this.showScoreText();
        try {
            if (wx && wx.stopAccelerometer) {
                wx.stopAccelerometer(function () {
                    console.log('停止监听左右');
                });
            }
            else {
                this.player.orientation.stop();
            }
        }
        catch (err) {
            console.log(err);
        }
        this.showPlayGameOverPage();
    };
    GamePage2.prototype.showPlayGameOverPage = function () {
        Main.gameOver = new GameOverPage();
        Main.instance.addChild(Main.gameOver);
        Main.gameOver.setScoreText(this.setScoreText());
        this.visible = false;
        this.longBg.$y = 0;
        this.parent.removeChild(this);
    };
    GamePage2.prototype.setScoreText = function () {
        var score = null;
        // console.log(this.player.jumpStartY);
        console.log('tingzhi', this.player.doodelMeter);
        score = '分数：' + Math.ceil(this.doodleChangeToMeter(this.player.doodelMeter));
        return score;
    };
    GamePage2.prototype.removeAllList = function () {
        this.stickList.removeChildren();
    };
    GamePage2.prototype.mapObjectMove = function () {
        var list = this.stickList.$children;
        // let springList = this.springList.$children;
        // let springLen = springList.length;
        var len = list.length;
        var item, springItem;
        var speed;
        speed = this.player.nowSpeed;
        for (var i = 0; i < len; i++) {
            item = list[i];
            item.$y = item.$y + speed; // this.frameNum
        }
        // for (let j = 0; j < springLen; j++) {
        // 	springItem = springList[j];
        // 	springItem.$y = springItem.$y + speed;
        // }
        this.allSticks.lastOneStickY = this.allSticks.lastOneStickY + speed;
    };
    GamePage2.prototype.checkIsHitDoodle = function (list, callback) {
        var item, itemMinX, itemMaxX, itemMaxY, itemMinY, itemHalf, itemMiddleY, pointDistance, maxDistance;
        var listLen = list.length;
        var playerMaxY = this.player.$y + this.player.anchorOffsetY;
        var playerMinY = this.player.$y - this.player.anchorOffsetY;
        var playerHalf = this.player.height / 2;
        var playerMinX = this.player.$x - this.player.anchorOffsetX + this.player.missDiastance[this.player.COLOR_STATUS];
        var playerMaxX = this.player.$x + this.player.anchorOffsetX - this.player.missDiastance[this.player.COLOR_STATUS];
        var playerMiddel = this.player.$y; //-this.player.anchorOffsetY/2 this.player.anchorOffsetY
        for (var i = 0; i < listLen; i++) {
            item = list[i];
            itemMaxX = item.$x + item.width;
            itemMinX = item.$x;
            itemMinY = item.$y;
            itemMaxY = item.$y + item.height;
            itemHalf = item.height / 2;
            itemMiddleY = itemMinY + itemHalf;
            pointDistance = itemMiddleY - playerMiddel;
            maxDistance = itemHalf + playerHalf;
            // && playerMinY<itemMinY&&pointDistance > 0 && pointDistance < maxDistance &&
            if (playerMaxX >= itemMinX && playerMinX <= itemMaxX && playerMaxY <= itemMaxY && playerMaxY >= itemMinY && item.visible) {
                if (item.TYPE_HIT_DISABLE && item.TYPE_STATUS === item.TYPE_HIT_DISABLE) {
                    // this.player.nowSpeed = this.player.nowSpeed-20;
                    item.playDiasbleHitClip(function () {
                        item.visible = false;
                    });
                    break;
                }
                if (item.TYPE_ONECE_HIT && item.TYPE_STATUS === item.TYPE_ONECE_HIT) {
                    item.playOneceClip(function () {
                        item.visible = false;
                    });
                }
                callback(item);
                break;
            }
        }
    };
    GamePage2.prototype.checkIsStickHit = function (item) {
        this.player.$y = item.$y - this.player.anchorOffsetY;
        this.player.jumpStartY = item.$y;
        if (item.TYPE_NAME === 'trampoline') {
            this.player.setStartJumpeSpeed(item.JUMP_DISTANCE, 100);
            this.player.setJumperStatus(this.player.JUMP_NORMAL);
            // this.player.isPlayCircle =true;
        }
        else if (item.TYPE_NAME === 'wing') {
            this.player.setStartJumpeSpeed(item.JUMP_DISTANCE, 200);
            this.player.setJumperStatus(this.player.JUMP_WING);
        }
        else if (item.TYPE_NAME === 'rocket') {
            this.player.setStartJumpeSpeed(item.JUMP_DISTANCE, 200);
            this.player.setJumperStatus(this.player.JUMP_ROCKET);
        }
        else {
            this.player.setStartJumpeSpeed(item.JUMP_DISTANCE, this.player.frameNum);
            this.player.setJumperStatus(this.player.JUMP_NORMAL);
        }
        this.player.changePlaySide(false);
    };
    return GamePage2;
}(BasePage));
__reflect(GamePage2.prototype, "GamePage2");
//# sourceMappingURL=gamepage2.js.map