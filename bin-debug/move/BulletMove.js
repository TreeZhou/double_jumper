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
var BulletMove = (function (_super) {
    __extends(BulletMove, _super);
    function BulletMove() {
        var _this = _super.call(this) || this;
        _this.speedY = 20; // 子弹的速度
        return _this;
    }
    BulletMove.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.setInitData();
    };
    BulletMove.prototype.setInitData = function () {
        this.gameLevel = new GameLevel();
    };
    /**
     * 创建子弹
     */
    BulletMove.prototype.createBullet = function (playerItem) {
        var bullet;
        bullet = this.gameLevel.createSkinObj('bulletProp');
        this.addChild(bullet);
        bullet.$x = playerItem.$x;
        bullet.$y = playerItem.$y - playerItem.height / 2;
    };
    /**
     * 子弹移动
     */
    BulletMove.prototype.bulletMoveY = function () {
        var list = this.$children;
        if (list.length) {
            for (var i = 0; i < list.length; i++) {
                list[i].$y = list[i].$y - this.speedY;
            }
        }
    };
    /**
     * 移除子弹
     */
    BulletMove.prototype.removeBullet = function (obj) {
        var list = obj.$children;
        var item = null;
        if (list.length) {
            for (var i = 0; i < list.length; i++) {
                var item_1 = list[i];
                if (item_1.$y < 0) {
                    obj.removeChild(item_1);
                    this.gameLevel.recycleObj(item_1, item_1.TYPE_NAME);
                }
            }
        }
    };
    /**
     * 检查子弹是否撞击怪物
     */
    BulletMove.prototype.checkIsHitMonster = function (obj, monster) {
        var list = obj.$children;
        var item, itemMinX, itemMaxX, itemMaxY, itemMinY, monsterMinX, monsterMinY, monsterMaxX, monsterMaxY;
        if (list.length) {
            monsterMinX = monster.$x;
            monsterMaxX = monster.$x + monster.width;
            monsterMinY = monster.$y;
            monsterMaxY = monster.$y + monster.height;
            for (var i = 0; i < list.length; i++) {
                item = list[i];
                itemMinX = item.$x;
                itemMaxX = item.$x + item.width;
                itemMaxY = item.$y + item.height;
                itemMinY = item.$y;
                if (item.visible && monster.visible && monsterMaxY > 0 && itemMaxX >= monsterMinX && itemMinX <= monsterMaxX && itemMinY <= monsterMaxY && itemMinY >= monsterMinY) {
                    monster.visible = false;
                    item.visible = false;
                }
            }
        }
    };
    return BulletMove;
}(eui.Component));
__reflect(BulletMove.prototype, "BulletMove");
//# sourceMappingURL=BulletMove.js.map