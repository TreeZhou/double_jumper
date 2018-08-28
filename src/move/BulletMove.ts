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
    private bulletAngle:number=90;

    private setInitData(){
        this.gameLevel = new GameLevel();
    }
    /**
     * 创建子弹
     */
    public createBullet(playerItem){
        let bullet:Bullet;
        let $childrenOne = playerItem.$children[1];
        bullet = this.gameLevel.createSkinObj('bulletProp');
        this.addChild(bullet);
        bullet.$x = playerItem.$x;
        bullet.$y = playerItem.$y-$childrenOne.$y/2;
        // console.log('豆丁',playerItem);
        bullet.rotation = this.bulletAngle;
    }
    /**
     * 子弹移动
     */
    public bulletMoveY(){
        let list = this.$children;
        let angle = null;
        if(list.length) {
            for(let i=0;i<list.length;i++) {
                angle = list[i].rotation;
                angle = 90-angle;
                list[i].$y = list[i].$y - Math.sin(angle*Math.PI/180)*this.speedY; //this.speedY;
                list[i].$x = list[i].$x + Math.cos(angle*Math.PI/180)*this.speedY;
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
    /**
     * 点击屏幕改变角度
     */
    public changeRotation(event){
        // console.log('点击事件',event, event.$stageX);
        let stageX = event.$stageX;
        let stageY = event.$stageY;
        let sourceX = this.stage.$stageWidth/2;
        let sourceY = this.stage.$stageHeight/2;
        let distanceX = stageX - sourceX;
        let distanceY =sourceY-stageY;

        let angle = 180*Math.atan(distanceY/distanceX)/Math.PI;

        if(distanceX>0) {
            angle = angle;
        }else {
            angle = 180 + angle;
        }

        if(angle >135) {
            angle = 135;
        }
        if(angle<45) {
            angle = 45;
        }
        angle = 90-angle;
        this.bulletAngle = angle;
     
     return angle;

    }
}