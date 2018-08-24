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
}