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
var DouDing = (function (_super) {
    __extends(DouDing, _super);
    function DouDing() {
        var _this = _super.call(this) || this;
        _this.frameNum = 40; // 帧率，控制速度
        _this.isDown = false; // 判断是下落还是上升状态
        _this.speedX = 0; // 左右移动的增量
        _this.isJumperTopStop = false; // 判断是否跳跃到最高点，轮到跳板运动
        _this.douDingJumperMeter = 0; // 豆丁跳跃累计的像素值
        _this.isStopCaulteScore = false; // 是否停止累计分数
        _this.isWearSpringShoes = false; // 是否正在穿弹簧鞋
        _this.isLauching = false; // 是否正在发射子弹
        _this.SIDE_STATUS = 'left';
        _this.JUMP_UP_STATUS = 'jump_up';
        _this.JUMP_DOWN_STATUS = 'jump_down';
        _this.JUMP_UP = 'jump_up';
        _this.JUMP_FACE_UP = 'jump_face_up';
        _this.WING_UP = 'wing_up';
        _this.SPRINGSHOE_UP = 'springshoe_up';
        _this.SPRINGSHOE_FACE_UP = 'springshoe_face_up';
        _this.ROCKET_UP = 'rocket_up';
        _this.JUMP_DOWN = 'jump_down';
        _this.SPRINGSHOE_DOWM = 'springshoe_down';
        _this.SPRINGSHOE_FACE_DOWN = 'springshoe_face_down';
        _this.JUMP_FACE_DOWN = 'jump_face_down';
        _this.SIDE_LEFT = 'left';
        _this.SIDE_RIGHT = 'right';
        _this.createDoudingSkin();
        return _this;
    }
    DouDing.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    DouDing.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.setInitJumperData();
    };
    /**
     * 创建豆丁皮肤
     */
    DouDing.prototype.createDoudingSkin = function () {
        this.doudingSkin = new DoudingSkin('jump_up', 'left');
        this.addChild(this.doudingSkin);
        this.width = this.doudingSkin.width;
        this.height = this.doudingSkin.height;
        this.setPlayerSkewXY();
    };
    DouDing.prototype.setInitJumperData = function () {
        this.jumpMaxHeight = this.stage.$stageHeight * 0.6;
        this.jumpDistance = this.stage.$stageHeight * 0.3;
        this.jumpStartY = this.stage.$stageHeight;
        this.setStartJumpeSpeed(this.jumpDistance, this.frameNum);
        this.setDownAddSpeed(this.jumpDistance, this.frameNum);
    };
    /**
     * 设置豆丁的锚点
     */
    DouDing.prototype.setPlayerSkewXY = function () {
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    };
    /**
     * 设置向下的加速度
     */
    DouDing.prototype.setDownAddSpeed = function (jumpStickDistan, frame) {
        var moveX = Math.abs(jumpStickDistan) * 2 / (frame * (frame + 1));
        this.nowDownAddSpeed = moveX;
    };
    /**
     * 	设置豆丁的跳跃速度
    */
    DouDing.prototype.setStartJumpeSpeed = function (jumpStickDistan, frame) {
        var moveX = Math.abs(jumpStickDistan) * 2 / (frame * (frame + 1));
        this.nowUpAddSpeed = moveX;
        this.nowSpeed = moveX * frame;
    };
    /**
     * 设置豆丁左右的状态值
     */
    DouDing.prototype.setSideStatus = function (sideString) {
        switch (sideString) {
            case this.SIDE_LEFT:
                this.SIDE_STATUS = this.SIDE_LEFT;
                break;
            case this.SIDE_RIGHT:
                this.SIDE_STATUS = this.SIDE_RIGHT;
                break;
            default:
                this.SIDE_STATUS = this.SIDE_LEFT;
        }
    };
    /**
     * 设置豆丁跳起的皮肤状态
     */
    DouDing.prototype.setSkinUpStatus = function (skinUpType) {
        switch (skinUpType) {
            case this.WING_UP:
                this.JUMP_UP_STATUS = this.WING_UP;
                break;
            case this.SPRINGSHOE_FACE_UP:
                this.JUMP_UP_STATUS = this.SPRINGSHOE_FACE_UP;
                break;
            case this.SPRINGSHOE_UP:
                this.JUMP_UP_STATUS = this.SPRINGSHOE_UP;
                break;
            case this.JUMP_FACE_UP:
                this.JUMP_UP_STATUS = this.JUMP_FACE_UP;
                break;
            case this.ROCKET_UP:
                this.JUMP_UP_STATUS = this.ROCKET_UP;
                break;
            default:
                this.JUMP_UP_STATUS = this.JUMP_UP;
        }
    };
    /**
     * 设置豆丁蹲下的皮肤状态
     */
    DouDing.prototype.setSkinDownStatus = function (skinDownType) {
        switch (skinDownType) {
            case this.SPRINGSHOE_DOWM:
                this.JUMP_DOWN_STATUS = this.SPRINGSHOE_DOWM;
                break;
            case this.SPRINGSHOE_FACE_DOWN:
                this.JUMP_DOWN_STATUS = this.SPRINGSHOE_FACE_DOWN;
                break;
            case this.JUMP_FACE_DOWN:
                this.JUMP_DOWN_STATUS = this.JUMP_FACE_DOWN;
                break;
            default:
                this.JUMP_DOWN_STATUS = this.JUMP_DOWN;
        }
    };
    /**
     * 改变豆丁的皮肤
     */
    DouDing.prototype.changeDouDingSkin = function (isHting) {
        var _this = this;
        if (isHting) {
            this.doudingSkin.changeBaseImg2(this.JUMP_UP_STATUS, this.SIDE_STATUS);
        }
        else {
            this.doudingSkin.changeBaseImg2(this.JUMP_DOWN_STATUS, this.SIDE_STATUS);
            setTimeout(function () {
                _this.doudingSkin.changeBaseImg2(_this.JUMP_UP_STATUS, _this.SIDE_STATUS);
            }, 100);
        }
    };
    /**
     * 豆丁Y轴移动
     */
    DouDing.prototype.movePlayerY = function () {
        if (this.nowSpeed < 0) {
            this.isDown = true;
            this.nowSpeed = this.nowSpeed - this.nowDownAddSpeed;
        }
        else {
            this.isDown = false;
            this.nowSpeed = this.nowSpeed - this.nowUpAddSpeed;
        }
        if (!this.isDown && this.$y > this.jumpMaxHeight || this.isDown) {
            this.$y = this.$y - this.nowSpeed;
            this.isJumperTopStop = false;
        }
        else {
            this.isJumperTopStop = true;
            if (!this.isStopCaulteScore) {
                this.douDingJumperMeter = this.douDingJumperMeter + this.nowSpeed;
            }
        }
        this.checkDoudingIsOverMaxHeight();
        this.changeDownSkin();
    };
    /**
     * 检查是否是下落状态，下落状态时需要检查豆丁处于什么状态
     */
    DouDing.prototype.changeDownSkin = function () {
        if (this.isDown) {
            if (this.isLauching) {
                if (this.isWearSpringShoes) {
                    this.setSkinDownStatus(this.SPRINGSHOE_FACE_DOWN);
                    this.setSkinUpStatus(this.SPRINGSHOE_FACE_UP);
                }
                else {
                    this.setSkinDownStatus(this.JUMP_FACE_DOWN);
                    this.setSkinUpStatus(this.JUMP_FACE_UP);
                }
            }
            else {
                if (this.isWearSpringShoes) {
                    this.setSkinDownStatus(this.SPRINGSHOE_DOWM);
                    this.setSkinUpStatus(this.SPRINGSHOE_UP);
                }
                else {
                    this.setSkinDownStatus(this.JUMP_DOWN);
                    this.setSkinUpStatus(this.JUMP_UP);
                }
            }
            this.changeDouDingSkin(true);
        }
    };
    /**
     * 检查豆丁是否超过最高点，是的话就停住，转变状态为跳板移动
     */
    DouDing.prototype.checkDoudingIsOverMaxHeight = function () {
        if (!this.isDown && this.$y > this.jumpMaxHeight || this.isDown) {
            this.$y = this.$y - this.nowSpeed;
            this.isJumperTopStop = false;
        }
        else {
            this.isJumperTopStop = true;
            this.calculateDouDingMeter();
        }
    };
    /**
    * 检查是否继续计算豆丁运动累计的像素
    */
    DouDing.prototype.calculateDouDingMeter = function () {
        if (!this.isStopCaulteScore) {
            this.douDingJumperMeter = this.douDingJumperMeter + this.nowSpeed;
        }
    };
    /**
     * 重力感应事件
     */
    DouDing.prototype.orientationEvent = function () {
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
    /**
     * 常规H5重力感应监听事件所要做的事情
     */
    DouDing.prototype.onOrientation = function (e) {
        var stage = this.stage;
        if (!stage) {
            return false;
        }
        if (e.gamma >= 0) {
            this.setSideStatus(this.SIDE_RIGHT);
        }
        else if (e.gamma < 0) {
            this.setSideStatus(this.SIDE_LEFT);
        }
        this.changeDouDingSkin(true);
        this.speedX = Math.sin(e.gamma * (Math.PI / 180)) * this.stage.$stageWidth / 22;
        // console.log('左右移动',Math.sin(e.gamma*(Math.PI/180)));
    };
    /**
     * 微信重力感应监听事件所要做的事情
     */
    DouDing.prototype.handleFuncWx = function (res) {
        var stage = this.stage;
        if (!stage) {
            return false;
        }
        if (res.x >= 0) {
            this.setSideStatus(this.SIDE_RIGHT);
        }
        else if (res.x < 0) {
            this.setSideStatus(this.SIDE_LEFT);
        }
        this.speedX = Math.sin(res.x * Math.PI / 2) * this.stage.$stageWidth / 22;
        this.changeDouDingSkin(true);
    };
    /**
     * 左右移动
     */
    DouDing.prototype.moveplayerX = function () {
        this.$x = this.$x + this.speedX;
        if (this.$x < -this.width) {
            this.$x = this.stage.$stageWidth;
        }
        else if (this.$x > this.stage.$stageWidth) {
            this.$x = -this.width;
        }
    };
    return DouDing;
}(eui.Component));
__reflect(DouDing.prototype, "DouDing");
//# sourceMappingURL=DouDing.js.map