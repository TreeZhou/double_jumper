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
        _this.jumpStartY = null; // 起跳高度
        _this.frameNum = 20;
        _this.isDown = false;
        _this.speedX = 0;
        _this.isJumperTopStop = false;
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
        this.orientationEvent(); //　开始监听左右的加速计
    };
    DoodlePlayer.prototype.setEuiImageList = function () {
        var self = this;
        this.euiImageJumpList = {
            'normal': {
                'jumper': {
                    'face': self.BeanNormalFace,
                    'left': self.BeanNormalLeft,
                    'right': self.BeanNormalRight,
                },
                'hit': {
                    'face': self.beanFaceNorDown,
                    'left': self.beanLeftNorDown,
                    'right': self.beanRightNorDown
                }
            }
        };
        console.log('object', this.euiImageJumpList);
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
    DoodlePlayer.prototype.changePlaySide = function (isJumper) {
        var _this = this;
        this.hideAllPlayer();
        if (isJumper) {
            this.euiImageJumpList[this.COLOR_STATUS]['jumper'][this.SIDE_STATUS].visible = true;
        }
        else {
            this.euiImageJumpList[this.COLOR_STATUS]['hit'][this.SIDE_STATUS].visible = true;
            this.euiImageJumpList[this.COLOR_STATUS]['jumper'][this.SIDE_STATUS].visible = false;
            setTimeout(function () {
                _this.euiImageJumpList[_this.COLOR_STATUS]['hit'][_this.SIDE_STATUS].visible = false;
                _this.euiImageJumpList[_this.COLOR_STATUS]['jumper'][_this.SIDE_STATUS].visible = true;
            }, 100);
        }
        this.setPlayerSkewXY();
    };
    DoodlePlayer.prototype.hideAllPlayer = function () {
        var len = this.$children.length;
        for (var i = 0; i < len; i++) {
            this.$children[i].visible = false;
        }
    };
    DoodlePlayer.prototype.setPlayerSkewXY = function () {
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height;
    };
    /**
     * 	设置涂鸦的跳跃速度
    */
    DoodlePlayer.prototype.setStartJumpeSpeed = function (jumpStickDistan, frame) {
        var moveX = Math.abs(jumpStickDistan) * 2 / (frame * (frame + 1));
        this.nowDownAddSpeed = moveX;
        this.nowSpeed = moveX * frame;
    };
    DoodlePlayer.prototype.movePlayerY = function () {
        this.nowSpeed = this.nowSpeed - this.nowDownAddSpeed;
        // debugger;
        if (this.nowSpeed < 0) {
            this.isDown = true;
        }
        else {
            this.isDown = false;
        }
        if (!this.isDown && this.$y > this.jumpHeightHight || this.isDown) {
            this.$y = this.$y - this.nowSpeed;
            this.isJumperTopStop = false;
        }
        else {
            this.isJumperTopStop = true;
        }
    };
    DoodlePlayer.prototype.orientationEvent = function () {
        var _self = this;
        try {
            if (wx && wx.onAccelerometerChange) {
                wx.onAccelerometerChange(function (value) {
                    console.log('value', value.x);
                    _self.handleFuncWx(value);
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    };
    DoodlePlayer.prototype.handleFuncWx = function (res) {
        if (res.x > 0) {
            this.setSideStatus(this.SIDE_RIGHT);
        }
        else if (res.x < 0) {
            this.setSideStatus(this.SIDE_LEFT);
        }
        else {
            this.setSideStatus(this.SIDE_FACE);
        }
        this.speedX = res.x * this.stage.$stageWidth / 9;
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
    return DoodlePlayer;
}(BasePage));
__reflect(DoodlePlayer.prototype, "DoodlePlayer");
//# sourceMappingURL=DoodlePlayer.js.map