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
var StagePropClass = (function (_super) {
    __extends(StagePropClass, _super);
    function StagePropClass() {
        var _this = _super.call(this) || this;
        _this.TYPE_STAUTS = "trampoline";
        _this.TYPE_SPRING = "spring"; // 弹簧
        _this.TYPE_TRAMPOLINE = "trampoline"; // 弹簧床
        _this.TYPE_SPRING_SHOE = "springShoe"; // 弹簧鞋
        _this.TYPE_BAMBOO_FLY = "wing"; // 竹蜻蜓
        _this.TYPE_ROCKET_SHIP = "rocket"; // 火箭飞行器
        _this.TYPE_PROTECTION_COVER = "protectionCover"; // 保护罩
        _this.TYPE_DIAMOND = "diamond"; // 钻石
        _this.TYPE_MOREONE_LIFE = "moreOneLife"; // 更多一条命
        _this.UP_DISTANCE = 80;
        _this.DOWN_DISTANCE = 100;
        return _this;
    }
    StagePropClass.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    StagePropClass.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.setSkinPropData();
    };
    StagePropClass.prototype.setSkinPropData = function () {
        var self = this;
        this.skinPropData = {
            'normal': {
                'trampoline': Trampoline,
                'wing': WingProp,
                'rocket': RocketProp
            }
        };
        this.allPropsPool = {
            'trampoline': [],
            'wing': [],
            'rocket': [],
        };
    };
    StagePropClass.prototype.setTypeStatus = function (keyValue) {
        this.TYPE_STAUTS = keyValue;
    };
    StagePropClass.prototype.addPropToStage = function (stageBox, referStick) {
        var item = this.createPorps();
        stageBox.addChild(item);
        this.UP_DISTANCE = item.UP_DISTANCE;
        this.DOWN_DISTANCE = item.DOWN_DISTANCE;
        item.$x = this.setPropsX(item, referStick);
        item.$y = referStick.$y - item.height;
        return item;
    };
    StagePropClass.prototype.createPorps = function () {
        var item = this.skinPropData[this.COLOR_STATUS][this.TYPE_STAUTS];
        var propsList = this.allPropsPool[this.TYPE_STAUTS];
        if (propsList.length) {
            item = propsList[0];
            propsList.shift();
        }
        else {
            item = new item();
        }
        return item;
    };
    StagePropClass.prototype.setPropsX = function (propsItem, referStick) {
        var randomNum = Math.random();
        var itemX = 0;
        if (randomNum > 0.5) {
            itemX = referStick.$x + 10;
        }
        else {
            itemX = referStick.$x + referStick.width - propsItem.width - 10;
        }
        return itemX;
    };
    return StagePropClass;
}(BasePage));
__reflect(StagePropClass.prototype, "StagePropClass");
//# sourceMappingURL=StagePropClass.js.map