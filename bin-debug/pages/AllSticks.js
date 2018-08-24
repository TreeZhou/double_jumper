// class AllSticks extends BasePage{
//  	public constructor() {
// 		super();
// 	}
//     private eachStageDistance:number=30; // 每个阶段的间隔
//     private stickHeight:number; // 踏板的高度
//     private preStickY:number; // 前一个踏板的位置
//     private minDistance:number=30;
//     public lastOneStickY:number;   // 当前最后一个踏板的Y值
//     public stickRecyclePool:any=[];
// 	// public propsClass:StagePropClass;
// 	public hasPropsStage:number=3;
// 	public setCheckPoints:SetCheckPoints;
// 	private METER_STAGE_LIST:Array<any> = [
// 		{
// 			minHeight:0,
// 			maxHeight:600,
// 			distance:30,
// 			pointRateList:[0.1,0.7,0.2,0],  // 含有单个道具，跳板有多种的，跳板只有一种的，定时出现的跳板
// 			singlePoprsRate:{
// 				spring:0,
// 				trampoline:0,
// 				springShoes:1,
// 				wing:0,
// 				rocket:0,
// 				protectionCover:0,
// 				diamond:0,
// 				moreOneLife:0
// 			},
// 			moreSticketRate:{
// 				fixation:0.7,
// 				horizontal:0.1,
// 				hitDisable:0.1,
// 				oneceHit:0.1
// 			},
// 			signleSticketRate:{
// 				fixation:0.9,
// 				horizontal:0.1,
// 				hitDisable:0,
// 				oneceHit:0
// 			},
// 		},
// 		{
// 			minHeight:600,
// 			maxHeight:2000,
// 			distance:30,
// 			pointRateList:[0.1,0.7,0.2,0],  // 含有单个道具，跳板有多种的，跳板只有一种的，定时出现的跳板
// 			singlePoprsRate:{
// 				spring:0,
// 				trampoline:0,
// 				springShoes:1,
// 				wing:0,
// 				rocket:0,
// 				protectionCover:0,
// 				diamond:0,
// 				moreOneLife:0
// 			},
// 			moreSticketRate:{
// 				fixation:0.7,
// 				horizontal:0.1,
// 				hitDisable:0.1,
// 				oneceHit:0.1
// 			},
// 			signleSticketRate:{
// 				fixation:0.9,
// 				horizontal:0.1,
// 				hitDisable:0,
// 				oneceHit:0
// 			},
// 		},
// 		{
// 			minHeight:2000,
// 			maxHeight:5000,
// 			distance:40,
// 			pointRateList:[0.2,0.5,0.2,0.1],  // 含有单个道具，跳板有多种的，跳板只有一种的,定时出现的跳板，
// 			singlePoprsRate:{
// 				spring:0,
// 				trampoline:0.8,
// 				springShoes:0,
// 				wing:0.2,
// 				rocket:0,
// 				protectionCover:0,
// 				diamond:0,
// 				moreOneLife:0
// 			},
// 			moreSticketRate:{
// 				fixation:0.5,
// 				horizontal:0.3,
// 				hitDisable:0.1,
// 				oneceHit:0.1
// 			},
// 			signleSticketRate:{
// 				fixation:0.7,
// 				horizontal:0.2,
// 				hitDisable:0,
// 				oneceHit:0.1
// 			},
// 		},
// 		{
// 			minHeight:5000,
// 			maxHeight:10000,
// 			distance:50,
// 			pointRateList:[0.2,0.4,0.2,0.2],  // 含有单个道具，跳板有多种的，跳板只有一种的，
// 			singlePoprsRate:{
// 				spring:0,
// 				trampoline:0.8,
// 				springShoes:0,
// 				wing:0.2,
// 				rocket:0,
// 				protectionCover:0,
// 				diamond:0,
// 				moreOneLife:0
// 			},
// 			moreSticketRate:{
// 				fixation:0.5,
// 				horizontal:0.3,
// 				hitDisable:0.1,
// 				oneceHit:0.1
// 			},
// 			signleSticketRate:{
// 				fixation:0.7,
// 				horizontal:0.2,
// 				hitDisable:0,
// 				oneceHit:0.1
// 			},
// 		},
// 	];
//     // public stickList:eui.Group;
//     // 每个阶段跳板的最大间距
// 	private STICK_STAGE_DISTANSE: any = [
// 		{
// 			minHeight: 0,
// 			maxHeight: 400,
// 			distance: 24,
// 			eachShowProps:3,
// 			props:{
// 				spring:0,
// 				trampoline:0,
// 				springShoe:0,
// 				wing:0,
// 				rocket:0,
// 				protectionCover:0,
// 				diamond:0,
// 				moreOneLife:0
// 			},
// 			// propsPercentage:{},
// 			sticketPercentage:{
// 				fixation:0.9,
// 				horizontal:0,
// 				hitDisable:0.1,
// 				oneceHit:0
// 			}
// 		},
// 		{
// 			minHeight: 601,
// 			maxHeight: 1000,
// 			distance: 30,
// 			eachShowProps:3,
// 			props:{
// 				spring:0,
// 				trampoline:0.8,
// 				springShoe:0,
// 				wing:0.2,
// 				rocket:0,
// 				protectionCover:0,
// 				diamond:0,
// 				moreOneLife:0
// 			},
// 			// propsPercentage:{},
// 			sticketPercentage:{
// 				fixation:0.8,
// 				horizontal:0.1,
// 				hitDisable:0.1,
// 				oneceHit:0
// 			}
// 		},
// 		{
// 			minHeight: 1001,
// 			maxHeight: 2000,
// 			distance: 40,
// 			eachShowProps:3,
// 			props:{
// 				spring:0,
// 				trampoline:0.6,
// 				springShoe:0,
// 				wing:0.3,
// 				rocket:0.1,
// 				protectionCover:0,
// 				diamond:0,
// 				moreOneLife:0
// 			},
// 			// propsPercentage:{},
// 			sticketPercentage:{
// 				fixation:0.6,
// 				horizontal:0.1,
// 				hitDisable:0.1,
// 				oneceHit:0.2
// 			}
// 		},
// 		{
// 			minHeight: 2001,
// 			maxHeight: 4000,
// 			distance: 50,
// 			eachShowProps:3,
// 			props:{
// 				spring:0,
// 				trampoline:0.5,
// 				springShoe:0,
// 				wing:0.3,
// 				rocket:0.2,
// 				protectionCover:0,
// 				diamond:0,
// 				moreOneLife:0
// 			},
// 			// propsPercentage:{},
// 			sticketPercentage:{
// 				fixation:0.5,
// 				horizontal:0.2,
// 				hitDisable:0.1,
// 				oneceHit:0.2
// 			}
// 		},
// 		{
// 			minHeight: 4001,
// 			maxHeight: 6000,
// 			distance: 60,
// 			eachShowProps:3,
// 			props:{
// 			spring:0,
// 				trampoline:0.2,
// 				springShoe:0,
// 				wing:0.5,
// 				rocket:0.3,
// 				protectionCover:0,
// 				diamond:0,
// 				moreOneLife:0
// 			},
// 			// propsPercentage:{},
// 			sticketPercentage:{
// 				fixation:0.4,
// 				horizontal:0.3,
// 				hitDisable:0.1,
// 				oneceHit:0.2
// 			}
// 		},
// 	]
//     protected partAdded(partName: string, instance: any): void {
// 		super.partAdded(partName, instance);
// 	}
//     protected childrenCreated():void
// 	{
// 		super.childrenCreated();
//         this.initStickData();
// 	}
//     private initStickData(){
// 		this.hasPropsStage = 3;
//      this.preStickY = this.stage.$stageHeight;
// 		this.setCheckPoints = new SetCheckPoints();
//     }
//     /**
// 	 * 计算当前这个屏跳板的间距
// 	 */
// 	// public caculateStickDistance(nowStage) {
// 	// 	let distand = null;
// 	// 	let meter = nowStage * this.STAGE_METER;
// 	// 	let list = this.STICK_STAGE_DISTANSE;
// 	// 	let len = list.length;
// 	// 	for (let i = 0; i < len; i++) {
// 	// 		if (meter >= list[i].minHeight && meter <= list[i].maxHeight || i >= len - 1) {
// 	// 			distand = Math.ceil(Math.abs(Math.random() * (list[i].distance - this.minDistance)) + this.minDistance);
// 	// 			break;
// 	// 		}
// 	// 	}
// 	// 	return distand;
// 	// }
// 	/**
// 	 * 根据当前阶段的道具各个数量设置对应出现的概率
// 	*/
// 	// public getPropPercentName(nowStage,propsName) {
// 	// 	let propsObj = null;
// 	// 	let meter = nowStage * this.STAGE_METER;
// 	// 	let list = this.STICK_STAGE_DISTANSE;
// 	// 	let len = list.length;
// 	// 	let index = 0;
// 	// 	let getMyKey = null;
// 	// 	index = this.getNowPropIndex(nowStage);
// 	// 	propsObj = list[index][propsName];
// 	// 	getMyKey = this.getRandomKey(propsObj);
// 	// 	return getMyKey;
// 	// }
// 	// public getNowPropIndex(nowStage) {
// 	// 	let meter = nowStage * this.STAGE_METER;
// 	// 	let list = this.STICK_STAGE_DISTANSE;
// 	// 	let len = list.length;
// 	// 	let index = 0;
// 	// 	for (let i = 0; i < len; i++) {
// 	// 		if (meter >= list[i].minHeight && meter <= list[i].maxHeight || i >= len - 1) {
// 	// 			// propsObj = list[i].props;
// 	// 			index = i;
// 	// 			break;
// 	// 		}
// 	// 	}
// 	// 	return index;
// 	// }
// 	/**
// 	 * 根据当前阶段的道具各个概率，获得道具的key 值，这个key值也是TYPE_STASTUS的值，如果为空，就是不设置道具
// 	*/
// 	private getRandomKey(percentageObj:Object){
// 		let randomNum = Math.random();
// 		let start = 0;
// 		let end = 0;
// 		let getMyKey = null;
// 		// debugger
// 		for(let key in percentageObj) {
// 			// console.log('概率',start,end);
// 			end = start+ percentageObj[key];
// 			if(randomNum>start &&　randomNum<=end) {
// 				getMyKey = key;
// 				break;
// 			}
// 			start = end;
// 		}
// 		return getMyKey;
// 	}
//     /**
// 	 * 初始化第一屏的踏板的位置，随机为主
// 	 */
// 	public initSticket(groupBox:eui.Group) {
// 		let i = 0;
// 		let y = this.stage.$stageHeight;
// 		let pedalObj = null;
//         let sticketObj = null;
// 		let list = this.setCheckPoints.fixtionStick({
// 			lastY:this.stage.$stageHeight,
//             stageWidth:this.stage.$stageWidth,
//             distance:24,
//             num:20,
// 			keyName:'fixation' // timing fixation
// 		});
// 		for(let i=0;i<list.length;i++) {
// 			groupBox.addChild(list[i]);
// 			pedalObj = list[i];
// 			pedalObj.setStickTypeName(pedalObj.typeName);
// 			y = pedalObj.$y;
// 		}
// 		this.lastOneStickY = y - pedalObj.height;
//         return groupBox;
// 	}
//     // 当当前的最后那个跳板大于某个值，就创建下一屏的跳板
// 	public addNewPetals(groupBox:eui.Group,playerMeter:number) {
// 		let i = 0;
// 		let y = 0;
// 		let pedalObj = null;
//         let sticketObj = null;
// 		let fixtionList = [];
// 		let propsObj = null;
// 		let rateObj = null;
//         if (this.lastOneStickY > (this.eachStageDistance + this.minDistance)) {
// 			this.preStickY = 0;
// 			rateObj = this.getNowStageItem(playerMeter);
// 			// nowStage++;
// 			if(!rateObj) {
// 				alert('概率对象为空');
// 				return;
// 			}
// 			let list =this.randomShowPoint(rateObj);
// 			for(let i=0;i<list.length;i++) {
// 				groupBox.addChild(list[i]);
// 				if(list[i].resetIniData) {
// 					list[i].resetIniData();
// 				}
// 				pedalObj = list[i];
// 				if(pedalObj.typeName) {
// 					pedalObj.setStickTypeName(pedalObj.typeName);
// 				}
// 				y = pedalObj.$y;
// 			}
// 			this.lastOneStickY = y - pedalObj.height-20;
// 		}
//         // return nowStage;
// 	} 
// 	private getNowStageItem(playerMeter){
// 		let list = this.METER_STAGE_LIST;
// 		let item = null;
// 		// console.log('对象的米数',playerMeter);
// 		if(list.length) {
// 			for(let i=0;i<list.length;i++) {
// 				if(playerMeter>=list[i].minHeight&&playerMeter<list[i].maxHeight||i===(list.length-1)) {
// 					item = list[i];
// 					break;
// 				}
// 			}
// 		}
// 		return item;
// 	}
// 	private getRateList(rateList){
// 		let list = [];
// 		let num = 0;
// 		if(rateList.length) {
// 			for(let i=0;i<rateList.length;i++) {
// 				num = num+rateList[i];
// 				list.push(num);
// 			}
// 		}
// 		return list;
// 	}
// 	// 随机关卡
// 	private randomShowPoint(rateObj){
// 		let randomNum = Math.random();
// 		let list = [];
// 		let rateTotalList = this.getRateList(rateObj.pointRateList);
// 		// console.log('随机',this.getSinglePropKey(rateObj.singlePoprsRate))
// 		if(randomNum>0&&randomNum<=rateTotalList[0]) {
// 			list = this.setCheckPoints.setPropsAndStick({
// 				lastY:this.lastOneStickY,
// 				stageWidth:this.stage.$stageWidth,
// 				distance:rateObj.distance,
// 				propsName:this.getSinglePropKey(rateObj.singlePoprsRate),
// 				sticketName:'fixation'
// 			});
// 		}else if(randomNum>rateTotalList[0]&&randomNum<=rateTotalList[1]) {
// 			list = this.setCheckPoints.listSticket({
// 				lastY:this.lastOneStickY,
// 				stageWidth:this.stage.$stageWidth,
// 				distance:rateObj.distance,
// 				keyNameList:this.getMoreSticketKey(rateObj.moreSticketRate)
// 			});
// 		}else if(randomNum>rateTotalList[1]&&randomNum<=rateTotalList[2]) {
// 			list = this.setCheckPoints.fixtionStick({
// 			lastY:this.lastOneStickY,
//             stageWidth:this.stage.$stageWidth,
//             distance:rateObj.distance,
//             num:6,
// 			keyName:this.getSinglePropKey(rateObj.signleSticketRate)
// 			});
// 		}else if(randomNum>rateTotalList[2]&&randomNum<=rateTotalList[3]){
// 			list = this.setCheckPoints.fixtionStick({
// 				lastY:this.lastOneStickY,
// 				stageWidth:this.stage.$stageWidth,
// 				distance:50,
// 				num:6,
// 				keyName:'timing'
// 			});
// 		}else{
// 			list = this.setCheckPoints.listSticket({
// 				lastY:this.lastOneStickY,
// 				stageWidth:this.stage.$stageWidth,
// 				distance:rateObj.distance,
// 				keyNameList:this.getMoreSticketKey(rateObj.moreSticketRate)
// 			});
// 		}
// 		return list;
// 	}
// 	private getMoreSticketKey(rateList){
// 		let i = 0;
// 		let keyList = [];
// 		let keyItem = null;
// 		let rateNum = Math.floor(Math.random()*(Object.keys(rateList).length-1))+1;
// 		if(rateNum >= rateList.length) {
// 			rateNum = rateList.length-1;
// 		}
// 		while(i<=rateNum) {
// 			keyItem = this.getRandomKey(rateList);
// 			if(keyList.indexOf(keyItem) === -1) {
// 				keyList.push(keyItem);
// 				i++;
// 			}
// 		}
// 		// debugger
// 		return keyList;
// 	}
// 	private getSinglePropKey(rateList){
// 		let item = null;
// 		while(!item) {
// 			item = this.getRandomKey(rateList);
// 		}
// 		return item;
// 	}
// 	/**
// 	 * 根据固定的跳板随机两个跳板设置概率性的道具
// 	*/
// 	// private getFixtionSticket(fixtionList,nowStage,groupBox) {
// 	// 	let fixtionLen = fixtionList.length;
// 	// 	let num = this.STICK_STAGE_DISTANSE[this.getNowPropIndex(nowStage)].eachShowProps;
// 	// 	let stickList = [];
// 	// 	let randomNum=null;
// 	// 	let i = 0;
// 	// 	let getMyKey = null;
// 	// 	if(fixtionLen) {
// 	// 		num = Math.floor(Math.random()*(num-1))+1;
// 	// 		while(i<num && i<fixtionLen) {
// 	// 			randomNum = Math.floor(Math.random()*(fixtionLen-1));
// 	// 			if(stickList.indexOf(randomNum)===-1) {
// 	// 				stickList.push(randomNum);
// 	// 				i++;
// 	// 			}
// 	// 		}
// 	// 	}
// 	// 	for(let k=0;k<stickList.length;k++) {
// 	// 		getMyKey = this.getPropPercentName(nowStage,'props');
// 	// 		// console.log('12',getMyKey);
// 	// 		if(getMyKey) {
// 	// 			this.propsClass.setTypeStatus(getMyKey);
// 	// 			this.propsClass.addPropToStage(groupBox,fixtionList[stickList[k]]);
// 	// 			// this.STICK_STAGE_DISTANSE[propObj.stageIndex]['props'][propObj.getMyKey]--;
// 	// 		}
// 	// 	}
// 	// }
// 	// private setPropOnSticket(sticketObj,nowStage,groupBox){
// 	// 	let myKey = null;
// 	// 	let propsObj = null;
// 	// 	myKey = this.getPropPercentName(nowStage,'props');
// 	// 	if(myKey) {
// 	// 		this.propsClass.setTypeStatus(myKey);
// 	// 		propsObj = this.propsClass.addPropToStage(groupBox,sticketObj);
// 	// 	}
// 	// 	return propsObj;
// 	// }
//     /**
// 	 * 创建踏板对象
// 	*/
// 	// public createSticket(nowStage:number,initY, num,groupBox:eui.Group) {
// 	// 	let stickObj = null;
// 	// 	let spring = null;
// 	// 	let distance = this.caculateStickDistance(nowStage);
// 	// 	let sticketHeight = 0;
// 	// 	let keyName = null;
// 	// 	stickObj =  this.createStick();   ///     Object.create(this.allPropsObjectPool['stickItem']);
// 	// 	keyName = this.getPropPercentName(nowStage,'sticketPercentage');
// 	// 	groupBox.addChild(stickObj);
// 	// 	stickObj.setStickTypeName(keyName);
// 	// 	sticketHeight=stickObj.height ? stickObj.height : 30;
// 	// 	stickObj.$y = initY - (distance + sticketHeight);
// 	// 	stickObj.$x = Math.random() * (this.stage.stageWidth - stickObj.width);
// 	// 	stickObj.meter = this.changeToMeter(stickObj.$y, nowStage);
//     //     return {
//     //         stickObj:stickObj,
//     //         groupBox:groupBox
//     //     };
// 	// }
// 	// private createStick(){
// 	// 	let item = null;
// 	// 	let propsList = this.stickRecyclePool;
// 	// 	if(propsList.length) {
// 	// 		item = propsList[0];
// 	// 		propsList.shift();
// 	// 	}else {
// 	// 		item = new StickItem();
// 	// 	}
// 	// 	return item;
// 	// }
// 	public stickMoveLeftAndRight(allStickList) {
// 		let list = allStickList;
// 		let len = list.length;
// 		let item;
// 		for (let i = 0; i < len; i++) {
// 			item = list[i];
// 			if (item.TYPE_STATUS === item.TYPE_HORIZONTAL) {
// 				item.leftAndRightMove();
// 			}
// 			if(item.TYPE_STATUS === item.TYPE_TIMING && item.$y > this.stage.$stageHeight*0.35 && !item.isPlayWood) {
// 				item.setTimingSticket(2000,(thisItem)=>{
// 						thisItem.visible = false;
// 				});
// 			}
// 		}
// 	}
// 	public recycleAllObject(obj){
// 		if(obj.TYPE_NAME) {
// 			// if(obj.TYPE_NAME === 'trampoline') {
// 			// 	this.setCheckPoints.recycleObj(obj,obj.TYPE_NAME);
// 			// }else if(obj.TYPE_NAME === 'wing'){
// 			// 	this.setCheckPoints.recycleObj(obj,obj.TYPE_NAME);
// 			// }else if(obj.TYPE_NAME === 'rocket'){
// 			// }else
// 			 if(obj.TYPE_NAME === 'sticket'){
// 				this.setCheckPoints.recycleObj(obj,'stickRecyclePool');
// 			}else if(obj.TYPE_NAME ){
// 				this.setCheckPoints.recycleObj(obj,obj.TYPE_NAME);
// 			}
// 		}
// 	}
// } 
//# sourceMappingURL=AllSticks.js.map