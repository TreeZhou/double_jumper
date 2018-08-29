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
        _this.bulletAngle = 90;
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
        var $childrenOne = playerItem.$children[1];
        bullet = this.gameLevel.createSkinObj('bulletProp');
        this.addChild(bullet);
        bullet.$x = playerItem.$x;
        bullet.$y = playerItem.$y - $childrenOne.$y / 2;
        // console.log('豆丁',playerItem);
        bullet.rotation = this.bulletAngle;
    };
    /**
     * 子弹移动
     */
    BulletMove.prototype.bulletMoveY = function () {
        var list = this.$children;
        var angle = null;
        if (list.length) {
            for (var i = 0; i < list.length; i++) {
                angle = list[i].rotation;
                angle = 90 - angle;
                list[i].$y = list[i].$y - Math.sin(angle * Math.PI / 180) * this.speedY; //this.speedY;
                list[i].$x = list[i].$x + Math.cos(angle * Math.PI / 180) * this.speedY;
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
    /**
     * 点击屏幕改变角度
     */
    BulletMove.prototype.changeRotation = function (event) {
        // console.log('点击事件',event, event.$stageX);
        var stageX = event.$stageX;
        var stageY = event.$stageY;
        var sourceX = this.stage.$stageWidth / 2;
        var sourceY = this.stage.$stageHeight / 2;
        var distanceX = stageX - sourceX;
        var distanceY = sourceY - stageY;
        var angle = 180 * Math.atan(distanceY / distanceX) / Math.PI;
        if (distanceX > 0) {
            angle = angle;
        }
        else {
            angle = 180 + angle;
        }
        if (angle > 135) {
            angle = 135;
        }
        if (angle < 45) {
            angle = 45;
        }
        angle = 90 - angle;
        this.bulletAngle = angle;
        return angle;
    };
    return BulletMove;
}(eui.Component));
__reflect(BulletMove.prototype, "BulletMove");
//# sourceMappingURL=BulletMove.js.map