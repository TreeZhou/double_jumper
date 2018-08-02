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
var RolePlayer = (function (_super) {
    __extends(RolePlayer, _super);
    function RolePlayer() {
        var _this = _super.call(this) || this;
        _this.jumpStartY = null; // 起跳高度
        _this.frameNum = 20; //控制帧数的数量
        _this.stickNum = 15;
        _this.childList = [];
        _this.stickMoveList = [];
        _this.distance = 30;
        _this.initAddSpeed = 0.5;
        _this.hitSpeed = 13;
        _this.isStickMove = false;
        _this.hitNowNum = null;
        _this.speedX = 0;
        _this.playerChangeY = 0;
        _this.playerBeforeY = 0;
        return _this;
        // this.skinName = RolePlayer;
    }
    // private removeChildList:any=[];
    RolePlayer.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    RolePlayer.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.percentHeight = 100;
        this.gamePage.percentHeight = 100;
        this.beginListenEvent();
        // egret.Tween.get(this.player).to({x:this.stage.$stageWidth,alpha:1},500);
    };
    /**
     * 监听点击事件
     */
    RolePlayer.prototype.beginListenEvent = function () {
        var _this = this;
        this.playBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.beginGame();
            _this.playBtnBox.visible = false;
        }, this);
    };
    /**
     * 开始游戏
     */
    RolePlayer.prototype.beginGame = function () {
        this.setInitDataGame();
        this.initSticket();
        this.setStartAddSpeed();
        this.setStartJumpeSpeed();
        this.beginAnimateEvent();
        this.orientationEvent();
    };
    /**
     * 设置初始值
     */
    RolePlayer.prototype.setInitDataGame = function () {
        this.jumpStartY = this.stage.$stageHeight - this.player.height - 100;
        this.jumpHeightHight = this.stage.$stageHeight * 0.25;
        this.player.visible = true;
    };
    /**
     * 设置涂鸦的初始加速度
     */
    RolePlayer.prototype.setStartAddSpeed = function () {
        this.nowAddSpeed = Math.abs(this.jumpHeightHight - this.jumpStartY) / this.frameNum / this.frameNum;
    };
    /**
     * 	设置涂鸦的跳跃速度
     */
    RolePlayer.prototype.setStartJumpeSpeed = function () {
        // this.initSpeed = Math.abs(this.jumpHeightHight-this.jumpStartY)/this.frameNum;
        this.nowSpeed = Math.abs(this.jumpHeightHight - this.jumpStartY) / this.frameNum;
    };
    RolePlayer.prototype.orientationEvent = function () {
        this.orientation = new egret.DeviceOrientation();
        // this.orientation = new egret.Motion();
        // window.addEventListener("deviceorientation", this.handleFunc.bind(this), true);
        //添加事件监听器
        this.orientation.addEventListener(egret.Event.CHANGE, this.handleFunc, this);
        //开始监听设备方向变化
        this.orientation.start();
    };
    // private handleFunc(e:egret.MotionEvent){
    // 	let move = e.accelerationIncludingGravity.x;
    // 	console.log('摇动',e.accelerationIncludingGravity.x);
    // 	if(move>0) {
    // 		this.speedX = -move *0.8;
    // 	}else if(move<-0) {
    // 		this.speedX = -move *0.8;
    // 	}
    // 	//e.gamma>
    // }
    RolePlayer.prototype.handleFunc = function (e) {
        // console.log('摇动',e);
        if (e.gamma > 0) {
            this.speedX = e.gamma * 0.8;
        }
        else if (e.gamma < -0) {
            this.speedX = e.gamma * 0.8;
        }
    };
    // private handleFunc(e){
    // 	// console.log('摇动',e.gamma);
    // 	if(e.gamma>0) {
    // 		this.speedX = e.gamma *0.8;
    // 	}else if(e.gamma<-0) {
    // 		this.speedX = e.gamma *0.8;
    // 	}
    // }
    RolePlayer.prototype.initSticket = function () {
        for (var i = 0; i < this.stickNum; i++) {
            this.createSticket(this.stage.stageHeight, this.stickNum - i);
        }
    };
    RolePlayer.prototype.createSticket = function (initY, num) {
        var stickObj = null;
        stickObj = new StickItem();
        stickObj.isHit = false;
        this.stickList.addChild(stickObj);
        stickObj.$y = initY - (this.distance + stickObj.height) * num;
        stickObj.$x = Math.random() * (this.stage.stageWidth - stickObj.width);
    };
    RolePlayer.prototype.beginAnimateEvent = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    RolePlayer.prototype.onEnterFrame = function () {
        // console.log('哈哈',this.player.$y);
        this.moveplayerY();
        this.moveplayerX();
        this.checkHitMove();
        this.stickMove();
        this.checkOverStick();
        this.checkIsGameOver();
    };
    RolePlayer.prototype.moveplayerY = function () {
        // console.log('人物',this.player.$y,this.jumpStartY,this.nowSpeed);
        // this.setStartJumpeSpeed();
        this.nowSpeed = this.nowSpeed - this.nowAddSpeed;
        this.player.$y = this.player.$y - this.nowSpeed;
        // if(this.player.$y<this.jumpHeightHight) {
        // 	this.nowSpeed = -Math.abs(this.nowSpeed);
        // }
        // if(this.player.$y-this.jumpStartY>0.1) {
        // 	this.player.$y=this.jumpStartY;
        // 	this.nowSpeed  = this.initSpeed;
        // // this.nowSpeed = Math.abs(this.jumpHeightHight-this.jumpStartY)/120;
        // // this.nowAddSpeed = Math.abs(this.jumpHeightHight-this.jumpStartY)/120/60;
        // // this.initSpeed = Math.abs(this.jumpHeightHight-this.jumpStartY)/120;
        // }
    };
    RolePlayer.prototype.moveplayerX = function () {
        this.player.$x = this.player.$x + this.speedX;
        if (this.player.$x < -this.player.width) {
            this.player.$x = this.stage.$stageWidth;
        }
        else if (this.player.$x > this.stage.$stageWidth) {
            this.player.$x = -this.player.width;
        }
    };
    RolePlayer.prototype.checkHitMove = function () {
        var len = this.stickList.$children.length;
        var item, itemTwo;
        var playerX = this.player.$x;
        var playerY = this.player.$y + this.player.height;
        var playerW = this.player.width / 3;
        var playerH = this.player.height;
        var itemMaxX = null;
        var itemMinX = null;
        var itemMaxY = null;
        var itemMinY = null;
        for (var i = 0; i < len; i++) {
            item = this.stickList.$children[i];
            itemMaxX = item.$x + item.width - playerW;
            itemMinX = item.$x - playerW;
            itemMaxY = item.$y + item.height;
            itemMinY = item.$y;
            if (playerX > itemMinX && playerX < itemMaxX && playerY - itemMinY >= 0.1 && playerY - itemMaxY <= 0.1) {
                this.jumpStartY = itemMinY;
                this.setStartJumpeSpeed();
                item.isHit = true;
                console.log('撞击', this.jumpStartY, item.isHit);
                for (var j = 0; j < len; j++) {
                    itemTwo = this.stickList.$children[j];
                    if (i != j) {
                        itemTwo.isHit = false;
                    }
                }
                break;
            }
        }
    };
    RolePlayer.prototype.checkIsGameOver = function () {
        var list = this.stickList.$children;
        var len = list.length;
        var item = null;
        for (var i = 0; i < len; i++) {
            item = list[i];
            if (item.$y > -50) {
                break;
            }
        }
        if (i >= len) {
            this.gameOver();
        }
    };
    RolePlayer.prototype.gameOver = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.stickList.removeChildren();
        this.player.visible = false;
        // this.orientation.stop();
        this.playBtnBox.visible = true;
    };
    RolePlayer.prototype.stickMove = function () {
        var list = this.stickList.$children;
        var len = list.length;
        var item = null;
        if ((this.jumpStartY - this.stage.$stageHeight * 0.8) < 0.1 && this.nowSpeed > 0) {
            for (var i = 0; i < len; i++) {
                item = list[i];
                item.$y = item.$y + Math.abs(this.jumpStartY - this.stage.$stageHeight * 0.9) / this.frameNum;
                if (item && item.isHit) {
                    this.jumpStartY = item.$y - this.player.height;
                }
            }
        }
        else if (this.nowSpeed < 0 && this.player.$y >= this.stage.$stageHeight * 0.9) {
            for (var i = 0; i < len; i++) {
                item = list[i];
                item.$y = item.$y + this.nowSpeed * 1.5;
                this.player.$y = this.stage.$stageHeight * 0.9;
            }
        }
    };
    RolePlayer.prototype.checkOverStick = function () {
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
            nowLen = this.stickList.$children.length;
            nowList = this.stickList.$children;
            for (var k = 0; k < removeChildList.length; k++) {
                this.stickList.addChild(removeChildList[k]);
                removeChildList[k].$y = 0 - this.distance - removeChildList[k].height;
                removeChildList[k].$x = Math.random() * (this.stage.$stageWidth - removeChildList[k].width);
            }
        }
    };
    return RolePlayer;
}(eui.Component));
__reflect(RolePlayer.prototype, "RolePlayer");
//implements  eui.UIComponent  
//# sourceMappingURL=RolePlayer.js.map