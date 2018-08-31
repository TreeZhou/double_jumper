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
        _this.endGame = false; // 是否结束游戏
        return _this;
    }
    GamePage.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GamePage.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.percentHeight = 100;
        this.percentWidth = 100;
        this.createAllGameObj();
        Main.instance.keepScreenOn();
    };
    /**
     * 开始游戏
     */
    GamePage.prototype.beginGame = function () {
        this.createLongBg();
        this.setInitDataGame(); // 设置游戏的开始数据
        // this.beginAnimateEvent();  // 开始动画监听
        this.listenClickStageEvent(); // 屏幕点击事件
    };
    /**
     * 创建背景
     */
    GamePage.prototype.createLongBg = function () {
        this.longBg = new LongBgClass();
        this.bgBox.addChild(this.longBg);
        // console.log(this.longBg);
    };
    /**
     * 创建豆丁和跳板
     */
    GamePage.prototype.createAllGameObj = function () {
        this.createBulletMove();
        this.createDoodle();
        this.createSticket(); // 创建跳板
    };
    // 创建豆丁
    GamePage.prototype.createDoodle = function () {
        this.player = new DouDing();
        this.doodleBox.addChild(this.player);
        this.player.$x = this.stage.$stageWidth / 2;
        this.player.$y = this.stage.$stageHeight - this.player.anchorOffsetY;
        this.player.orientationEvent();
    };
    /**
     * 初始化子弹的对象
     */
    GamePage.prototype.createBulletMove = function () {
        this.bulletMoveObj = new BulletMove();
        this.doodleBox.addChild(this.bulletMoveObj);
    };
    //  创建跳板
    GamePage.prototype.createSticket = function () {
        this.allBarrier = new AllGameBarrier();
        this.addChild(this.allBarrier);
        this.stickList = this.allBarrier.initSticket(this.stickList);
    };
    /**
     * 监听屏幕的点击事件
     */
    GamePage.prototype.listenClickStageEvent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.beginSendBullet, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginLauch, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.endLauch, this);
    };
    /**
     * 点击屏幕的时候豆丁需要发射子弹
     */
    GamePage.prototype.beginSendBullet = function (event) {
        var angle = null;
        if (this.player.isCanPlayButtle) {
            angle = this.bulletMoveObj.changeRotation(event);
            this.swichChangeDoudingSkin('face');
            this.bulletMoveObj.createBullet(this.player);
            this.player.changeMagicWangRotation(angle);
        }
    };
    /**
     * 开始射击子弹
     */
    GamePage.prototype.beginLauch = function () {
        this.player.isLauching = true;
    };
    /**
     * 结束点击子弹
     */
    GamePage.prototype.endLauch = function () {
        this.player.isLauching = false;
    };
    /**
     * 设置初始值
     */
    GamePage.prototype.setInitDataGame = function () {
        this.endGame = false;
        // this.longBg.$y = 0;
    };
    /**
     * 开始监听动画
     */
    GamePage.prototype.beginAnimateEvent = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    /**
     * 动画监听函数
     */
    GamePage.prototype.onEnterFrame = function () {
        this.player.movePlayerY();
        this.player.moveplayerX();
        this.bulletMoveObj.bulletMoveY();
        if (this.player.isJumperTopStop) {
            this.mapObjectMove();
        }
        if (this.player.isDown) {
            this.checkIsHitDoodle(this.stickList.$children, this.checkDouDingHitType.bind(this), this.douDingHitProp.bind(this));
        }
        if (this.endGame) {
            this.gotoMoveBg();
        }
        else {
            this.checkIsGameOver();
            this.checkISOverStage(this.stickList, this.allBarrier.recycleAllObject.bind(this.allBarrier));
            this.allBarrier.addNewSticket(this.stickList, this.doodleChangeToMeter(this.player.douDingJumperMeter));
            this.allBarrier.barrierMoved(this.stickList.$children);
            this.bulletMoveObj.removeBullet(this.bulletMoveObj);
            this.player.setIsNoHitMonster();
            this.checkIsHitOverBar(this.stickList.$children, this.afterHitBarrier.bind(this));
        }
    };
    /**
     * 移动地图上的物体
     */
    GamePage.prototype.mapObjectMove = function () {
        var list = this.stickList.$children;
        var len = list.length;
        var item, springItem;
        var speed;
        speed = this.player.nowSpeed;
        for (var i = 0; i < len; i++) {
            item = list[i];
            if (!item.IS_OVER) {
                item.$y = item.$y + speed;
            }
        }
        if (!this.endGame) {
            this.longBg.run(speed);
        }
        this.allBarrier.lastBarrierY = this.allBarrier.lastBarrierY + speed;
    };
    // 检查是否超过屏幕底线，是的话就移除该对象
    GamePage.prototype.checkISOverStage = function (fatherBox, callback) {
        var list = fatherBox.$children;
        var len = list.length;
        var item;
        var removeChildList = [];
        var nowLen, nowList;
        for (var i = 0; i < len; i++) {
            item = list[i];
            if (item.TYPE_NAME === 'monsterProp') {
                this.bulletMoveObj.checkIsHitMonster(this.bulletMoveObj, item);
            }
            if (item.$y >= this.stage.$stageHeight) {
                removeChildList.push(item);
            }
            else {
                if (item.TYPE_NAME === 'woodSticket') {
                    item.sticketTimeSelfSkill(this.player);
                }
            }
        }
        if (removeChildList.length) {
            for (var j = 0; j < removeChildList.length; j++) {
                if (removeChildList[j]) {
                    fatherBox.removeChild(removeChildList[j]);
                    callback(removeChildList[j]);
                }
            }
        }
        return fatherBox;
    };
    /**
     * 检查是否豆丁触碰到地步，要进行游戏结束的画面
     */
    GamePage.prototype.checkIsGameOver = function () {
        if (this.player.$y > this.stage.$stageHeight) {
            this.player.jumpMaxHeight = this.stage.$stageHeight * 0.3;
            this.player.setStartJumpeSpeed(this.stage.$stageHeight, this.player.frameNum);
            this.player.setDownAddSpeed(this.stage.$stageHeight, this.player.frameNum);
            this.endGame = true;
            this.player.isStopCaulteScore = true;
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.beginSendBullet, this);
            this.doodleBox.removeChild(this.bulletMoveObj);
        }
    };
    /**
     * 进行游戏结束时的移动背景
     */
    GamePage.prototype.gotoMoveBg = function () {
        this.removeAllList();
        if (this.player.$y > this.stage.$stageHeight + this.player.height * 1.5) {
            this.gameOver();
        }
        else {
            // this.longBg.$y = this.longBg.$y - 8;
            this.longBg.runDown(25);
        }
    };
    /**
     * 当游戏画面做完之后，停止游戏的监听和画面
     */
    GamePage.prototype.gameOver = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.player.visible = false;
        this.player.removeOriginEvent();
        this.doodleBox.removeChildren();
        this.showPlayGameOverPage();
    };
    /**
     * 移除游戏界面，展示游戏结束页面
     */
    GamePage.prototype.showPlayGameOverPage = function () {
        Main.gameOver = new GameOverPage();
        Main.instance.addChild(Main.gameOver);
        Main.gameOver.setScoreText(this.setScoreText());
        this.visible = false;
        // this.longBg.$y = 0;
        this.parent.removeChild(this);
    };
    /**
     * 计算游戏的分数
     */
    GamePage.prototype.setScoreText = function () {
        var score = null;
        score = '分数：' + Math.ceil(this.doodleChangeToMeter(this.player.douDingJumperMeter));
        return score;
    };
    /**
     * 移除所有障碍物
     */
    GamePage.prototype.removeAllList = function () {
        this.stickList.removeChildren();
        // this.removeChild(this.bulletMoveObj);
    };
    /**
     * 检测是否撞击了豆丁
     */
    GamePage.prototype.checkIsHitDoodle = function (list, callback, propCallback) {
        var item, itemMinX, itemMaxX, itemMaxY, itemMinY, childrenOne;
        var listLen = list.length;
        var playerData = this.player.getDoudingPosition();
        var playerMaxY = playerData.playerMaxY;
        var playerMinY = playerData.playerMinY;
        var playerMinX = playerData.playerMinX;
        var playerMaxX = playerData.playerMaxX;
        var isHitPop = false;
        var sticketListArr = list.filter(function (item, index) {
            return item.HIT_TYPE !== 'barrier' && (item.$y + item.height) > 0;
        });
        for (var i = 0; i < sticketListArr.length; i++) {
            item = sticketListArr[i];
            isHitPop = this.checkIsHisProps(item, propCallback);
            if (isHitPop) {
                break;
            }
            childrenOne = item.$children[0];
            itemMaxX = item.$x + item.width;
            itemMinX = item.$x;
            itemMinY = item.$y + childrenOne.$y;
            itemMaxY = itemMinY + item.height;
            if (playerMaxX >= itemMinX && playerMinX <= itemMaxX && playerMaxY <= itemMaxY && playerMaxY >= itemMinY && item.visible) {
                callback(item);
                break;
            }
        }
    };
    /**
     * 检测是否撞击了怪兽或者蜘蛛网
    */
    GamePage.prototype.checkIsHitOverBar = function (list, callback) {
        var item, itemMinX, itemMaxX, itemMaxY, itemMinY, barrierList;
        if (this.player.isUpNoHitMonster) {
            return;
        }
        barrierList = list.filter(function (item, index) {
            return item.HIT_TYPE === 'barrier';
        });
        if (barrierList.length) {
            var playerData = this.player.getDoudingPosition();
            var playerMaxY = playerData.playerMaxY;
            var playerMinY = playerData.playerMinY + this.player.anchorOffsetY;
            var playerMinX = playerData.playerMinX;
            var playerMaxX = playerData.playerMaxX;
            var isTouch = false;
            for (var i = 0; i < barrierList.length; i++) {
                item = barrierList[i];
                itemMaxX = item.$x + item.width;
                itemMinX = item.$x;
                itemMinY = item.$y;
                itemMaxY = item.$y + item.height;
                if (playerMaxX >= itemMinX && playerMinX <= itemMaxX && playerMinY <= itemMaxY && playerMinY >= itemMinY && item.visible) {
                    isTouch = true;
                    callback(item, isTouch);
                    break;
                }
                else if (playerMaxX >= itemMinX && playerMinX <= itemMaxX && playerMaxY <= itemMaxY && playerMaxY >= itemMinY && item.visible) {
                    isTouch = false;
                    callback(item, isTouch);
                    break;
                }
            }
        }
    };
    /**
     * 检测豆丁是否碰撞到跳板中的道具
     *
     */
    GamePage.prototype.checkIsHisProps = function (sticketItem, callback) {
        var childList = sticketItem.$children;
        var item, itemMinX, itemMaxX, itemMaxY, itemMinY;
        var isHit = false;
        if (sticketItem.$children[1]) {
            var playerData = this.player.getDoudingPosition();
            var playerMaxY = playerData.playerMaxY;
            var playerMinY = playerData.playerMinY;
            var playerMinX = playerData.playerMinX;
            var playerMaxX = playerData.playerMaxX;
            item = sticketItem.$children[1];
            itemMaxX = item.$x + item.width + sticketItem.$x;
            itemMinX = item.$x + sticketItem.$x;
            itemMinY = item.$y + sticketItem.$y;
            itemMaxY = itemMinY + item.height + sticketItem.height;
            if (playerMaxX >= itemMinX && playerMinX <= itemMaxX && playerMaxY <= itemMaxY && playerMaxY >= itemMinY && item.visible) {
                callback(item, sticketItem);
                isHit = true;
            }
        }
        return isHit;
    };
    /**
     * 撞击或者触碰到怪兽或者蜘蛛网后要做的操作
     */
    GamePage.prototype.afterHitBarrier = function (item, isTouch) {
        var _this = this;
        if (item.TYPE_NAME === 'monsterProp') {
            if (isTouch) {
                if (!this.player.isProtecting) {
                    this.removeClickAndFrameListen();
                    this.player.gameOverMove();
                    this.shortVibrate();
                    setTimeout(function () {
                        _this.player.removeOriginEvent();
                        _this.showPlayGameOverPage();
                    }, 1000);
                }
            }
            else {
                // this.removeClickAndFrameListen();
                item.sticketSelfSkill();
                this.player.$y = item.$y - this.player.anchorOffsetY;
                this.player.jumpStartY = item.$y;
                this.player.setStartJumpeSpeed(item.JUMP_DISTANCE, this.player.frameNum * 1.5);
                this.player.changeDouDingSkin(false);
            }
        }
        else if (item.TYPE_NAME === 'spiderWebProp') {
            this.removeClickAndFrameListen();
            this.player.moveToSpiderWeb(item);
            this.player.removeOriginEvent();
            setTimeout(function () {
                _this.showPlayGameOverPage();
            }, 1000);
        }
    };
    GamePage.prototype.shortVibrate = function () {
        try {
            wx.vibrateLong({});
        }
        catch (err) {
            console.log(err);
        }
    };
    /**
     * 移除当前点击屏幕和帧率动画的监听事件
     */
    GamePage.prototype.removeClickAndFrameListen = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.beginSendBullet, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginLauch, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.endLauch, this);
    };
    /**
     * 撞击豆丁后需要做的操作
     */
    GamePage.prototype.checkDouDingHitType = function (item) {
        if (item.TYPE_NAME !== 'waterSticket') {
            this.player.$y = item.$y - this.player.anchorOffsetY;
            this.player.jumpStartY = item.$y;
            if (this.player.isWearSpringShoes) {
                this.player.setStartJumpeSpeed(item.JUMP_DISTANCE * 1.5, this.player.frameNum * 1.5);
            }
            else {
                this.player.setStartJumpeSpeed(item.JUMP_DISTANCE, this.player.frameNum);
            }
            this.player.changeDouDingSkin(false);
        }
        item.sticketSelfSkill();
    };
    /**
     * 撞击道具豆丁需要做的操作
     */
    GamePage.prototype.douDingHitProp = function (item, sticketItem) {
        if (item.TYPE_NAME === 'wingProp' || item.TYPE_NAME === 'rocketProp') {
            this.player.setStartJumpeSpeed(item.JUMP_DISTANCE, 200);
            this.player.isCanPlayButtle = false;
        }
        else if (item.TYPE_NAME === 'springShoeProp' && !this.player.isWearSpringShoes) {
            this.player.setStartJumpeSpeed(item.JUMP_DISTANCE, this.player.frameNum * 1.1);
            this.player.isWearSpringShoes = true;
            this.player.cancelSpringShoe();
        }
        else if (item.TYPE_NAME === 'protectionProp') {
            this.player.createProtectSkin();
            this.player.setStartJumpeSpeed(item.JUMP_DISTANCE, this.player.frameNum * 1.3);
        }
        else if (item.TYPE_NAME === 'mushroomProp') {
            this.player.setStartJumpeSpeed(item.JUMP_DISTANCE, this.player.frameNum * 2.5);
            this.player.rotationMove();
        }
        else {
            this.player.setStartJumpeSpeed(item.JUMP_DISTANCE, this.player.frameNum * 1.7);
        }
        this.swichChangeDoudingSkin(item.TYPE_NAME);
        this.player.$y = item.$y + sticketItem.$y - this.player.anchorOffsetY;
        this.player.jumpStartY = item.$y + sticketItem.$y;
        this.player.changeDouDingSkin(false);
        item.sticketSelfSkill();
    };
    /**
     * 根据碰撞的属性来改变豆丁的皮肤
     */
    GamePage.prototype.swichChangeDoudingSkin = function (typeName) {
        switch (typeName) {
            case 'wingProp':
                this.player.setSkinUpStatus(this.player.WING_UP);
                break;
            case 'springShoeProp':
                this.player.setSkinUpStatus(this.player.SPRINGSHOE_UP);
                break;
            case 'rocketProp':
                this.player.setSkinUpStatus(this.player.ROCKET_UP);
                break;
            case 'face':
                if (this.player.isWearSpringShoes) {
                    this.player.setSkinUpStatus(this.player.SPRINGSHOE_FACE_UP);
                }
                else {
                    this.player.setSkinUpStatus(this.player.JUMP_FACE_UP);
                }
                break;
        }
    };
    return GamePage;
}(BasePage));
__reflect(GamePage.prototype, "GamePage");
//# sourceMappingURL=GamePage.js.map