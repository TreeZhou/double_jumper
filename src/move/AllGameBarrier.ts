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
  

    private setInitData(){
        this.lastBarrierY = this.stage.$stageHeight;
        this.gameLevel = new GameLevel();
    }
    /**
     * 初始化刚开始的跳板
     */
    public initSticket(groupBox:eui.Group){
        let pedalObj = null;
        let list = this.gameLevel.norWingPropLevel({
            num:10,
            maxDistance:40,
            minDistance:30,
            lastY:this.stage.$stageHeight,
            stageW:this.stage.$stageWidth
        });

        for(let i=0;i<list.length;i++) {
			groupBox.addChild(list[i].roleObj);
			pedalObj = list[i].roleObj;
		}
		this.lastBarrierY = pedalObj.$y - pedalObj.height;

        return groupBox;
    }
    /**
     * 创建下一屏的跳板
     */
    public addNewSticket(groupBox:eui.Group,playerMeter:number){
        let pedalObj = null;

        if (this.lastBarrierY > (this.eachStageDistance + this.minDistance)) {
			// rateObj = this.getNowStageItem(playerMeter);
			// // nowStage++;
			// if(!rateObj) {
			// 	alert('概率对象为空');
			// 	return;
			// }
			// let list =this.randomShowPoint(rateObj);
            let list = this.gameLevel.norHorSticketLevel({
                num:10,
                maxDistance:40,
                minDistance:30,
                lastY:this.lastBarrierY,
                stageW:this.stage.$stageWidth
            });
			for(let i=0;i<list.length;i++) {
				groupBox.addChild(list[i].roleObj);
				// if(list[i].resetIniData) {
				// 	list[i].resetIniData();
				// }
				pedalObj = list[i].roleObj;
				// if(pedalObj.typeName) {
				// 	pedalObj.setStickTypeName(pedalObj.typeName);
				// }
			}
			this.lastBarrierY = pedalObj.$y - pedalObj.height-20;
		}
    }
    /**
     * 回收移除出舞台的对象
     */
    public recycleAllObject(obj){
		if(obj.TYPE_NAME) {
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
            item.horzontalMove();
		}
	}


}