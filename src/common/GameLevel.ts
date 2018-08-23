class GameLevel extends CalculatePonitXY{
    /**
     * 常规随机跳板
     */
    public normalSticketLevel(obj:{
        num:number,
        maxDistance:number,
        minDistance:number,
        lastY:number,
        stageW:number
    }){
        let list = this.getCreateClassList(['normalSticket'],obj.num,obj.maxDistance,obj.minDistance);
        let pointList = this.randomPointXY(list,obj.lastY,obj.stageW);
        return pointList;
    }

    /**
     * 随机常规和移动跳板
     */
    public norHorSticketLevel(obj:{
        num:number,
        maxDistance:number,
        minDistance:number,
        lastY:number,
        stageW:number
    }){
        let list = this.getCreateClassList(['normalSticket','leafSticket'],obj.num,obj.maxDistance,obj.minDistance);
        let pointList = this.randomPointXY(list,obj.lastY,obj.stageW);
        return pointList;
    }

    /**
     * 常规跳板和翅膀道具
     */

    public norWingPropLevel(obj:{
        num:number,
        maxDistance:number,
        minDistance:number,
        lastY:number,
        stageW:number
    }){
        let list = this.singleSticketAndProp(['normalSticket','wingProp'],obj.num,obj.maxDistance,obj.minDistance);
        let pointList = this.randomPointXY(list,obj.lastY,obj.stageW);
        return pointList;
    }


}