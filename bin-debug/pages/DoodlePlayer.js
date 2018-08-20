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
var DoodlePlayer = (function (_super) {
    __extends(DoodlePlayer, _super);
    function DoodlePlayer() {
        var _this = _super.call(this) || this;
        _this.SIDE_STATUS = 'face';
        _this.SIDE_FACE = 'face';
        _this.SIDE_RIGHT = 'right'; // 右边
        _this.SIDE_LEFT = 'left'; // 左边
        _this.JUMP_STATUS = 'jump';
        _this.JUMP_NORMAL = 'jump'; // 正常跳跃的形式
        _this.JUMP_HIT = 'hit'; // 撞击到时正常形式
        _this.JUMP_WING = 'wing'; //撞击到翅膀的形式
        _this.JUMP_ROCKET = 'rocket'; //　撞击到火箭时的形式
        _this.jumpStartY = null; // 起跳高度
        _this.frameNum = 40;
        _this.isDown = false;
        _this.speedX = 0;
        _this.isPlayCircle = false;
        _this.isJumperTopStop = false;
        _this.doodelMeter = 0; // 豆丁跳跃的累计值
        _this.isStopCaulte = false; // 是否停止累计分数
        // private playerColorList:Object={};
        _this.sideStauts = [
            _this.SIDE_FACE,
            _this.SIDE_RIGHT,
            _this.SIDE_LEFT,
        ];
        _this.euiAllImageList = [];
        return _this;
    }
    DoodlePlayer.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    DoodlePlayer.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.setSideStatus(this.SIDE_STATUS);
        this.setEuiImageList();
        this.setPlayerSkewXY();
        this.setInitJumperData();
        this.setStartJumpeSpeed(this.jumpStickDistan, this.frameNum);
        this.setDownAddSpeed(this.jumpStickDistan, this.frameNum);
        // this.orientationEvent();  //　开始监听左右的加速计
        console.log(this.rotation);
    };
    DoodlePlayer.prototype.setEuiImageList = function () {
        var self = this;
        this.euiImageJumpList = {
            'normal': {
                'jump': {
                    'face': self.BeanNormalFace,
                    'left': self.BeanNormalLeft,
                    'right': self.BeanNormalRight,
                },
                'hit': {
                    'face': self.beanFaceNorDown,
                    'left': self.beanLeftNorDown,
                    'right': self.beanRightNorDown
                },
                'rocket': {
                    'face': self.beanRocketDefault,
                    'left': self.beanRocketDefault,
                    'right': self.beanRocketDefault
                },
                'wing': {
                    'face': self.beanWingFaceDefault,
                    'left': self.beanWingLeftDefault,
                    'right': self.beanWingRightDefault
                }
            }
        };
        this.missDiastance = {
            'normal': 44
        };
        // console.log('object',this.euiImageJumpList);
    };
    DoodlePlayer.prototype.setInitJumperData = function () {
        this.jumpHeightHight = this.stage.$stageHeight * 0.6;
        this.jumpStickDistan = this.stage.$stageHeight * 0.4;
        this.jumpStartY = this.stage.$stageHeight;
    };
    DoodlePlayer.prototype.setSideStatus = function (sideStatus) {
        switch (sideStatus) {
            case this.SIDE_LEFT:
                this.SIDE_STATUS = this.SIDE_LEFT;
                break;
            case this.SIDE_RIGHT:
                this.SIDE_STATUS = this.SIDE_RIGHT;
                break;
            case this.SIDE_FACE:
                this.SIDE_STATUS = this.SIDE_FACE;
                break;
            default:
                this.SIDE_STATUS = this.SIDE_FACE;
                break;
        }
    };
    DoodlePlayer.prototype.setJumperStatus = function (jumpStatus) {
        switch (jumpStatus) {
            case this.JUMP_ROCKET:
                this.JUMP_STATUS = this.JUMP_ROCKET;
                break;
            case this.JUMP_WING:
                this.JUMP_STATUS = this.JUMP_WING;
                break;
            // case this.JUMP_HIT:
            // this.JUMP_STATUS = this.JUMP_HIT;
            // break;
            case this.JUMP_NORMAL:
                this.JUMP_STATUS = this.JUMP_NORMAL;
                break;
            default:
                this.JUMP_STATUS = this.JUMP_NORMAL;
                break;
        }
    };
    DoodlePlayer.prototype.changePlaySide = function (isJumping) {
        var _this = this;
        this.hideAllPlayer();
        if (isJumping) {
            this.euiImageJumpList[this.COLOR_STATUS][this.JUMP_STATUS][this.SIDE_STATUS].visible = true;
            // this.setThisWidthHeight(this.euiImageJumpList[this.COLOR_STATUS][this.JUMP_STATUS][this.SIDE_STATUS]);
        }
        else {
            this.euiImageJumpList[this.COLOR_STATUS][this.JUMP_HIT][this.SIDE_STATUS].visible = true;
            this.euiImageJumpList[this.COLOR_STATUS][this.JUMP_STATUS][this.SIDE_STATUS].visible = false;
            // this.setThisWidthHeight(this.euiImageJumpList[this.COLOR_STATUS][this.JUMP_HIT][this.SIDE_STATUS]);
            setTimeout(function () {
                _this.euiImageJumpList[_this.COLOR_STATUS][_this.JUMP_HIT][_this.SIDE_STATUS].visible = false;
                _this.euiImageJumpList[_this.COLOR_STATUS][_this.JUMP_STATUS][_this.SIDE_STATUS].visible = true;
                // this.setThisWidthHeight(this.euiImageJumpList[this.COLOR_STATUS][this.JUMP_STATUS][this.SIDE_STATUS]);
                // console.log('当前宽高',this.width,this.height);
            }, 100);
        }
        // console.log('当前宽高',this.width,this.height);
        this.setPlayerSkewXY();
    };
    DoodlePlayer.prototype.setThisWidthHeight = function (item) {
        this.width = item.width;
        // this.height = item.height;
    };
    DoodlePlayer.prototype.hideAllPlayer = function () {
        var len = this.$children.length;
        for (var i = 0; i < len; i++) {
            this.$children[i].visible = false;
        }
    };
    DoodlePlayer.prototype.setPlayerSkewXY = function () {
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    };
    /**
     * 设置向下的加速度
     */
    DoodlePlayer.prototype.setDownAddSpeed = function (jumpStickDistan, frame) {
        var moveX = Math.abs(jumpStickDistan) * 2 / (frame * (frame + 1));
        this.nowDownAddSpeed = moveX;
    };
    /**
     * 	设置涂鸦的跳跃速度
    */
    DoodlePlayer.prototype.setStartJumpeSpeed = function (jumpStickDistan, frame) {
        var moveX = Math.abs(jumpStickDistan) * 2 / (frame * (frame + 1));
        this.nowUpAddSpeed = moveX;
        this.nowSpeed = moveX * frame;
    };
    DoodlePlayer.prototype.movePlayerY = function () {
        // debugger;
        if (this.nowSpeed < 0) {
            this.isDown = true;
            this.nowSpeed = this.nowSpeed - this.nowDownAddSpeed;
        }
        else {
            this.isDown = false;
            this.nowSpeed = this.nowSpeed - this.nowUpAddSpeed;
        }
        if (!this.isDown && this.$y > this.jumpHeightHight || this.isDown) {
            this.$y = this.$y - this.nowSpeed;
            this.isJumperTopStop = false;
        }
        else {
            this.isJumperTopStop = true;
            if (!this.isStopCaulte) {
                this.doodelMeter = this.doodelMeter + this.nowSpeed;
            }
        }
        if (this.isDown) {
            this.setJumperStatus(this.JUMP_NORMAL);
            this.changePlaySide(true);
            this.isPlayCircle = false;
        }
        else {
            if (this.isPlayCircle) {
                this.circleRun();
            }
        }
    };
    DoodlePlayer.prototype.orientationEvent = function () {
        var _this = this;
        var _self = this;
        try {
            if (wx && wx.onAccelerometerChange) {
                wx.onAccelerometerChange(this.handleFuncWx.bind(this));
            }
        }
        catch (err) {
            this.orientation = new egret.DeviceOrientation();
            //添加事件监听器
            this.orientation.addEventListener(egret.Event.CHANGE, this.onOrientation, this);
            this.orientation.start();
            document.addEventListener('keydown', function (event) {
                console.log(event.keyCode);
                switch (event.keyCode) {
                    case 65:
                        _this.setSideStatus(_this.SIDE_LEFT);
                        _this.speedX = -5;
                        break;
                    case 68:
                        _this.setSideStatus(_this.SIDE_RIGHT);
                        _this.speedX = 5;
                        break;
                }
            });
        }
    };
    DoodlePlayer.prototype.onOrientation = function (e) {
        var stage = this.stage;
        if (!stage) {
            return false;
        }
        if (e.gamma > 0) {
            this.setSideStatus(this.SIDE_RIGHT);
        }
        else if (e.gamma < 0) {
            this.setSideStatus(this.SIDE_LEFT);
        }
        else {
            this.setSideStatus(this.SIDE_FACE);
        }
        this.changePlaySide(true);
        this.speedX = Math.sin(e.gamma * (Math.PI / 180)) * this.stage.$stageWidth / 22;
        // console.log('左右移动',Math.sin(e.gamma*(Math.PI/180)));
    };
    DoodlePlayer.prototype.handleFuncWx = function (res) {
        var stage = this.stage;
        if (!stage) {
            return false;
        }
        if (res.x > 0) {
            this.setSideStatus(this.SIDE_RIGHT);
        }
        else if (res.x < 0) {
            this.setSideStatus(this.SIDE_LEFT);
        }
        else {
            this.setSideStatus(this.SIDE_FACE);
        }
        this.speedX = Math.sin(res.x * Math.PI / 2) * this.stage.$stageWidth / 22;
        this.changePlaySide(true);
    };
    DoodlePlayer.prototype.moveplayerX = function () {
        this.$x = this.$x + this.speedX;
        if (this.$x < -this.width) {
            this.$x = this.stage.$stageWidth;
        }
        else if (this.$x > this.stage.$stageWidth) {
            this.$x = -this.width;
        }
    };
    DoodlePlayer.prototype.circleRun = function () {
        this.rotation = this.nowSpeed;
    };
    return DoodlePlayer;
}(BasePage));
__reflect(DoodlePlayer.prototype, "DoodlePlayer");
//# sourceMappingURL=DoodlePlayer.js.map