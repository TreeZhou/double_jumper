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
        // public COLOR_STATUS:string='normal';
        // public COLOR_DEFAULE:string='normal';
        _this.initSpeed = 2;
        _this.speed = 2;
        _this.JUMP_DISTANCE = 60;
        _this.SHOW_PROBABILITY = [0.4, 0.5, 0.6, 0.7, 1];
        return _this;
    }
    StickItem.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    StickItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.initStickClothData();
        this.setRandomStick();
        this.setInitLeftOrRightMove();
        this.setJumpeHeight();
        // 'waterDefaultMove'
        // let movePescide = this.createMoveObj("woodDefaultMove",this.waterMoveDefault);
        // console.log('rena',movePescide,this.waterMoveDefault);
        // this.waterMoveCilpDefault = movePescide;
        // movePescide.play();
    };
    StickItem.prototype.setJumpeHeight = function () {
        this.JUMP_DISTANCE = this.changeToPixel(this.JUMP_DISTANCE);
    };
    StickItem.prototype.initStickClothData = function () {
        var self = this;
        this.woodMoveCilpDefault = this.createMoveObj("woodDefaultMove", this.woodMoveDefault);
        this.waterMoveCilpDefault = this.createMoveObj("waterDefaultMove", this.waterMoveDefault);
        this.stickClothDataList = {
            'normal': {
                'fixation': [
                    self.stickDefaultSoil,
                    self.stickDefaultStone
                ],
                'horizontal': [
                    self.stickDefaultLeaf
                ],
                'hitDisable': [
                    self.woodMoveDefault
                ],
                'oneceHit': [
                    self.waterMoveDefault
                ]
            }
        };
    };
    StickItem.prototype.setRandomStick = function () {
        var randomNum = Math.random();
        if (randomNum < this.SHOW_PROBABILITY[0]) {
            this.setTypeStick(this.TYPE_FIXATION);
            // this.setTypeStick(this.TYPE_HIT_DISABLE);
        }
        else if (randomNum > this.SHOW_PROBABILITY[0] && randomNum < this.SHOW_PROBABILITY[1]) {
            this.setTypeStick(this.TYPE_HORIZONTAL);
        }
        else if (randomNum > this.SHOW_PROBABILITY[1] && randomNum < this.SHOW_PROBABILITY[2]) {
            this.setTypeStick(this.TYPE_ONECE_HIT);
        }
        else if (randomNum > this.SHOW_PROBABILITY[2] && randomNum < this.SHOW_PROBABILITY[3]) {
            this.setTypeStick(this.TYPE_HIT_DISABLE);
        }
        else {
            this.setTypeStick(this.TYPE_FIXATION);
        }
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
            default:
                this.TYPE_STATUS = this.TYPE_FIXATION;
                break;
        }
    };
    StickItem.prototype.showStickImg = function () {
        var nowStick;
        this.hideAllChildren();
        // this.waterSticketMove.visible = true;
        nowStick = this.randomShowSameType(this.stickClothDataList[this.COLOR_STATUS][this.TYPE_STATUS]);
        nowStick.visible = true;
        // console.log('我的个人显/示',this.TYPE_STATUS,nowStick.width,nowStick.height);
    };
    StickItem.prototype.randomShowSameType = function (list) {
        var len = list.length;
        var randomNum, item;
        if (!len) {
            alert('随机的跳板数组长度不对!');
            return;
        }
        if (len === 1) {
            item = list[0];
        }
        else {
            randomNum = Math.floor(Math.random() * len);
            if (randomNum >= len) {
                randomNum = len - 1;
            }
            else if (randomNum < 0) {
                randomNum = 0;
            }
            item = list[randomNum];
        }
        return item;
    };
    // private hideAllChildren() {
    // 	let len = this.$children.length;
    // 	for(let i=0;i<len;i++) {
    // 		this.$children[i].visible = false;
    // 	}
    // }
    StickItem.prototype.playOneceClip = function (callback) {
        this.waterMoveCilpDefault.play();
        this.waterMoveCilpDefault.addEventListener('complete', function () {
            callback();
        }, this);
    };
    StickItem.prototype.playDiasbleHitClip = function (callback) {
        this.woodMoveCilpDefault.play();
        this.woodMoveCilpDefault.addEventListener('complete', function () {
            callback();
        }, this);
    };
    return StickItem;
}(BasePage));
__reflect(StickItem.prototype, "StickItem");
//# sourceMappingURL=StickItem.js.map