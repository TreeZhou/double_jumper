var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ObjectPool = (function () {
    function ObjectPool() {
        this.allPropsClass = {
            woodSticket: WoodSticket,
            waterSticket: WaterSticket,
            normalSticket: NormalSticket,
            verticalSticket: VerticalSticket,
            leafSticket: LeafSticket,
            cloudSticket: CloudSticket,
            monsterProp: Monster,
            mushroomProp: Mushroom,
            rocketProp: Rocket,
            spiderWebProp: SpiderWeb,
            springProp: Spring,
            springShoeProp: SpringShoe,
            wingProp: Wing,
            protectionProp: ProtectionProp,
            bulletProp: Bullet
        };
        this.allPropsPool = {
            woodSticket: [],
            waterSticket: [],
            verticalSticket: [],
            normalSticket: [],
            leafSticket: [],
            cloudSticket: [],
            monsterProp: [],
            mushroomProp: [],
            rocketProp: [],
            spiderWebProp: [],
            springProp: [],
            springShoeProp: [],
            wingProp: [],
            protectionProp: [],
            bulletProp: []
        };
    }
    ObjectPool.prototype.createSkinObj = function (recycleName, fatherObj) {
        var item = null;
        var propsList = this.allPropsPool[recycleName];
        var objClass = this.allPropsClass[recycleName];
        if (this.allPropsPool[recycleName].length) {
            item = this.allPropsPool[recycleName][0];
            this.allPropsPool[recycleName].shift();
            item.resertData();
        }
        else {
            if (fatherObj) {
                item = new objClass(fatherObj);
            }
            else {
                item = new objClass();
            }
        }
        return item;
    };
    ObjectPool.prototype.recycleObj = function (obj, typeName) {
        this.allPropsPool[typeName].push(obj);
    };
    return ObjectPool;
}());
__reflect(ObjectPool.prototype, "ObjectPool");
//# sourceMappingURL=ObjectPool.js.map