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
var GamePage = (function (_super) {
    __extends(GamePage, _super);
    function GamePage() {
        var _this = _super.call(this) || this;
        _this.playerIsMove = true; // 角色是否可以移动
        _this.endGame = false;
        _this.nowStage = 1;
        //  弹簧分阶段出现的阶级
        _this.SPRING_STAGE_LINE = [
            {
                minHeight: 200,
                maxHeight: 1000,
                num: 10
            },
            {
                minHeight: 1001,
                maxHeight: 2000,
                num: 15
            },
            {
                minHeight: 2001,
                maxHeight: 5000,
                num: 20
            },
        ];
        _this.springStageNum = []; // 用于存储每个弹簧应该出现的位置
        // private doodlePlayer:eui.Component;
        _this.stickNum = 30;
        _this.childList = [];
        _this.stickMoveList = [];
        _this.initAddSpeed = 0.5;
        _this.hitSpeed = 13;
        _this.isStickMove = false;
        _this.hitNowNum = null;
        _this.speedX = 0;
        _this.playerChangeY = 0;
        _this.playerBeforeY = 0;
        return _this;
    }
    GamePage.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GamePage.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.percentHeight = 100;
        this.percentWidth = 100;
        this.gamePage.percentHeight = 100;
        this.beginListenEvent(); //  监听点击开始的按钮
    };
    /**
     * 监听点击事件
     */
    GamePage.prototype.beginListenEvent = function () {
        var _this = this;
        this.playBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.beginGame();
            _this.playBtnBox.visible = false;
        }, this);
    };
    /**
     * 开始游戏
     */
    GamePage.prototype.beginGame = function () {
        this.createDoodle();
        this.createSticket(); // 创建跳板
        this.setInitDataGame(); // 设置游戏的开始数据
        this.beginAnimateEvent(); // 开始动画监听
    };
    // 创建涂鸦
    GamePage.prototype.createDoodle = function () {
        this.player = new DoodlePlayer();
        this.doodleBox.addChild(this.player);
        this.player.$x = this.stage.$stageWidth / 2;
    };
    //  创建跳板
    GamePage.prototype.createSticket = function () {
        this.allSticks = new AllSticks();
        this.addChild(this.allSticks);
        this.stickList = this.allSticks.initSticket(this.stickList, this.nowStage);
    };
    /**
     * 设置初始值
     */
    GamePage.prototype.setInitDataGame = function () {
        this.player.visible = true;
        this.playerIsMove = true;
        this.endGame = false;
        this.player.$y = this.stage.$stageHeight * 0.9;
        this.longBg.$y = 0;
        this.nowStage = 1;
        this.springStageNum = [];
        this.nowSpringNumber = 0;
        // this.scoreText.visible = false;
        // this.getRandomPosition();  // 初始化弹簧的数据
        console.log('对象', this.player.width, this.player.height, this.player.$y, this.player.$x, this.player.anchorOffsetX, this.player.anchorOffsetY);
    };
    GamePage.prototype.beginAnimateEvent = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    GamePage.prototype.onEnterFrame = function () {
        if (this.playerIsMove) {
            this.player.movePlayerY();
        }
        if (this.player.isJumperTopStop) {
            this.mapObjectMove();
        }
        this.player.moveplayerX();
        this.checkListOverMapObject(this.stickList);
        this.nowStage = this.allSticks.addNewPetals(this.stickList, this.nowStage);
        this.allSticks.stickMoveLeftAndRight(this.stickList.$children);
        if (this.player.isDown) {
            this.checkIsHitDoodle(this.stickList.$children, this.checkIsStickHit.bind(this));
            // this.checkIsHitDoodle(this.springList.$children,this.checkIsHitSpring.bind(this));
        }
        // console.log(this.stickList.$children.length);
        // if (this.endGame) {
        // 	this.gotoMoveBg();
        // } else {
        // 	this.checkIsGameOver();
        // }
    };
    GamePage.prototype.mapObjectMove = function () {
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
    GamePage.prototype.checkIsHitDoodle = function (list, callback) {
        var item, itemMinX, itemMaxX, itemMaxY, itemMinY, itemHalf, itemMiddleY, pointDistance, maxDistance;
        var listLen = list.length;
        var playerMaxY = this.player.$y;
        var playerMinY = this.player.$y - this.player.anchorOffsetY;
        var playerHalf = this.player.height / 2;
        var playerMinX = this.player.$x - this.player.anchorOffsetX;
        var playerMaxX = this.player.$x + this.player.anchorOffsetX;
        var playerMiddel = this.player.$y - this.player.anchorOffsetY / 2;
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
            if (playerMaxX >= itemMinX && playerMinX <= itemMaxX && playerMinY < itemMinY && pointDistance > 0 && pointDistance < maxDistance && item.visible) {
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
    GamePage.prototype.checkIsStickHit = function (item) {
        this.player.$y = item.$y;
        this.player.jumpStartY = item.$y;
        this.player.setStartJumpeSpeed(this.player.jumpStickDistan, this.player.frameNum);
        this.player.changePlaySide(false);
    };
    GamePage.prototype.checkListOverMapObject = function (checkList) {
        var list = checkList.$children;
        var len = list.length;
        var item;
        var removeChildList = [];
        var nowLen, nowList;
        for (var i = 0; i < len; i++) {
            item = list[i];
            if (item.$y >= this.stage.$stageHeight) {
                item.isHit = false;
                removeChildList.push(item);
            }
        }
        if (removeChildList.length) {
            for (var j = 0; j < removeChildList.length; j++) {
                if (removeChildList[j]) {
                    checkList.removeChild(removeChildList[j]);
                }
            }
        }
    };
    return GamePage;
}(BasePage));
__reflect(GamePage.prototype, "GamePage");
//# sourceMappingURL=GamePage.js.map