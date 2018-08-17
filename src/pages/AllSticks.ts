class AllSticks extends BasePage{
 	public constructor() {
		super();
	}
    private eachStageDistance:number=30; // 每个阶段的间隔
    private stickHeight:number; // 踏板的高度
    private preStickY:number; // 前一个踏板的位置
    private minDistance:number=30;

    public lastOneStickY:number;   // 当前最后一个踏板的Y值
    public stickRecyclePool:any=[];

	public propsClass:StagePropClass;
	
	public hasPropsStage:number=3;


    // public stickList:eui.Group;

    // 每个阶段跳板的最大间距
	private STICK_STAGE_DISTANSE: any = [
		{
			minHeight: 0,
			maxHeight: 400,
			distance: 24,
			eachShowProps:3,
			props:{
				spring:0,
				trampoline:0,
				springShoe:0,
				wing:0,
				rocket:0,
				protectionCover:0,
				diamond:0,
				moreOneLife:0
			},
			// propsPercentage:{},
			sticketPercentage:{
				fixation:0.9,
				horizontal:0,
				hitDisable:0.1,
				oneceHit:0
			}
	
		},
		{
			minHeight: 601,
			maxHeight: 1000,
			distance: 30,
			eachShowProps:3,
			props:{
				spring:0,
				trampoline:0.8,
				springShoe:0,
				wing:0.2,
				rocket:0,
				protectionCover:0,
				diamond:0,
				moreOneLife:0
			},
			// propsPercentage:{},
			sticketPercentage:{
				fixation:0.8,
				horizontal:0.1,
				hitDisable:0.1,
				oneceHit:0
			}
	
		},
		{
			minHeight: 1001,
			maxHeight: 2000,
			distance: 40,
			eachShowProps:3,
			props:{
				spring:0,
				trampoline:0.6,
				springShoe:0,
				wing:0.3,
				rocket:0.1,
				protectionCover:0,
				diamond:0,
				moreOneLife:0
			},
			// propsPercentage:{},
			sticketPercentage:{
				fixation:0.6,
				horizontal:0.1,
				hitDisable:0.1,
				oneceHit:0.2
			}
		},
		{
			minHeight: 2001,
			maxHeight: 4000,
			distance: 50,
			eachShowProps:3,
			props:{
				spring:0,
				trampoline:0.5,
				springShoe:0,
				wing:0.3,
				rocket:0.2,
				protectionCover:0,
				diamond:0,
				moreOneLife:0
			},
			// propsPercentage:{},
			sticketPercentage:{
				fixation:0.5,
				horizontal:0.2,
				hitDisable:0.1,
				oneceHit:0.2
			}
		},
		{
			minHeight: 4001,
			maxHeight: 6000,
			distance: 60,
			eachShowProps:3,
			props:{
			spring:0,
				trampoline:0.2,
				springShoe:0,
				wing:0.5,
				rocket:0.3,
				protectionCover:0,
				diamond:0,
				moreOneLife:0
			},
			// propsPercentage:{},
			sticketPercentage:{
				fixation:0.4,
				horizontal:0.3,
				hitDisable:0.1,
				oneceHit:0.2
			}
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
		this.hasPropsStage = 3;
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
	public getPropPercentName(nowStage,propsName) {
		let propsObj = null;
		let meter = nowStage * this.STAGE_METER;
		let list = this.STICK_STAGE_DISTANSE;
		let len = list.length;
		let index = 0;
		let getMyKey = null;

		index = this.getNowPropIndex(nowStage);
		propsObj = list[index][propsName];


		getMyKey = this.getRandomKey(propsObj);
	
		return getMyKey;
		
	}

	public getNowPropIndex(nowStage) {
		let meter = nowStage * this.STAGE_METER;
		let list = this.STICK_STAGE_DISTANSE;
		let len = list.length;
		let index = 0;

		for (let i = 0; i < len; i++) {
			if (meter >= list[i].minHeight && meter <= list[i].maxHeight || i >= len - 1) {
				// propsObj = list[i].props;
				index = i;
				break;
			}
		}

		return index;
	}
	/**
	 * 根据当前阶段的道具各个概率，获得道具的key 值，这个key值也是TYPE_STASTUS的值，如果为空，就是不设置道具
	*/
	private getRandomKey(percentageObj:Object){
		let randomNum = Math.random();
		let start = 0;
		let end = 0;
		let getMyKey = null;

		for(let key in percentageObj) {
			// console.log('概率',start,end);
			end = start+ percentageObj[key];
			if(randomNum>start &&　randomNum<=end) {
				getMyKey = key;
				break;
			}
			start = end;
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

		let sticket = new SetCheckPoints();
		let list = sticket.fixtionStick({
			lastY:this.stage.$stageHeight,
            stageWidth:this.stage.$stageWidth,
            distance:24,
            num:20,
			keyNameList:['fixation']
		});
		// while (y > 0) {
        //     sticketObj = this.createSticket(nowStage,this.preStickY, i,groupBox);
        //     pedalObj = sticketObj.stickObj;
        //     groupBox = sticketObj.groupBox;
		// 	y = pedalObj.$y;
		// 	this.preStickY = pedalObj.$y;
		// 	i++;
		// }
		for(let i=0;i<list.length;i++) {
			groupBox.addChild(list[i]);
			pedalObj = list[i];
			pedalObj.setStickTypeName(pedalObj.typeName);
			console.log('pedalObj',pedalObj.$y,pedalObj.height,this.stage.$stageHeight);
			y = pedalObj.$y;
		}
		this.lastOneStickY = y - pedalObj.height;
        // console.log('最后的跳板',this.lastOneStickY ,this.preStickY)
        return groupBox;
	}
    // 当当前的最后那个跳板大于某个值，就创建下一屏的跳板
	public addNewPetals(groupBox:eui.Group,nowStage:number) {
		let i = 0;
		let y = 0;
		let pedalObj = null;
        let sticketObj = null;
		let fixtionList = [];
		let propsObj = null;

        if (this.lastOneStickY > (this.eachStageDistance + this.minDistance)) {
			this.preStickY = 0;
			nowStage++;
			while (y > -this.stage.$stageHeight) {
				sticketObj = this.createSticket(nowStage,this.preStickY, i ,groupBox);
                pedalObj = sticketObj.stickObj;
                groupBox = sticketObj.groupBox;
				y = pedalObj.$y;
				this.preStickY = pedalObj.$y;
				if(pedalObj.TYPE_STATUS === pedalObj.TYPE_FIXATION && nowStage === this.hasPropsStage) {
					propsObj = this.setPropOnSticket(pedalObj,nowStage,groupBox);
					if(propsObj) {
						pedalObj.$y = pedalObj.$y-propsObj.DOWN_DISTANCE;
						propsObj.$y =  propsObj.$y-propsObj.DOWN_DISTANCE;
						pedalObj.meter = this.changeToMeter(pedalObj.$y,nowStage);
						y = propsObj.$y-propsObj.UP_DISTANCE;
						this.preStickY = y;
						this.hasPropsStage++;
					}
				}
				i++;
			}
			// this.getFixtionSticket(fixtionList,nowStage,groupBox);
			this.lastOneStickY = y - pedalObj.height;
		}
        return nowStage;
	}
	/**
	 * 根据固定的跳板随机两个跳板设置概率性的道具
	*/
	private getFixtionSticket(fixtionList,nowStage,groupBox) {
		let fixtionLen = fixtionList.length;
		let num = this.STICK_STAGE_DISTANSE[this.getNowPropIndex(nowStage)].eachShowProps;
		let stickList = [];
		let randomNum=null;
		let i = 0;
		let getMyKey = null;


		if(fixtionLen) {
			num = Math.floor(Math.random()*(num-1))+1;
			while(i<num && i<fixtionLen) {
				randomNum = Math.floor(Math.random()*(fixtionLen-1));
				if(stickList.indexOf(randomNum)===-1) {
					stickList.push(randomNum);

					i++;
				}
		
			}
		}

		for(let k=0;k<stickList.length;k++) {
			getMyKey = this.getPropPercentName(nowStage,'props');
			// console.log('12',getMyKey);
			if(getMyKey) {
				this.propsClass.setTypeStatus(getMyKey);
				this.propsClass.addPropToStage(groupBox,fixtionList[stickList[k]]);
				// this.STICK_STAGE_DISTANSE[propObj.stageIndex]['props'][propObj.getMyKey]--;

			}
		}
	}
	private setPropOnSticket(sticketObj,nowStage,groupBox){
		let myKey = null;
		let propsObj = null;

		myKey = this.getPropPercentName(nowStage,'props');
		if(myKey) {
			this.propsClass.setTypeStatus(myKey);
			propsObj = this.propsClass.addPropToStage(groupBox,sticketObj);
		}
		return propsObj;
	}
    /**
	 * 创建踏板对象
	*/
	public createSticket(nowStage:number,initY, num,groupBox:eui.Group) {
		let stickObj = null;
		let spring = null;
		let distance = this.caculateStickDistance(nowStage);
		let sticketHeight = 0;
		let keyName = null;

		stickObj =  this.createStick();   ///     Object.create(this.allPropsObjectPool['stickItem']);
		keyName = this.getPropPercentName(nowStage,'sticketPercentage');
		groupBox.addChild(stickObj);
		stickObj.setStickTypeName(keyName);
		sticketHeight=stickObj.height ? stickObj.height : 30;
		stickObj.$y = initY - (distance + sticketHeight);
		stickObj.$x = Math.random() * (this.stage.stageWidth - stickObj.width);
		stickObj.meter = this.changeToMeter(stickObj.$y, nowStage);

        return {
            stickObj:stickObj,
            groupBox:groupBox
        };
	}
	private createStick(){
		let item = null;
		let propsList = this.stickRecyclePool;
		if(propsList.length) {
			item = propsList[0];
			propsList.shift();
		}else {
			item = new StickItem();
		}
		return item;
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
	public recycleAllObject(obj){
		if(obj.TYPE_NAME) {
			if(obj.TYPE_NAME === 'trampoline') {
				this.recycleObj(obj,this.propsClass.allPropsPool[obj.TYPE_NAME]);
			}else if(obj.TYPE_NAME === 'wing'){
				this.recycleObj(obj,this.propsClass.allPropsPool[obj.TYPE_NAME]);
			}else if(obj.TYPE_NAME === 'rocket'){
				this.recycleObj(obj,this.propsClass.allPropsPool[obj.TYPE_NAME]);
			}else if(obj.TYPE_NAME === 'sticket'){
				this.recycleObj(obj,this.stickRecyclePool);
			}
		}
	}

}