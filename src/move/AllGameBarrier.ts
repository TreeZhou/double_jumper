class AllGameBarrier extends eui.Component{
    constructor(){
        super();
    }
    public createChildren() {
        
        super.createChildren();
        this.setInitData();
    }
    private minDistance:number=30; // 最小间隔
    private eachStageDistance:number=30; // 每个阶段的间隔
    public lastBarrierY:number; // 最后一个物体的Y值

    public gameLevel:GameLevel;
    public probabilityLevel:ProbabilityClass;
  

    private setInitData(){
        this.lastBarrierY = this.stage.$stageHeight;
        this.gameLevel = new GameLevel();
        this.probabilityLevel = new ProbabilityClass();
    }
    /**
     * 初始化刚开始的跳板
     */
    public initSticket(groupBox:eui.Group){
        let pedalObj = null;
        let list = this.gameLevel.normalSticketLevel({
            maxDistance:40,
            minDistance:30,
            lastY:this.stage.$stageHeight,
            stageW:this.stage.$stageWidth
        });

        for(let i=0;i<list.length;i++) {
			groupBox.addChild(list[i].roleObj);
			pedalObj = list[i].roleObj;
		}
        this.lastBarrierY = pedalObj.$y - pedalObj.height-this.gameLevel.checkIsHasChildHeight(pedalObj);

        return groupBox;
    }
    /**
     * 创建下一屏的跳板
     */
    public addNewSticket(groupBox:eui.Group,playerMeter:number){
        let pedalObj = null;

        if (this.lastBarrierY > (this.eachStageDistance + this.minDistance)) {
            let levelFun = this.probabilityLevel.getLevelName(playerMeter);
            let list = this.gameLevel[levelFun.levelName]({
                maxDistance:levelFun.maxDistance,
                minDistance:levelFun.minDistance,
                lastY:this.lastBarrierY,
                stageW:this.stage.$stageWidth
            });
			for(let i=0;i<list.length;i++) {
				groupBox.addChild(list[i].roleObj);
				pedalObj = list[i].roleObj;
			}
			this.lastBarrierY = pedalObj.$y - pedalObj.height-20-this.gameLevel.checkIsHasChildHeight(pedalObj);
		}
    }
    /**
     * 回收移除出舞台的对象
     */
    public recycleAllObject(obj){
		if(obj.TYPE_NAME) {
            if(obj.$children[1]) {
                let item = obj.$children[1];
                obj.removeChild(item);
                this.gameLevel.recycleObj(item,item.TYPE_NAME);
            }
			this.gameLevel.recycleObj(obj,obj.TYPE_NAME);
		}
	}
    /**
     * 检测所有在舞台的障碍物，进行相应的运动
     */
    public barrierMoved(allStickList) {
		let list = allStickList;
		let len = list.length;
		let item;
		for (let i = 0; i < len; i++) {
			item = list[i];
            if(item.horzontalMove) {
                item.horzontalMove();
            }
         
		}
	}


}