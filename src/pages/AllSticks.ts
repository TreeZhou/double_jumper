class AllSticks extends BasePage{
 	public constructor() {
		super();
	}
    private eachStageDistance:number=30; // 每个阶段的间隔
    private stickHeight:number; // 踏板的高度
    private preStickY:number; // 前一个踏板的位置
    private minDistance:number=40;

    public lastOneStickY:number;   // 当前最后一个踏板的Y值
    public allStickList:any=[];

	private propsClass:StagePropClass;

    // public stickList:eui.Group;

    // 每个阶段跳板的最大间距
	private STICK_STAGE_DISTANSE: any = [
		{
			minHeight: 0,
			maxHeight: 1000,
			distance: 50,
			eachShowProps:2,
			props:{
				spring:0,
				trampoline:5,
				springShoe:0,
				bambooFly:5,
				rocketShip:0,
				protectionCover:0,
				diamond:0,
				moreOneLife:0
			},
			propsPercentage:{}
	
		},
		{
			minHeight: 1001,
			maxHeight: 2000,
			distance: 60,
			eachShowProps:2,
			props:{
				spring:0,
				trampoline:2,
				springShoe:0,
				bambooFly:5,
				rocketShip:1,
				protectionCover:0,
				diamond:0,
				moreOneLife:0
			},
			propsPercentage:{}
		},
		{
			minHeight: 2001,
			maxHeight: 4000,
			distance: 70,
			eachShowProps:3,
			props:{
				spring:0,
				trampoline:2,
				springShoe:0,
				bambooFly:5,
				rocketShip:1,
				protectionCover:0,
				diamond:0,
				moreOneLife:0
			},
			propsPercentage:{}
		},
		{
			minHeight: 4001,
			maxHeight: 6000,
			distance: 70,
			props:{
				spring:0,
				trampoline:10,
				springShoe:0,
				bambooFly:2,
				rocketShip:2,
				protectionCover:0,
				diamond:0,
				moreOneLife:0
			},
			propsPercentage:{}
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
		this.propsClass = new StagePropClass();
		this.addChild(this.propsClass);
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
	 * 根据当前阶段的道具各个数量设置对应出现的概率
	*/
	public caculatePropPercent(nowStage) {
		let propsObj = null;
		let meter = nowStage * this.STAGE_METER;
		let list = this.STICK_STAGE_DISTANSE;
		let len = list.length;
		let index = 0;
		let totalMumber = 0;
		let getMyKey = null;

		for (let i = 0; i < len; i++) {
			if (meter >= list[i].minHeight && meter <= list[i].maxHeight || i >= len - 1) {
				// propsObj = list[i].props;
				index = i;
				break;
			}
		}

		for(let key in list[index].props) {
			totalMumber += list[index].props[key];
		}
		for(let key in list[index].props) {
			list[index]['propsPercentage'][key] = list[index].props[key]/totalMumber;
		}

		getMyKey = this.getRandomPropKey(list[index]['propsPercentage']);
	
		return {
			stageIndex:index,
			getMyKey:getMyKey
		}


	}
	/**
	 * 根据当前阶段的道具各个概率，获得道具的key 值，这个key值也是TYPE_STASTUS的值，如果为空，就是不设置道具
	*/
	private getRandomPropKey(percentageObj:Object){
		let randomNum = Math.random();
		let start = 0;
		let end = 0;
		let getMyKey = null;

		for(let key in percentageObj) {
			end =start+ percentageObj[key];
			if(randomNum>start &&　randomNum<=end) {
				getMyKey = key;
				break;
			}
			start = start + end;
		}

		return getMyKey;
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
		let fixtionList = [];

        if (this.lastOneStickY > (this.eachStageDistance + this.minDistance)) {
			this.preStickY = 0;
			nowStage++;
			while (y > -this.stage.$stageHeight) {
				sticketObj = this.createSticket(nowStage,this.preStickY, i ,groupBox);
                pedalObj = sticketObj.stickObj;
                groupBox = sticketObj.groupBox;
				y = pedalObj.$y;
				this.preStickY = pedalObj.$y;
				if(pedalObj.TYPE_STATUS === pedalObj.TYPE_FIXATION ) {
					fixtionList.push(pedalObj);
				}
				i++;
			}
			this.getFixtionSticket(fixtionList,nowStage,groupBox);
			this.lastOneStickY = y - pedalObj.height;
		}
        return nowStage;
	}
	/**
	 * 根据固定的跳板随机两个跳板设置概率性的道具
	*/
	private getFixtionSticket(fixtionList,nowStage,groupBox) {
		let fixtionLen = fixtionList.length;
		let num = 2;
		let stickList = [];
		let randomNum=null;
		let i = 0;
		let propObj = null;

		if(fixtionLen) {
			while(i<num && i<fixtionLen) {
				randomNum = Math.floor(Math.random()*(fixtionLen-1));
				if(stickList.indexOf(randomNum)===-1) {
					stickList.push(randomNum);
					i++;
				}
		
			}
		}

		for(let k=0;k<stickList.length;k++) {
			propObj = this.caculatePropPercent(nowStage);
			if(propObj.getMyKey) {
				this.propsClass.setTypeStatus(propObj.getMyKey);
				this.propsClass.addPropToStage(groupBox,fixtionList[stickList[k]]);
				// this.STICK_STAGE_DISTANSE[propObj.stageIndex]['props'][propObj.getMyKey]--;

			}
		}
	}
    /**
	 * 创建踏板对象
	*/
	public createSticket(nowStage:number,initY, num,groupBox:eui.Group) {
		let stickObj = null;
		let spring = null;
		let distance = this.caculateStickDistance(nowStage);
		let sticketHeight = 0;

		stickObj = new StickItem();
		groupBox.addChild(stickObj);
		sticketHeight=stickObj.height ? stickObj.height : 30;
		stickObj.$y = initY - (distance + sticketHeight);
		stickObj.$x = Math.random() * (this.stage.stageWidth - stickObj.width);
		stickObj.meter = this.changeToMeter(stickObj.$y, nowStage);
		// if(stickObj.TYPE_STATUS === stickObj.TYPE_FIXATION) {
		// 	this.propsClass.addPropToStage(groupBox,stickObj);
		// }

        return {
            stickObj:stickObj,
            groupBox:groupBox
        };
	}
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