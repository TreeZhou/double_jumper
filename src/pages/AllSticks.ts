class AllSticks extends BasePage{
 	public constructor() {
		super();
	}
    private eachStageDistance:number=30; // 每个阶段的间隔
    private stickHeight:number; // 踏板的高度
    private preStickY:number; // 前一个踏板的位置
    private minDistance:number=30;

    public lastOneStickY:number;   // 当前最后一个踏板的Y值
    public allStickList:any=[];


    // public stickList:eui.Group;

    // 每个阶段跳板的最大间距
	private STICK_STAGE_DISTANSE: any = [
		{
			minHeight: 0,
			maxHeight: 1000,
			distance: 40
		},
		{
			minHeight: 1001,
			maxHeight: 2000,
			distance: 50
		},
		{
			minHeight: 2001,
			maxHeight: 4000,
			distance: 60
		},
		{
			minHeight: 4001,
			maxHeight: 6000,
			distance: 70
		},
	]
    protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}
    protected childrenCreated():void
	{
		super.childrenCreated();
        this.initStickData();
	}
    private initStickData(){
        this.preStickY = this.stage.$stageHeight;
    }
    /**
	 * 计算当前这个屏跳板的间距
	 */
	public caculateStickDistance(nowStage) {
		let distand = null;
		let meter = nowStage * this.STAGE_METER;
		let list = this.STICK_STAGE_DISTANSE;
		let len = list.length;

		for (let i = 0; i < len; i++) {
			if (meter >= list[i].minHeight && meter <= list[i].maxHeight || i >= len - 1) {
				distand = Math.ceil(Math.abs(Math.random() * (list[i].distance - this.minDistance)) + this.minDistance);
				break;
			}
		}
		return distand;
	}
    /**
	 * 初始化第一屏的踏板的位置，随机为主
	 */
	public initSticket(groupBox:eui.Group,nowStage:number) {
		let i = 0;
		let y = this.stage.$stageHeight;
		let pedalObj = null;
        let sticketObj = null;

		while (y > 0) {
            sticketObj = this.createSticket(nowStage,this.preStickY, i,groupBox);
            pedalObj = sticketObj.stickObj;
            groupBox = sticketObj.groupBox;
			y = pedalObj.$y;
			this.preStickY = pedalObj.$y;
			i++;
		}
		this.lastOneStickY = y - pedalObj.height;
        console.log('最后的跳板',this.lastOneStickY ,this.preStickY)
        return groupBox;
	}
    // 当当前的最后那个跳板大于某个值，就创建下一屏的跳板
	public addNewPetals(groupBox:eui.Group,nowStage:number) {
		let i = 0;
		let y = 0;
		let pedalObj = null;
        let sticketObj = null;

        if (this.lastOneStickY > (this.eachStageDistance + this.minDistance)) {
			this.preStickY = 0;
			nowStage++;
			while (y > -this.stage.$stageHeight) {
				sticketObj = this.createSticket(nowStage,this.preStickY, i ,groupBox);
                pedalObj = sticketObj.stickObj;
                groupBox = sticketObj.groupBox;
				y = pedalObj.$y;
				this.preStickY = pedalObj.$y;
				i++;
			}
			this.lastOneStickY = y - pedalObj.height;
		}
        return nowStage;
	}
    /**
	 * 创建踏板对象
	*/
	public createSticket(nowStage:number,initY, num,groupBox:eui.Group) {
		let stickObj = null;
		let spring = null;
		let distance = this.caculateStickDistance(nowStage);

		stickObj = new StickItem();
		groupBox.addChild(stickObj);
		stickObj.$y = initY - (distance + stickObj.height);
		stickObj.$x = Math.random() * (this.stage.stageWidth - stickObj.width);
        // console.log('我的宽度和高度',stickObj.TYPE_STATUS,stickObj.width, stickObj.height);
		stickObj.meter = this.changeToMeter(stickObj.$y, nowStage);
        return {
            stickObj:stickObj,
            groupBox:groupBox
        };
	}
    // private stickMove() {
	// 	let list = this.stickList.$children;
	// 	let springList = this.springList.$children;
	// 	let springLen = springList.length;
	// 	let len = list.length;
	// 	let item, springItem;
	// 	let speed;

	// 	speed = this.player.nowSpeed;
	// 	for (let i = 0; i < len; i++) {
	// 		item = list[i];
	// 		item.$y = item.$y + speed;     // this.frameNum
	// 	}
	// 	for (let j = 0; j < springLen; j++) {
	// 		springItem = springList[j];
	// 		springItem.$y = springItem.$y + speed;
	// 	}
	// 	this.lastPetalY = this.lastPetalY + speed;
	// }
	public stickMoveLeftAndRight(allStickList) {
		let list = allStickList;
		let len = list.length;
		let item;
		for (let i = 0; i < len; i++) {
			item = list[i];
			if (item.TYPE_STATUS === item.TYPE_HORIZONTAL) {
				item.leftAndRightMove();
			}
		}
	}

}