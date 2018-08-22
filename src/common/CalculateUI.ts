class CalculateUI {
    // public stageW:number;
    // public stageH:number;
    // public objW:number;
    // public objH:number;
    constructor (){
      
    }
    // public setInitData(obj:{
    //     stageW:number,
    //     stageH:number,
    //     objW:number,
    //     objH:number
    // }){
    //     this.stageW = obj.stageW;
    //     this.stageH = obj.stageH;
    //     this.objW = obj.objW;
    //     this.objH = obj.objH;
    // }
    public randomObjX(stageWidth:number,objWidth:number){
        let randomX = 0;

        randomX = Math.random() * (stageWidth-objWidth);
        return randomX;
    }

}