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
var Stickets = (function (_super) {
    __extends(Stickets, _super);
    function Stickets() {
        var _this = _super.call(this) || this;
        _this.HIT_TYPE = 'sticket';
        _this.MOVE_STATUS = 'fixation';
        _this.MOVE_FIXATION = 'fixation'; // 固定不动
        _this.MOVE_HORZONTAL = 'horzontal'; //  水平移动
        _this.MOVE_VERTICAL = 'vertical'; // 垂直移动
        _this.addSpeed = 2; //左右恒定的加速度 
        _this.nowSpeed = 2; //左右的速度
        _this.verAddSpeed = 2; // 垂直恒定加速度
        _this.verNowSpeed = 2; // 垂直速度
        _this.verDistance = 600; // 垂直的位移
        _this.JUMP_DISTANCE = 80;
        return _this;
    }
    Stickets.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Stickets.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.setInitData();
    };
    Stickets.prototype.setInitData = function () {
        this.setInitHorzontalData();
        this.caculateJumpDistance();
    };
    Stickets.prototype.setInitHorzontalData = function () {
        var random = Math.random();
        if (random > 0.5) {
            this.nowSpeed = this.addSpeed;
            this.verNowSpeed = this.verAddSpeed;
        }
        else {
            this.nowSpeed = -this.addSpeed;
            this.verNowSpeed = -this.verAddSpeed;
        }
    };
    Stickets.prototype.caculateJumpDistance = function () {
        this.JUMP_DISTANCE = this.changeToPixel(this.JUMP_DISTANCE);
    };
    /**
     * 水平移动
     */
    Stickets.prototype.horzontalMove = function () {
        if (this.MOVE_STATUS === this.MOVE_HORZONTAL) {
            if (this.x + this.width >= this.stage.$stageWidth) {
                this.nowSpeed = -this.addSpeed;
            }
            else if (this.x <= 0) {
                this.nowSpeed = this.addSpeed;
            }
            this.x = this.x + this.nowSpeed;
        }
    };
    /**
     * 垂直移动
     */
    Stickets.prototype.verticalMove = function () {
        var item = this.$children[0];
        if (this.MOVE_STATUS === this.MOVE_VERTICAL) {
            if (item.$y >= this.verDistance) {
                this.verNowSpeed = -this.verAddSpeed;
            }
            else if (item.$y <= 0) {
                this.verNowSpeed = this.verAddSpeed;
            }
            item.$y = item.$y + this.verNowSpeed;
        }
    };
    /**
     * 设置运动的状态
     */
    Stickets.prototype.setStickNormalMoveStatus = function (moveStatus) {
        switch (moveStatus) {
            case this.MOVE_VERTICAL:
                this.MOVE_STATUS = this.MOVE_VERTICAL;
                break;
            case this.MOVE_HORZONTAL:
                this.MOVE_STATUS = this.MOVE_HORZONTAL;
                break;
            default:
                this.MOVE_STATUS = this.MOVE_FIXATION;
                break;
        }
    };
    /**
     * 生成无序列帧跳板皮肤
     */
    Stickets.prototype.createSticketSkin = function (skinName) {
        this.mySticketSkin = new SticketSkin(skinName);
        this.addChild(this.mySticketSkin);
        this.width = this.mySticketSkin.width;
        this.height = this.mySticketSkin.height;
    };
    /**
      * 生成有序列帧的跳板水皮肤
      */
    Stickets.prototype.createMovieClipSticket = function (cliClass) {
        this.myClipSkinObj = new cliClass();
        this.addChild(this.myClipSkinObj);
        this.width = this.myClipSkinObj.width;
        this.height = this.myClipSkinObj.height;
    };
    /**
     * 每个跳板各自的技能点
     */
    Stickets.prototype.sticketSelfSkill = function () {
    };
    /**
     * 各自重置数据的函数
     */
    Stickets.prototype.resertData = function () {
        this.visible = true;
    };
    return Stickets;
}(BasePage));
__reflect(Stickets.prototype, "Stickets");
//# sourceMappingURL=Stickets.js.map