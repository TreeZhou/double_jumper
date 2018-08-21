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
var StickItem = (function (_super) {
    __extends(StickItem, _super);
    function StickItem() {
        var _this = _super.call(this) || this;
        _this.meter = 0;
        _this.TYPE_NAME = "sticket";
        _this.TYPE_STATUS = 'fixation'; // 踏板的状态
        _this.TYPE_FIXATION = 'fixation'; // 固定不动状态
        _this.TYPE_HORIZONTAL = 'horizontal'; // 水平移动
        _this.TYPE_HIT_DISABLE = 'hitDisable'; // 撞击无效，可自动断裂
        _this.TYPE_ONECE_HIT = 'oneceHit'; // 只检测碰撞一次
        _this.TYPE_TIMING = 'timing'; // 定时消失
        // public COLOR_STATUS:string='normal';
        // public COLOR_DEFAULE:string='normal';
        _this.initSpeed = 2;
        _this.speed = 2;
        _this.JUMP_DISTANCE = 60;
        _this.SHOW_PROBABILITY = [0.4, 0.5, 0.6, 0.7, 1];
        _this.isPlayWood = false;
        return _this;
    }
    StickItem.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    StickItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.setInitAllData();
        // this.initStickClothData();
        // this.setRandomStick();
        // this.setInitLeftOrRightMove();
        // this.setJumpeHeight();
        // 'waterDefaultMove'
        // let movePescide = this.createMoveObj("woodDefaultMove",this.waterMoveDefault);
        // console.log('rena',movePescide,this.waterMoveDefault);
        // this.waterMoveCilpDefault = movePescide;
        // movePescide.play();
    };
    StickItem.prototype.setInitAllData = function () {
        this.initStickClothData();
        this.setInitLeftOrRightMove();
        this.setJumpeHeight();
    };
    StickItem.prototype.resetIniData = function () {
        this.visible = true;
        this.waterMoveCilpDefault.gotoAndStop(0);
        this.woodMoveCilpDefault.gotoAndStop(0);
        this.isPlayWood = false;
    };
    StickItem.prototype.setJumpeHeight = function () {
        this.JUMP_DISTANCE = this.changeToPixel(this.JUMP_DISTANCE);
    };
    StickItem.prototype.initStickClothData = function () {
        var self = this;
        this.woodMoveCilpDefault = this.createMoveObj("woodDefaultMove", this.woodMoveDefault);
        this.waterMoveCilpDefault = this.createMoveObj("waterDefaultMove", this.waterMoveDefault);
        this.stickClothDataList = {
            normal: {
                fixation: [
                    self.stickDefaultSoil,
                    self.stickDefaultStone
                ],
                horizontal: [
                    self.stickDefaultLeaf
                ],
                hitDisable: [
                    self.waterMoveDefault
                ],
                oneceHit: [
                    self.stickDefaultCloud
                ],
                timing: [
                    self.woodMoveDefault
                ]
            }
        };
        this.setThisWidthHeight({
            width: 126,
            height: 32
        });
    };
    StickItem.prototype.setStickTypeName = function (typeName) {
        this.setTypeStick(typeName);
        this.showStickImg();
    };
    StickItem.prototype.setInitLeftOrRightMove = function () {
        var random = Math.random();
        if (random > 0.5) {
            this.speed = this.initSpeed;
        }
        else {
            this.speed = -this.initSpeed;
        }
    };
    StickItem.prototype.leftAndRightMove = function () {
        if (this.x + this.width >= this.stage.$stageWidth) {
            this.speed = -this.initSpeed;
        }
        else if (this.x <= 0) {
            this.speed = this.initSpeed;
        }
        this.x = this.x + this.speed;
    };
    StickItem.prototype.setTypeStick = function (type) {
        switch (type) {
            case this.TYPE_HORIZONTAL:
                this.TYPE_STATUS = this.TYPE_HORIZONTAL;
                break;
            case this.TYPE_ONECE_HIT:
                this.TYPE_STATUS = this.TYPE_ONECE_HIT;
                break;
            case this.TYPE_HIT_DISABLE:
                this.TYPE_STATUS = this.TYPE_HIT_DISABLE;
                break;
            case this.TYPE_TIMING:
                this.TYPE_STATUS = this.TYPE_TIMING;
                break;
            default:
                this.TYPE_STATUS = this.TYPE_FIXATION;
                break;
        }
    };
    StickItem.prototype.showStickImg = function () {
        var nowStick;
        this.hideAllChildren();
        nowStick = this.randomShowSameType(this.stickClothDataList[this.COLOR_STATUS][this.TYPE_STATUS]);
        nowStick.visible = true;
        this.setThisWidthHeight({
            width: nowStick.width,
            height: nowStick.height
        });
    };
    StickItem.prototype.playOneceClip = function (callback) {
        var _this = this;
        setTimeout(function () {
            if (_this.TYPE_STATUS === _this.TYPE_ONECE_HIT) {
                callback();
            }
        }, 20);
    };
    StickItem.prototype.playDiasbleHitClip = function (callback) {
        this.waterMoveCilpDefault.play();
        this.waterMoveCilpDefault.addEventListener('complete', function () {
            if (this.TYPE_STATUS === this.TYPE_HIT_DISABLE) {
                callback();
            }
        }, this);
    };
    StickItem.prototype.setTimingSticket = function (timeNum, callback) {
        var _this = this;
        this.isPlayWood = true;
        setTimeout(function () {
            var self = _this;
            _this.woodMoveCilpDefault.play();
            _this.woodMoveCilpDefault.addEventListener('complete', function () {
                if (self.TYPE_STATUS === self.TYPE_TIMING) {
                    callback(self);
                }
            }, _this);
        }, timeNum);
    };
    return StickItem;
}(BasePage));
__reflect(StickItem.prototype, "StickItem");
//# sourceMappingURL=StickItem.js.map