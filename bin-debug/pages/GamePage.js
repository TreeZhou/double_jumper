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
        _this.frameNum = 20; //控制帧数的数量
        _this.distanceInit = 30;
        _this.distance = 10; // 每个块的距离
        _this.playerIsMove = true; // 角色是否可以移动
        _this.endGame = false;
        _this.nowStage = 1;
        _this.stageDistance = 30; // 每个阶段的间隔
        _this.JUMP_STATUS = 1; // 当前跳跃的状态
        _this.JUMP_NORMAL = 1; // 正常跳跃
        _this.JUMP_SPRING = 2; // 弹簧跳跃
        _this.STAGE_METER = 200; // 一屏等于多少米
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
        // 每个阶段跳板的最大间距
        _this.STICK_STAGE_DISTANSE = [
            {
                minHeight: 0,
                maxHeight: 1000,
                distance: 40
            },
            {
                minHeight: 1001,
                maxHeight: 2000,
                distance: 50
            },
            {
                minHeight: 2001,
                maxHeight: 4000,
                distance: 60
            },
            {
                minHeight: 4001,
                maxHeight: 6000,
                distance: 70
            },
        ];
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
    GamePage.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
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
        this.setInitDataGame(); // 设置游戏的开始数据
        this.initSticket(); // 初始化第一屏的踏板
        this.beginAnimateEvent(); // 开始动画监听
        this.orientationEvent(); //　开始监听左右的加速计
    };
    // 创建涂鸦
    GamePage.prototype.createDoodle = function () {
        this.player = new DoodlePlayer();
        this.doodleBox.addChild(this.player);
        this.player.$x = this.stage.$stageWidth / 2;
    };
    /**
     * 设置初始值
     */
    GamePage.prototype.setInitDataGame = function () {
        this.player.visible = true;
        this.preStickY = this.stage.$stageHeight;
        this.playerIsMove = true;
        this.endGame = false;
        this.player.$y = this.stage.$stageHeight * 0.8 - this.player.height;
        this.longBg.$y = 0;
        this.JUMP_STATUS = this.JUMP_NORMAL;
        this.nowStage = 1;
        this.springStageNum = [];
        this.nowSpringNumber = 0;
        this.scoreText.visible = false;
        this.getRandomPosition(); // 初始化弹簧的数据
        console.log('对象', this.player.width, this.player.height, this.player.$y, this.player.$x, this.player.anchorOffsetX, this.player.anchorOffsetY);
    };
    /**
     * 像素更换成多少米
     */
    GamePage.prototype.changeToMeter = function (y, stage) {
        var meterNum = null;
        if (y > 0) {
            meterNum = (this.stage.$stageHeight - y) / this.stage.$stageHeight * this.STAGE_METER + (stage - 1) * 200;
        }
        else {
            meterNum = (Math.abs(y)) / this.stage.$stageHeight * this.STAGE_METER + stage * 200;
        }
        return meterNum;
    };
    /**
     * 计算当前这个跳板的间距
     */
    GamePage.prototype.caculateStickDistance = function () {
        var distand = null;
        var meter = this.nowStage * this.STAGE_METER;
        var list = this.STICK_STAGE_DISTANSE;
        var len = list.length;
        for (var i = 0; i < len; i++) {
            if (meter >= list[i].minHeight && meter <= list[i].maxHeight || i >= len - 1) {
                distand = Math.ceil(Math.abs(Math.random() * (list[i].distance - this.distanceInit)) + this.distanceInit);
                break;
            }
        }
        // console.log('距离',distand);
        return distand;
    };
    GamePage.prototype.setStickSpeed = function (distanceY, frame) {
        // let frame = this.frameNum; // this.stage.$stageHeight*0.9-this.jumpStartY
        this.stickMoveSpeed = Math.abs(distanceY) * 2 / ((frame + 1));
        this.stickAddSpeed = Math.abs(distanceY) * 2 / (frame * (frame + 1));
    };
    GamePage.prototype.orientationEvent = function () {
        var _self = this;
        if (wx && wx.onAccelerometerChange) {
            wx.onAccelerometerChange(function (value) {
                console.log('value', value.x);
                _self.handleFuncWx(value);
            });
        }
        else {
            this.orientation = new egret.DeviceOrientation();
            //添加事件监听器
            this.orientation.addEventListener(egret.Event.CHANGE, this.handleFunc, this);
            //开始监听设备方向变化
            this.orientation.start();
        }
    };
    GamePage.prototype.handleFunc = function (e) {
        if (e.gamma > 0) {
            this.speedX = e.gamma * 0.8;
        }
        else if (e.gamma < -0) {
            this.speedX = e.gamma * 0.8;
        }
    };
    GamePage.prototype.handleFuncWx = function (res) {
        if (res.x > 0) {
            this.speedX = res.x * this.stage.$stageWidth / 9;
            this.player.setSideStatus(this.player.SIDE_RIGHT);
        }
        else if (res.x < 0) {
            this.speedX = res.x * this.stage.$stageWidth / 9;
            this.player.setSideStatus(this.player.SIDE_LEFT);
        }
        else {
            this.speedX = res.x * this.stage.$stageWidth / 9;
            this.player.setSideStatus(this.player.SIDE_FACE);
        }
        this.player.changePlaySide(true);
    };
    /**
     * 初始化第一屏的踏板的位置，随机为主
     */
    GamePage.prototype.initSticket = function () {
        var i = 0;
        var y = this.stage.$stageHeight;
        var pedalObj = null;
        while (y > 0) {
            pedalObj = this.createSticket(this.preStickY, i);
            y = pedalObj.$y;
            this.preStickY = pedalObj.$y;
            i++;
        }
        this.lastPetalY = y - pedalObj.height;
        this.petalHeight = pedalObj.height;
        console.log('最后一个y', this.lastPetalY);
    };
    /**
     * 创建绿色的踏板
     */
    GamePage.prototype.createSticket = function (initY, num) {
        var stickObj = null;
        // let randomPro = Math.random(); initY *num
        var spring = null;
        var distance = this.caculateStickDistance();
        stickObj = new StickItem();
        stickObj.isHit = false;
        this.stickList.addChild(stickObj);
        stickObj.$y = initY - (distance + stickObj.height);
        stickObj.$x = Math.random() * (this.stage.stageWidth - stickObj.width);
        stickObj.meter = this.changeToMeter(stickObj.$y, this.nowStage);
        // stickObj.setRandomStick();
        // console.log('米数',	stickObj.meter ,stickObj.$y);
        if (this.nowSpringNumber < this.springStageNum.length && stickObj.TYPE_STATUS === stickObj.TYPE_GREEN) {
            if (this.nowStage * this.STAGE_METER > this.springStageNum[this.nowSpringNumber] && (this.nowStage - 1) * this.STAGE_METER < this.springStageNum[this.nowSpringNumber]) {
                // debugger
                var random = Math.random();
                if (random > 0.5) {
                    this.createSpring(stickObj);
                    this.nowSpringNumber++;
                }
            }
        }
        return stickObj;
    };
    /**
     * 设置弹簧应该出现的每个阶段性位置，用数组存起来
     */
    GamePage.prototype.getRandomPosition = function () {
        var stageLen = this.SPRING_STAGE_LINE.length;
        var item, randomNum, list, minStage;
        for (var i = 0; i < stageLen; i++) {
            item = this.SPRING_STAGE_LINE[i];
            for (var j = 0; j < item.num; j++) {
                minStage = (item.maxHeight - item.minHeight) / item.num;
                randomNum = Math.ceil(Math.random() * minStage + item.minHeight + minStage * j);
                this.springStageNum.push(randomNum);
            }
        }
        list = this.springStageNum.sort(function (a, b) {
            return a - b;
        });
        this.springStageNum = list;
        console.log('阶段的数据', this.springStageNum);
    };
    /**
     * 创建弹簧
     */
    GamePage.prototype.createSpring = function (stickObj) {
        var springObj = new FloorSpring();
        var random = Math.random();
        this.springList.addChild(springObj);
        springObj.$y = stickObj.$y - springObj.height * 0.8;
        springObj.meter = this.changeToMeter(springObj.$y, this.nowStage);
        if (random > 0.5) {
            springObj.$x = stickObj.$x + stickObj.width - springObj.width * 1.2;
        }
        else {
            springObj.$x = stickObj.$x + springObj.width / 2;
        }
        return springObj;
    };
    GamePage.prototype.beginAnimateEvent = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    GamePage.prototype.onEnterFrame = function () {
        if (this.playerIsMove) {
            this.player.movePlayerY();
        }
        if (this.player.isJumperTopStop) {
            this.stickMove();
        }
        this.moveplayerX();
        this.checkOverStick();
        this.addNewPetals();
        this.stickMoveLeftAndRight();
        if (this.player.isDown) {
            this.checkIsHitDoodle(this.stickList.$children, this.checkIsStickHit.bind(this));
            this.checkIsHitDoodle(this.springList.$children, this.checkIsHitSpring.bind(this));
        }
        // if (this.endGame) {
        // 	this.gotoMoveBg();
        // } else {
        // 	this.checkIsGameOver();
        // }
    };
    GamePage.prototype.moveplayerX = function () {
        this.player.$x = this.player.$x + this.speedX;
        if (this.player.$x < -this.player.width) {
            this.player.$x = this.stage.$stageWidth;
        }
        else if (this.player.$x > this.stage.$stageWidth) {
            this.player.$x = -this.player.width;
        }
    };
    GamePage.prototype.checkIsStickHit = function (item) {
        this.player.$y = item.$y;
        this.player.jumpStartY = item.$y;
        this.JUMP_STATUS = this.JUMP_NORMAL;
        this.player.setStartJumpeSpeed(this.player.jumpStickDistan, this.frameNum);
        // this.setStickSpeed(this.stage.$stageHeight * 0.9 - this.jumpStartY, this.frameNum);
        this.player.changePlaySide(false);
    };
    GamePage.prototype.checkIsHitDoodle = function (list, callback) {
        var item, itemMinX, itemMaxX, itemMaxY, itemMinY, itemHalf, itemMiddleY, pointDistance, maxDistance;
        var listLen = list.length;
        // let playerX = this.player.$x;
        // let playerY = this.player.$y;
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
            if (playerMaxX >= itemMinX && playerMinX <= itemMaxX && playerMinY < itemMinY && pointDistance > 0 && pointDistance < maxDistance) {
                callback(item);
                break;
            }
        }
    };
    GamePage.prototype.checkIsHitSpring = function (item) {
        this.JUMP_STATUS = this.JUMP_SPRING;
        this.player.jumpStartY = item.$y;
        this.player.setStartJumpeSpeed(this.player.jumpStickDistan * 2, this.frameNum * 2);
        item.showOffenSpring();
    };
    GamePage.prototype.checkIsGameOver = function () {
        var list = this.stickList.$children;
        var len = list.length;
        var item = null;
        if (this.player.$y + this.player.height >= this.stage.$stageHeight) {
            this.setScoreText();
            this.endGame = true;
            this.player.jumpStartY = this.stage.$stageHeight * 1.5;
            this.player.setStartJumpeSpeed(this.player.jumpStickDistan * 2, this.frameNum * 2);
        }
    };
    GamePage.prototype.setScoreText = function () {
        this.scoreText.text = '分数：' + Math.ceil(this.changeToMeter(this.player.jumpStartY, this.nowStage));
    };
    GamePage.prototype.showScoreText = function () {
        this.scoreText.visible = true;
    };
    GamePage.prototype.gotoMoveBg = function () {
        this.removeAllList();
        if (this.player.$y > this.stage.$stageHeight) {
            this.gameOver();
        }
        else {
            this.longBg.$y = this.longBg.$y - 10;
        }
    };
    GamePage.prototype.gameOver = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.player.visible = false;
        this.playBtnBox.visible = true;
        this.doodleBox.removeChildren();
        this.showScoreText();
        if (wx && wx.stopAccelerometer) {
            wx.stopAccelerometer(function () {
                console.log('停止监听左右');
            });
        }
        else {
            this.orientation.stop();
        }
    };
    GamePage.prototype.removeAllList = function () {
        this.stickList.removeChildren();
        this.springList.removeChildren();
    };
    GamePage.prototype.stickMove = function () {
        var list = this.stickList.$children;
        var springList = this.springList.$children;
        var springLen = springList.length;
        var len = list.length;
        var item, springItem;
        var speed;
        speed = this.player.nowSpeed;
        for (var i = 0; i < len; i++) {
            item = list[i];
            item.$y = item.$y + speed; // this.frameNum
        }
        for (var j = 0; j < springLen; j++) {
            springItem = springList[j];
            springItem.$y = springItem.$y + speed;
        }
        this.lastPetalY = this.lastPetalY + speed;
    };
    GamePage.prototype.stickMoveLeftAndRight = function () {
        var list = this.stickList.$children;
        var len = list.length;
        var item;
        for (var i = 0; i < len; i++) {
            item = list[i];
            if (item.TYPE_STATUS === item.TYPE_HORIZONTAL) {
                item.leftAndRightMove();
            }
        }
    };
    GamePage.prototype.checkOverStick = function () {
        var list = this.stickList.$children;
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
                    this.stickList.removeChild(removeChildList[j]);
                }
            }
        }
    };
    // 当当前的最后那个跳板大于某个值，就创建下一屏的跳板
    GamePage.prototype.addNewPetals = function () {
        var i = 0;
        var y = 0;
        var pedalObj = null;
        if (this.lastPetalY > this.stageDistance + this.petalHeight) {
            this.preStickY = 0;
            this.nowStage++;
            while (y > -this.stage.$stageHeight) {
                pedalObj = this.createSticket(this.preStickY, i);
                y = pedalObj.$y;
                this.preStickY = pedalObj.$y;
                i++;
            }
            this.lastPetalY = y - pedalObj.height;
        }
    };
    return GamePage;
}(eui.Component));
__reflect(GamePage.prototype, "GamePage", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=GamePage.js.map