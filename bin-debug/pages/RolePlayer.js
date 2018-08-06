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
        _this.frameNum = 18; //控制帧数的数量
        _this.isDown = false; // 判断是否处于下落状态
        _this.distanceInit = 30;
        _this.distance = 30; // 每个块的距离
        _this.playerIsMove = true; // 角色是否可以移动
        _this.endGame = false;
        _this.stageDistance = 30;
        // private longBg:eui.Image;
        _this.stickNum = 20;
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
        this.setInitDataGame(); // 设置游戏的开始速度
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
        this.jumpHeightHight = this.stage.$stageHeight * 0.4;
        this.player.visible = true;
        this.distance = this.distanceInit;
        this.playerIsMove = true;
        this.endGame = false;
        this.player.$y = this.stage.$stageHeight * 0.8 - this.player.height;
        // this.longBg.$y = 0;
    };
    /**
     * 设置涂鸦的初始加速度
     */
    RolePlayer.prototype.setStartAddSpeed = function () {
        this.nowAddSpeed = Math.abs(this.jumpHeightHight - this.jumpStartY) / this.frameNum / this.frameNum;
        this.nowAddDownSped = Math.abs(this.jumpHeightHight - this.jumpStartY) / this.frameNum / this.frameNum;
    };
    /**
     * 	设置涂鸦的跳跃速度
     */
    RolePlayer.prototype.setStartJumpeSpeed = function () {
        this.nowAddSpeed = Math.abs(this.jumpHeightHight - this.jumpStartY) / this.frameNum / this.frameNum;
        // this.initSpeed = Math.abs(this.jumpHeightHight-this.jumpStartY)/this.frameNum;
        this.nowSpeed = Math.abs(this.jumpHeightHight - this.jumpStartY) / this.frameNum;
    };
    RolePlayer.prototype.orientationEvent = function () {
        var _self = this;
        if (wx && wx.onAccelerometerChange) {
            wx.onAccelerometerChange(function (value) {
                console.log('value', value.x);
                _self.handleFuncWx(value);
            });
        }
        else {
            this.orientation = new egret.DeviceOrientation();
            // this.orientation = new egret.Motion();
            // window.addEventListener("deviceorientation", this.handleFunc.bind(this), true);
            //添加事件监听器
            this.orientation.addEventListener(egret.Event.CHANGE, this.handleFunc, this);
            //开始监听设备方向变化
            this.orientation.start();
        }
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
    RolePlayer.prototype.handleFuncWx = function (res) {
        // console.log('摇动',e);
        // let angle = Math.atan2(-res.x, Math.sqrt(res.y * res.y + res.z * res.z)) * 57.3;
        console.log();
        if (res.x > 0.01) {
            this.speedX = res.x * this.stage.$stageWidth / 9;
        }
        else if (res.x < -0.01) {
            this.speedX = res.x * this.stage.$stageWidth / 9;
        }
        // alert(e);
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
        var i = 0;
        var y = this.stage.$stageHeight;
        var pedalObj = null;
        while (y > 0) {
            pedalObj = this.createSticket(this.stage.$stageHeight, i);
            y = pedalObj.$y;
            i++;
        }
        this.lastPetalY = y - pedalObj.height;
        this.petalHeight = pedalObj.height;
        console.log('最后一个y', this.lastPetalY);
    };
    RolePlayer.prototype.createSticket = function (initY, num) {
        var stickObj = null;
        stickObj = new StickItem();
        stickObj.isHit = false;
        this.stickList.addChild(stickObj);
        stickObj.$y = initY - (this.distance + stickObj.height) * num;
        stickObj.$x = Math.random() * (this.stage.stageWidth - stickObj.width);
        return stickObj;
    };
    RolePlayer.prototype.beginAnimateEvent = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    RolePlayer.prototype.onEnterFrame = function () {
        // console.log('哈哈',this.player.$y);
        if (this.playerIsMove) {
            this.moveplayerY();
        }
        this.moveplayerX();
        this.stickMove();
        this.checkOverStick();
        this.addNewPetals();
        if (this.isDown) {
            this.checkHitMove();
        }
        if (this.endGame) {
            this.gotoMoveBg();
        }
        else {
            this.checkIsGameOver();
        }
    };
    RolePlayer.prototype.moveplayerY = function () {
        // console.log('人物',this.player.$y,this.jumpStartY,this.nowSpeed);
        // this.setStartJumpeSpeed();
        if (this.nowSpeed < 0) {
            this.isDown = true;
            this.nowSpeed = this.nowSpeed - this.nowAddDownSped;
        }
        else {
            this.isDown = false;
            this.nowSpeed = this.nowSpeed - this.nowAddSpeed;
        }
        // this.nowSpeed = this.nowSpeed-this.nowAddSpeed;
        this.player.$y = this.player.$y - this.nowSpeed;
        // if(this.player.$y<this.jumpHeightHight) {
        // 	this.isDown = true;
        // }else if((this.player.$y-this.player.width)>this.jumpStartY){
        // 	this.isDown = false;
        // }
        // if(!this.isDown) {
        // 	this.nowSpeed = this.nowSpeed+this.nowAddSpeed;
        // 	// this.player.$y -= 20;
        // 			// this.nowSpeed = this.nowSpeed-this.nowAddSpeed;
        // }else {
        // 	this.nowSpeed = this.nowSpeed-this.nowAddSpeed;
        // 	// this.player.$y += 20;
        // }
        // this.player.$y = this.player.$y + this.nowSpeed;
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
        var playerW = this.player.width;
        var playerH = this.player.height;
        var itemMaxX = null;
        var itemMinX = null;
        var itemMaxY = null;
        var itemMinY = null;
        for (var i = 0; i < len; i++) {
            item = this.stickList.$children[i];
            itemMaxX = item.$x + item.width - playerW / 5;
            itemMinX = item.$x - playerW / 3;
            itemMaxY = item.$y + item.height;
            itemMinY = item.$y;
            if (playerX > itemMinX && playerX < itemMaxX && playerY - itemMinY >= 0.1 && playerY - itemMaxY <= 0.1) {
                this.jumpStartY = itemMinY;
                // this.isDown = false;
                // this.player.$y = itemMinY - this.player.height;
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
        if (this.player.$y + this.player.height >= this.stage.$stageHeight) {
            // this.playerIsMove = false;
            this.endGame = true;
            this.jumpStartY = this.stage.$stageHeight * 2;
            this.setStartJumpeSpeed();
            this.nowAddDownSped = this.nowAddDownSped * 3;
        }
    };
    RolePlayer.prototype.gotoMoveBg = function () {
        this.removeAllStickList();
        // if(this.longBg.$y+(this.longBg.height-this.stage.$stageHeight)<=60) {
        // 	this.endPlayerMove();
        // }else {
        // 	this.longBg.$y =  this.longBg.$y - 60;
        // }
        if (this.player.$y > this.stage.$stageHeight && this.nowSpeed < 0) {
            this.gameOver();
        }
    };
    // private endPlayerMove() {
    // 	this.player.$y = this.player.$y + 30;
    // 	if(this.player.$y>this.stage.$stageHeight*0.8) {
    // 		this.gameOver();
    // 	}
    // }
    RolePlayer.prototype.gameOver = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.player.visible = false;
        // this.orientation.stop();
        this.playBtnBox.visible = true;
    };
    RolePlayer.prototype.removeAllStickList = function () {
        this.stickList.removeChildren();
    };
    RolePlayer.prototype.stickMove = function () {
        var list = this.stickList.$children;
        var len = list.length;
        var item = null;
        var speed;
        if ((this.jumpStartY - this.stage.$stageHeight * 0.8) < 0.1 && this.nowSpeed > 0) {
            for (var i = 0; i < len; i++) {
                item = list[i];
                speed = Math.abs(this.jumpStartY - this.stage.$stageHeight) / this.frameNum;
                item.$y = item.$y + speed; // this.frameNum
                if (item && item.isHit) {
                    this.jumpStartY = item.$y - this.player.height;
                }
            }
            this.lastPetalY = this.lastPetalY + speed;
        }
        // else if(this.nowSpeed<0 && this.player.$y+this.player.height>=this.stage.$stageHeight) {
        // 		for(let i = 0;i<len;i++) {
        // 		item = list[i];
        // 		item.$y = item.$y +this.nowSpeed*1.5;
        // 		this.player.$y = this.stage.$stageHeight*0.9;
        // 	}
        // }
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
            // nowLen = this.stickList.$children.length;
            // nowList = this.stickList.$children;
            // for(let k=0;k<removeChildList.length;k++) {
            // 	this.stickList.addChild(removeChildList[k]);
            // 	removeChildList[k].$y = 0-this.distance-removeChildList[k].height-Math.abs(this.nowSpeed);
            // 	removeChildList[k].$x = Math.random()*(this.stage.$stageWidth-removeChildList[k].width);
            // }
        }
    };
    RolePlayer.prototype.addNewPetals = function () {
        var i = 0;
        var y = 0;
        var pedalObj = null;
        if (this.lastPetalY > this.stageDistance + this.petalHeight) {
            this.distance = this.distance + 5;
            while (y > -this.stage.$stageHeight) {
                pedalObj = this.createSticket(0, i);
                y = pedalObj.$y;
                i++;
            }
            this.lastPetalY = y - pedalObj.height;
            this.stageDistance = this.stageDistance + 2;
        }
    };
    return RolePlayer;
}(eui.Component));
__reflect(RolePlayer.prototype, "RolePlayer");
//implements  eui.UIComponent  
//# sourceMappingURL=RolePlayer.js.map