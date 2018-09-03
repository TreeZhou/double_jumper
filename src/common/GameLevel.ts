class GameLevel extends CalculatePonitXY{
    /**
     * 初始化的随机跳板
     */
    public normalInitSticketLevel(obj:{
        maxDistance:number,
        minDistance:number,
        lastY:number,
        stageW:number
    }){
        let objNum = 10;
        let list = this.getCreateClassList(['normalSticket'],objNum,obj.maxDistance,obj.minDistance);
        let waterList = this.getCreateClassList(['normalSticket','waterSticket'],objNum/2,obj.maxDistance,obj.minDistance);
        let concatList = list.concat(waterList);
        let pointList = this.randomPointXY(concatList,obj.lastY,obj.stageW);
        return pointList;
    }
    /**
     * 常规随机跳板
     */
    public normalSticketLevel(obj:{
        maxDistance:number,
        minDistance:number,
        lastY:number,
        stageW:number
    }){
        let objNum = 5;
        let list = this.getCreateClassList(['normalSticket'],objNum,obj.maxDistance,obj.minDistance);
        let pointList = this.randomPointXY(list,obj.lastY,obj.stageW);
        return pointList;
    }

    /**
     * 随机常规和移动跳板
     */
    public norHorSticketLevel(obj:{
        maxDistance:number,
        minDistance:number,
        lastY:number,
        stageW:number
    }){
        let objNum = 3;
        let list = this.getCreateClassList(['normalSticket','leafSticket'],objNum,obj.maxDistance,obj.minDistance);
        let pointList = this.randomPointXY(list,obj.lastY,obj.stageW);
        return pointList;
    }
    /**
     * 随机移动跳板
     */
    public horSticketLevel(obj:{
        maxDistance:number,
        minDistance:number,
        lastY:number,
        stageW:number
    }){
        let objNum = 5;
        let list = this.getCreateClassList(['leafSticket'],objNum,obj.maxDistance,obj.minDistance);
        let pointList = this.randomPointXY(list,obj.lastY,obj.stageW);
        return pointList;
    }
    
    /**
     * 随机常规和水滴
     */
    public norWaterSticketLevel(obj:{
        maxDistance:number,
        minDistance:number,
        lastY:number,
        stageW:number
    }){
        let objNum = 3;
        let list = this.getCreateClassList(['normalSticket','waterSticket'],objNum,obj.maxDistance,obj.minDistance);
        let pointList = this.randomPointXY(list,obj.lastY,obj.stageW);
        return pointList;
    }
    /**
     * 水滴跳板和一次性跳板左右排列
     */
    public waterOneHitLeftRight(obj:{
        maxDistance:number,
        minDistance:number,
        lastY:number,
        stageW:number
    }){
        let objNum = 3;
        let list = this.getCreateClassList(['normalSticket','cloudSticket','cloudSticket','waterSticket'],objNum,obj.maxDistance,obj.minDistance);
        let pointList = this.leftAndRightPointXY(list,obj.lastY,obj.stageW);
        return pointList;
    }
    /**
     * 木材跳板左右排列
     */
    public woodSticketLeftRight(obj:{
        maxDistance:number,
        minDistance:number,
        lastY:number,
        stageW:number
    }){
        let objNum = 4;
        let list = this.getCreateClassList(['woodSticket'],objNum,80,60);
        let pointList = this.leftAndRightPointXY(list,obj.lastY,obj.stageW);
        return pointList;
    }
    /**
     * 一次性的左右跳
     */
      public oneHitSticketLeftRight(obj:{
        maxDistance:number,
        minDistance:number,
        lastY:number,
        stageW:number
    }){
        let objNum = 6;
        let list = this.getCreateClassList(['cloudSticket'],objNum,obj.maxDistance,obj.minDistance);
        let pointList = this.leftAndRightPointXY(list,obj.lastY,obj.stageW);
        return pointList;
    }
    /**
     * 常规跳板和翅膀道具
     */

    public norWingPropLevel(obj:{
        maxDistance:number,
        minDistance:number,
        lastY:number,
        stageW:number
    }){
        let objNum = 1;
        let list = this.singleSticketAndProp(['normalSticket','wingProp'],objNum,obj.maxDistance,obj.minDistance);
        let pointList = this.randomPointXY(list,obj.lastY,obj.stageW);
        return pointList;
    }
    /**
     * 常规跳板和火箭
     */
    public norRocketPropLevel(obj:{
        maxDistance:number,
        minDistance:number,
        lastY:number,
        stageW:number
    }){
        let objNum = 1;
        let list = this.singleSticketAndProp(['normalSticket','rocketProp'],objNum,obj.maxDistance,obj.minDistance);
        let pointList = this.randomPointXY(list,obj.lastY,obj.stageW);
        return pointList;
    }
    /**
     * 常规跳板和弹簧鞋
     */
    public norSpringShoePropLevel(obj:{
        maxDistance:number,
        minDistance:number,
        lastY:number,
        stageW:number
    }){
        let objNum = 1;
        let list = this.singleSticketAndProp(['normalSticket','springShoeProp'],objNum,obj.maxDistance,obj.minDistance);
        let pointList = this.randomPointXY(list,obj.lastY,obj.stageW);
        return pointList;
    }
    /**
     * 常规跳板和弹簧
     */
     public norSpringPropLevel(obj:{
        maxDistance:number,
        minDistance:number,
        lastY:number,
        stageW:number
    }){
        let objNum = 1;
        let list = this.singleSticketAndProp(['normalSticket','springProp'],objNum,obj.maxDistance,obj.minDistance);
        let pointList = this.randomPointXY(list,obj.lastY,obj.stageW);
        return pointList;
    }
    /**
     * 常规跳板和蘑菇
     */
    public norMushroomLevel(obj:{
        maxDistance:number,
        minDistance:number,
        lastY:number,
        stageW:number
    }){
        let objNum = 1;
        let list = this.singleSticketAndProp(['normalSticket','mushroomProp'],objNum,obj.maxDistance,obj.minDistance);
        let pointList = this.randomPointXY(list,obj.lastY,obj.stageW);
        return pointList;
    }
    /**
     * 常规跳板和保护罩
     */
    public norProtectionLevel(obj:{
        maxDistance:number,
        minDistance:number,
        lastY:number,
        stageW:number
    }){
        let objNum = 1;
        let list = this.singleSticketAndProp(['normalSticket','protectionProp'],objNum,obj.maxDistance,obj.minDistance);
        let pointList = this.randomPointXY(list,obj.lastY,obj.stageW);
        return pointList;
    }

    /**
     *  绿色怪兽关卡左右
     */
    public greenMonsterLeftRight(obj:{
        maxDistance:number,
        minDistance:number,
        lastY:number,
        stageW:number
    }){
        let objNum = 1;
        let singleList = this.singleSticketAndProp(['normalSticket','protectionProp'],objNum,obj.maxDistance,obj.minDistance);
        let normalStickt = this.getCreateClassList(['normalSticket'],3,50,30)
        let monsterlist = this.createMonster('monsterProp','greenBigMonster',50,30);
        let sticketList = this.getCreateClassList(['normalSticket'],6,50,30);
        let concatList = singleList.concat(normalStickt,monsterlist,sticketList);
        let pointList = this.monsterOne(concatList,obj.lastY,obj.stageW);
        return pointList;
    }
    /**
     * 紫色怪兽关卡左右
     */
    public purpleMonsterLeftRight(obj:{
        maxDistance:number,
        minDistance:number,
        lastY:number,
        stageW:number
    }){
        let objNum = 1;
        let singleList = this.singleSticketAndProp(['normalSticket','protectionProp'],objNum,obj.maxDistance,obj.minDistance);
        let normalStickt = this.getCreateClassList(['normalSticket'],3,50,30)
        let monsterlist = this.createMonster('monsterProp','purpleSmallMonster',50,30);
        let sticketList = this.getCreateClassList(['normalSticket'],6,50,30);
        let concatList = singleList.concat(normalStickt,monsterlist,sticketList);
        let pointList = this.monsterOne(concatList,obj.lastY,obj.stageW);
        return pointList;
    }
    /**
     * 蜘蛛网关卡
     */
    public spiderWebAndNorLeftRight(obj:{
        maxDistance:number,
        minDistance:number,
        lastY:number,
        stageW:number
    }){
        let objNum = 1;
        let singleList = this.singleSticketAndProp(['normalSticket','mushroomProp'],objNum,obj.maxDistance,obj.minDistance);
        let normalStickt = this.getCreateClassList(['normalSticket'],3,50,30)
        let monsterlist = this.createMonster('spiderWebProp','spideWeb',50,30);
        let sticketList = this.getCreateClassList(['normalSticket'],6,50,30);
        let concatList = singleList.concat(normalStickt,monsterlist,sticketList);
        let pointList = this.monsterOne(concatList,obj.lastY,obj.stageW);
        return pointList;
    }
    

    /**
     * 上下移动踏板的设置
     */

    public upDownSticketMove(obj:{
        maxDistance:number,
        minDistance:number,
        lastY:number,
        stageW:number
    }){
        let list  = this.upDownMoveTwo(obj.lastY,obj.stageW);
        return list;
    }
    




}