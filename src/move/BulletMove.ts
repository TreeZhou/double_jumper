class BulletMove extends eui.Component {
    constructor(){
        super();
    }
    public createChildren() {
        
        super.createChildren();
        this.setInitData();
    }
    public gameLevel:GameLevel;
    public speedY:number=20;  // 子弹的速度

    private setInitData(){
        this.gameLevel = new GameLevel();
    }
    /**
     * 创建子弹
     */
    public createBullet(playerItem){
        let bullet:Bullet;
        bullet = this.gameLevel.createSkinObj('bulletProp');
        this.addChild(bullet);
        bullet.$x = playerItem.$x;
        bullet.$y = playerItem.$y-playerItem.height/2;
    }
    /**
     * 子弹移动
     */
    public bulletMoveY(){
        let list = this.$children;
        if(list.length) {
            for(let i=0;i<list.length;i++) {
                list[i].$y = list[i].$y - this.speedY;
            }
        }
    }
    /**
     * 移除子弹
     */

    public removeBullet(obj){
        let list = obj.$children;
        let item = null;
        if(list.length) {
            for(let i=0;i<list.length;i++) {
                let item = list[i];
                if(item.$y<0) {
                    obj.removeChild(item);
                    this.gameLevel.recycleObj(item,item.TYPE_NAME);
                } 
            }
        }
    }
    /**
     * 检查子弹是否撞击怪物
     */
    public checkIsHitMonster(obj,monster){
        let list = obj.$children;
        let item, itemMinX, itemMaxX, itemMaxY, itemMinY,monsterMinX,monsterMinY,monsterMaxX,monsterMaxY;
        if(list.length) {
            monsterMinX = monster.$x;
            monsterMaxX = monster.$x+monster.width;
            monsterMinY = monster.$y;
            monsterMaxY = monster.$y+monster.height;
            for(let i=0;i<list.length;i++) {
                item = list[i];
                itemMinX = item.$x;
                itemMaxX = item.$x+item.width;
                itemMaxY = item.$y + item.height;
                itemMinY = item.$y;
                if(item.visible&&monster.visible&&monsterMaxY>0&&itemMaxX>=monsterMinX&&itemMinX<=monsterMaxX &&itemMinY <=monsterMaxY&&itemMinY>=monsterMinY) {
                    monster.visible = false;
                    item.visible = false;
                }
            }
        }
    }
}