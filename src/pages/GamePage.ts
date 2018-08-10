class GamePage extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
		// this.skinName = RolePlayer;
	}


	private jumpHeightHight:number; // 正常最高的高度
	private jumpStartY:number=null; // 起跳高度

	private nowAddSpeed:number; // 当前那个涂鸦的向上加速度
	private nowAddDownSped:number;  // 涂鸦向下的加速度，固定的
	private nowSpeed:number; // 当前那个涂鸦速度
	private initSpeed:number; //  涂鸦的初始速度
	private frameNum:number=20;  //控制帧数的数量
	private isDown:boolean=false;  // 判断是否处于下落状态
	private distanceInit:number=30;
	private distance:number=10;  // 每个块的距离
	private playerIsMove:boolean= true; // 角色是否可以移动
	private endGame:boolean=false;
	private nowStage:number= 1;
	private nowSpringNumber:number; // 当前显示的弹簧个数


	private stageDistance:number=30;  // 每个阶段的间隔
	private lastPetalY:number;   // 当前最后一个踏板的Y值
	private petalHeight:number;  // 绿色踏板的高度
	private preStickY:number;  // 前一个踏板的位置

	private stickMoveSpeed:number;
	private stickAddSpeed:number;

	// private pedalObj:StickItem;

	private orientation:any;

	private JUMP_STATUS:number=1;  // 当前跳跃的状态
	private JUMP_NORMAL:number=1;  // 正常跳跃
	private JUMP_SPRING:number=2;  // 弹簧跳跃
	private STAGE_METER:number=200; // 一屏等于多少米


	//  弹簧分阶段出现的阶级
	private SPRING_STAGE_LINE:any=[  // 弹簧的分段
		{
			minHeight:200,
			maxHeight:1000,
			num:10
		},
		{
			minHeight:1001,
			maxHeight:2000,
			num:15
		},
		{
			minHeight:2001,
			maxHeight:5000,
			num:20
		},
	];
	private springStageNum:any=[];  // 用于存储每个弹簧应该出现的位置

	// 每个阶段跳板的最大间距
	private STICK_STAGE_DISTANSE:any=[
		{
			minHeight:0,
			maxHeight:1000,
			distance:40
		},
		{
			minHeight:1001,
			maxHeight:2000,
			distance:50
		},
		{
			minHeight:2001,
			maxHeight:4000,
			distance:60
		},
		{
			minHeight:4001,
			maxHeight:6000,
			distance:70
		},
	]　　
	

	private scoreText:eui.Label;
	private player:DoodlePlayer;
	private gamePage:eui.Group;
	private stickList:eui.Group;
	private playBtnBox:eui.Group;
	private playBtn:eui.Image;
	private longBg:eui.Image;
	private springList:eui.Group;
	private doodleBox:eui.Group;
	// private doodlePlayer:eui.Component;


	private stickNum:number = 30;
	public childList:any = [];
	private stickMoveList:any=[];

	private initAddSpeed:number= 0.5;
	private hitSpeed:number=13;
	private isStickMove:boolean=false;
	private hitNowNum:number=null;
	private speedX:number=0;
	private playerChangeY:number=0;
	private playerBeforeY:number=0;
	// private removeChildList:any=[];


	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected createChildren():void
	{
		super.createChildren();
		this.percentHeight=100;
		this.percentWidth=100;
		this.gamePage.percentHeight = 100;
		this.beginListenEvent();  //  监听点击开始的按钮
		// egret.Tween.get(this.player).to({x:this.stage.$stageWidth,alpha:1},500);

	}
	
	/**
	 * 监听点击事件
	 */
	private beginListenEvent() {
		this.playBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			this.beginGame();
			this.playBtnBox.visible = false;
		},this)
	}
	/**
	 * 开始游戏
	 */
	public beginGame() {  // 开始游戏的入口
		this.createDoodle();
		this.setInitDataGame();  // 设置游戏的开始数据
		this.initSticket();     // 初始化第一屏的踏板
		this.setStartAddSpeed();  // 设置涂鸦开始的加速度
		this.setStartJumpeSpeed(this.frameNum);  // 设置涂鸦开始的速度
		this.beginAnimateEvent();  // 开始动画监听
		this.orientationEvent();  //　开始监听左右的加速计
	}
	// 创建涂鸦
	private createDoodle() {
		this.player = new DoodlePlayer();
		this.doodleBox.addChild(this.player);
		this.player.$x = this.stage.$stageWidth/2;
		console.log('对象',this.player.width,this.player.height,this.player.x,this.player.y,this.player.$x,this.player);
	}
	/**
	 * 设置初始值
	 */
	public setInitDataGame(){
		this.jumpStartY = this.stage.$stageHeight-this.player.height-100;
		this.jumpHeightHight = this.stage.$stageHeight*0.6;
		this.player.visible = true;
		// this.distance = this.distanceInit;
		this.preStickY = this.stage.$stageHeight;
		this.playerIsMove = true;
		this.endGame = false;
		this.player.$y = this.stage.$stageHeight*0.8-this.player.height;
		this.longBg.$y = 0;
		this.JUMP_STATUS = this.JUMP_NORMAL;
		this.nowStage = 1;
		this.springStageNum = [];
		this.nowSpringNumber = 0;
		this.scoreText.visible= false;
		this.getRandomPosition();  // 初始化弹簧的数据
	}
	/**
	 * 设置涂鸦的初始加速度
	 */
	private setStartAddSpeed(){
		// this.nowAddSpeed = Math.abs(this.jumpHeightHight-this.jumpStartY)/this.frameNum/this.frameNum;
		// this.nowAddDownSped = Math.abs(this.jumpHeightHight-this.jumpStartY)/this.frameNum/this.frameNum;
		let frame = this.frameNum*1.2;
		let moveX = Math.abs(this.jumpHeightHight-this.jumpStartY)*2/(frame*(frame+1));
		this.nowAddSpeed = moveX;
		this.nowAddDownSped = moveX*1.8;
	}
	/**
	 * 	设置涂鸦的跳跃速度
	 */
	private setStartJumpeSpeed(frame){
		// this.jumpStartY = this.stage.$stageHeight*0.6;
	
		// this.nowAddSpeed = Math.abs(this.jumpHeightHight-this.jumpStartY)/this.frameNum/this.frameNum;
		// this.nowSpeed =	Math.abs(this.jumpHeightHight-this.jumpStartY)/this.frameNum;
		// let frame = this.frameNum;
		let moveX = Math.abs(this.jumpHeightHight-this.jumpStartY)*2/(frame*(frame+1));
		this.nowAddSpeed = moveX;
		// this.nowAddDownSped = moveX;
		this.nowSpeed =	moveX*frame;

		console.log('移动',this.jumpHeightHight-this.jumpStartY);
	}
	/**
	 * 像素更换成多少米
	 */
	public changeToMeter(y,stage) {
		let meterNum = null;
		if(y>0) {
			meterNum=(this.stage.$stageHeight-y)/this.stage.$stageHeight*this.STAGE_METER+(stage-1)*200;
		}else {
			meterNum=(Math.abs(y))/this.stage.$stageHeight*this.STAGE_METER+stage*200;
		}


		return meterNum;
	}
	/**
	 * 计算当前这个跳板的间距
	 */
	private caculateStickDistance(){
		let distand = null;
		let meter = this.nowStage*this.STAGE_METER;
		let list = this.STICK_STAGE_DISTANSE;
		let len = list.length;
		

		for(let i=0;i<len;i++) {
			if(meter>=list[i].minHeight&&meter<=list[i].maxHeight || i>=len-1) {
				distand = Math.ceil(Math.abs(Math.random()*(list[i].distance-this.distanceInit))+this.distanceInit);
				break;
			}
		}
		// console.log('距离',distand);
		return distand;

	}
	private setStickSpeed(distanceY,frame) {
		// let frame = this.frameNum; // this.stage.$stageHeight*0.9-this.jumpStartY
		this.stickMoveSpeed = Math.abs(distanceY)*2/((frame+1));
		this.stickAddSpeed= Math.abs(distanceY)*2/(frame*(frame+1));
	}
	private orientationEvent() {
		let _self = this;
		
		if(wx && wx.onAccelerometerChange) {
			wx.onAccelerometerChange(function (value){
				console.log('value',value.x);
				_self.handleFuncWx(value);
			})
		}else {
			this.orientation = new egret.DeviceOrientation();
			//添加事件监听器
			this.orientation.addEventListener(egret.Event.CHANGE,this.handleFunc,this);
			//开始监听设备方向变化
			this.orientation.start();
		}
	}
	private handleFunc(e:egret.OrientationEvent){
		// console.log('摇动',e);
		if(e.gamma>0) {
			this.speedX = e.gamma *0.8;
		}else if(e.gamma<-0) {
			this.speedX = e.gamma *0.8;
		}
	}
	private handleFuncWx(res){
		// console.log('摇动',e);
		// let angle = Math.atan2(-res.x, Math.sqrt(res.y * res.y + res.z * res.z)) * 57.3;
		if(res.x>0) {  // 向右
			this.speedX = res.x *this.stage.$stageWidth/9;
			this.player.setSideStatus(this.player.SIDE_RIGHT);
		}else if(res.x<0) {  // 向左
			this.speedX = res.x*this.stage.$stageWidth/9;
			this.player.setSideStatus(this.player.SIDE_LEFT);
		}
	}
	/**
	 * 初始化第一屏的踏板的位置，随机为主
	 */
	private initSticket() {
		let i = 0;
		let y =this.stage.$stageHeight;
		let pedalObj = null;

		while(y>0) {
			pedalObj = this.createSticket(this.preStickY,i);
			y = pedalObj.$y;
			this.preStickY = pedalObj.$y;
			i++;
		}
		console.log(this.stickList);
		// debugger;
		this.lastPetalY = y-pedalObj.height;
		this.petalHeight = pedalObj.height;
		console.log('最后一个y',this.lastPetalY);
		// if(this.nowSpringNumber<this.springStageNum.length&& stickObj.TYPE_STATUS === stickObj.TYPE_GREEN) {
		// 	if(Math.abs(stickObj.meter-this.springStageNum[this.nowSpringNumber])<30) {
		// 		// debugger
		// 		this.createSpring(stickObj);
		// 		this.nowSpringNumber++;
		// 	}
		// }
	}
	// private setSpringPosition() {
	// 	let list = this.stickList.$children;
	// 	let len = list.length;

	// 	if(len>0) {
	// 		for(let i=0;i<len;i++) {
	// 			if(list[i].meter){}
	// 		}
	// 	}

	// }
	/**
	 * 创建绿色的踏板
	 */
	private createSticket(initY,num) {
		let stickObj = null;
		// let randomPro = Math.random(); initY *num
		let spring = null;
		let distance = this.caculateStickDistance();

			stickObj = new StickItem();
			stickObj.isHit = false;
			this.stickList.addChild(stickObj);
			stickObj.$y = initY-(distance+stickObj.height) ;
			stickObj.$x = Math.random() *(this.stage.stageWidth-stickObj.width);
			stickObj.meter = this.changeToMeter(stickObj.$y,this.nowStage);  
			// stickObj.setRandomStick();
			// console.log('米数',	stickObj.meter ,stickObj.$y);
			if(this.nowSpringNumber<this.springStageNum.length&& stickObj.TYPE_STATUS === stickObj.TYPE_GREEN) {
				if(this.nowStage*this.STAGE_METER>this.springStageNum[this.nowSpringNumber]&&(this.nowStage-1)*this.STAGE_METER<this.springStageNum[this.nowSpringNumber]) {
					// debugger
					let random = Math.random();
					if(random>0.5) {
						this.createSpring(stickObj);
						this.nowSpringNumber++;
					}
		
				}
			}
			return stickObj;
	}
	/**
	 * 设置弹簧应该出现的每个阶段性位置，用数组存起来
	 */
	private getRandomPosition(){
		let stageLen = this.SPRING_STAGE_LINE.length;
		let item,randomNum,list,minStage;

		for(let i=0;i<stageLen;i++) {
			item = this.SPRING_STAGE_LINE[i];
			for(let j=0;j<item.num;j++) {
				minStage = (item.maxHeight-item.minHeight)/item.num;
				randomNum = Math.ceil(Math.random()*minStage+item.minHeight+minStage*j);
				this.springStageNum.push(randomNum);
			}
		}
		list = this.springStageNum.sort(function(a,b){
			return a-b;
		})
		this.springStageNum = list;
		console.log('阶段的数据',this.springStageNum);
	}
	/**
	 * 创建弹簧
	 */
	private createSpring(stickObj) {
		let springObj = new FloorSpring();
		let random = Math.random();
	


		this.springList.addChild(springObj);
		springObj.$y = stickObj.$y-springObj.height*0.8;
		springObj.meter = this.changeToMeter(springObj.$y ,this.nowStage);
		if(random>0.5) {
			springObj.$x = stickObj.$x+stickObj.width-springObj.width*1.2;
		}else {
			springObj.$x = stickObj.$x+springObj.width/2;
		}
		return springObj;
	}

	private beginAnimateEvent() {
		this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
	}
	private onEnterFrame() {
	
		// this.moveplayerY();
		if(this.playerIsMove) {
			this.moveplayerY();
		}
		this.moveplayerX();
		this.switchStickMove();
		this.checkOverStick();
		this.addNewPetals();
		this.stickMoveLeftAndRight();
		if(this.isDown) {
			this.checkIsStickHit();
			this.checkIsHitSpring();
		}
		if(this.endGame) {
			this.gotoMoveBg();
		}else {
			this.checkIsGameOver();
		}

	}
	private moveplayerY() {

		// console.log('人物',this.player.$y,this.jumpStartY,this.nowSpeed);
		// this.setStartJumpeSpeed();
	
		if(this.nowSpeed<0) {
			this.isDown = true;
			this.nowSpeed = this.nowSpeed-this.nowAddDownSped;
		}else {
			this.isDown = false;
			this.nowSpeed = this.nowSpeed-this.nowAddSpeed;
			
		}
		// this.nowSpeed = this.nowSpeed-this.nowAddSpeed;
		this.player.$y = this.player.$y - this.nowSpeed;



		// if(this.player.$y<this.jumpHeightHight) {
		// 	console.log('Y',this.player.$y);
		// }
		// else if((this.player.$y-this.player.width)>this.jumpStartY){
		// 	this.isDown = false;
		// }
		// if(!this.isDown) {
		// 	this.nowSpeed = this.nowSpeed+this.nowAddSpeed;
		// 	// this.player.$y -= 20;
		// 			// this.nowSpeed = this.nowSpeed-this.nowAddSpeed;
		// }else {
		// 	this.nowSpeed = this.nowSpeed-this.nowAddSpeed;
		// 	// this.player.$y += 20;
		// }
		// this.player.$y = this.player.$y + this.nowSpeed;
		// if(this.player.$y<this.jumpHeightHight) {
		// 	this.nowSpeed = -Math.abs(this.nowSpeed);
		// }
		// if(this.player.$y-this.jumpStartY>0.1) {
		// 	this.player.$y=this.jumpStartY;
		// 	this.setStartJumpeSpeed();
		// // this.nowSpeed = Math.abs(this.jumpHeightHight-this.jumpStartY)/120;
		// // this.nowAddSpeed = Math.abs(this.jumpHeightHight-this.jumpStartY)/120/60;
		// // this.initSpeed = Math.abs(this.jumpHeightHight-this.jumpStartY)/120;
		// }
	}
	private moveplayerX(){
		this.player.$x = this.player.$x + this.speedX;
		if(this.player.$x <-this.player.width) {
			this.player.$x = this.stage.$stageWidth;
		}else if(this.player.$x>this.stage.$stageWidth) {
			this.player.$x = -this.player.width;
		}
	}
	private checkIsStickHit() {
		let len = this.stickList.$children.length;
		let item,itemTwo,itemHalf;
		let playerX = this.player.$x;
		let playerY = Math.floor(this.player.$y+this.player.height);
		let playerW = this.player.width;
		let playerH = this.player.height;
		let playerMinX = Math.floor(this.player.$x + this.player.width*0.27);
		let playerMaxX = Math.floor(this.player.$x+this.player.width*0.72);
		let itemMaxX =null;
		let itemMinX = null;
		let itemMaxY = null;
		let itemMinY = null;
		let playerHHalf = playerH/2;
		let nowMiddle = this.player.$y+playerHHalf;

		
		for(let i=0;i<len;i++) {
			item = this.stickList.$children[i];
			itemMaxX = Math.floor(item.$x+item.width);
			itemMinX = Math.floor(item.$x);
			itemMaxY = Math.floor(item.$y+item.height);
			itemMinY = Math.floor(item.$y);
			itemHalf = item.height/2+item.$y;
			
			//playerMaxX>=itemMinX&&playerMinX<=itemMaxX&&playerY>=itemMinY&&playerY<=itemMaxY    +Math.abs(this.nowSpeed) console.log('跳跃',itemMaxX,itemMinX,itemMaxY,itemMinY,playerY,playerW,playerX>=itemMinX&&playerX<=itemMaxX,playerY>=itemMinY&&playerY<=itemMaxY);
			if(playerMaxX>=itemMinX&&playerMinX<=itemMaxX&&playerY>=itemMinY&&(itemHalf-nowMiddle)>0&& (itemHalf-nowMiddle)<(playerHHalf+item.height/2)) {
				this.player.$y = itemMinY - this.player.height;
				this.jumpStartY = itemMinY;
				this.JUMP_STATUS = this.JUMP_NORMAL;
				this.setStartJumpeSpeed(this.frameNum);
				this.setStickSpeed(this.stage.$stageHeight*0.9-this.jumpStartY,this.frameNum);
				item.isHit = true;
				console.log('撞击',this.jumpStartY ,item.isHit );
				for(let j=0;j<len;j++) {
					itemTwo = this.stickList.$children[j];
					if(i!=j) {
						itemTwo.isHit = false;
					}
				}
				break;
			}
		}

	}
	private checkIsHitDoodle(list,callback){
		let item,itemMinX,itemMaxX,itemMaxY,itemMinY,itemHalf,itemMiddleY,pointDistance,maxDistance;
		let listLen = list.length;
		// let playerX = this.player.$x;
		let playerY = this.player.$y+this.player.height;
		let playerHalf = this.player.height/2;
		let playerMinX = Math.floor(this.player.$x + this.player.width*0.27);
		let playerMaxX = Math.floor(this.player.$x+this.player.width*0.72);
		let playerMiddel = this.player.$y+playerHalf;

		for(let i=0;i<listLen;i++) {
			item = list[i];
			itemMaxX = item.$x+item.width;
			itemMinX = item.$x;
			itemMinY = item.$y;
			itemMaxY = item.$y+item.height;
			itemHalf = item.height/2;
			itemMiddleY = itemMinY+itemHalf;
			pointDistance = itemMiddleY-playerMiddel;
			maxDistance = itemHalf+playerHalf;
			if(playerMaxX>=itemMinX&&playerMinX<=itemMaxX&&playerY>=itemMinY&&pointDistance>0&& pointDistance<maxDistance) {
				callback(itemMinY);
			}
		}
	

	}
	private checkIsHitSpring() {
		let springListChild = this.springList.$children;
		let len = springListChild.length;
		let item,itemTwo;
		let playerX = this.player.$x;
		let playerY = this.player.$y+this.player.height;
		let playerW = this.player.width;
		let playerH = this.player.height;
		let playerMinX = this.player.$x + this.player.width*0.27;
		let playerMaxX = this.player.$x+this.player.width*0.72;
		let itemMaxX =null;
		let itemMinX = null;
		let itemMaxY = null;
		let itemMinY = null;
		

		
		for(let i=0;i<len;i++) {
			item = springListChild[i];
			itemMaxX = item.$x+item.width;
			itemMinX = item.$x;
			itemMaxY = item.$y+item.height;
			itemMinY = item.$y;
			if(itemMinX<playerMaxX&&itemMaxX>playerMinX&&playerY>=itemMinY&&playerY<=itemMaxY) {   //playerX>itemMinX&&playerX<itemMaxX&&playerY-itemMinY>=0.1&&playerY-itemMaxY<=0.1
				console.log('碰撞了弹簧');
				this.JUMP_STATUS = this.JUMP_SPRING;
				this.jumpStartY=itemMaxY;
				this.setStartJumpeSpeed(this.frameNum*3);
				this.setStickSpeed(this.stage.$stageHeight*2,this.frameNum*3);
				item.showOffenSpring();
				break;
			}
		}
	}
	private checkIsGameOver() {
		let list = this.stickList.$children;
		let len = list.length;
		let item = null;
		
		if(this.player.$y+this.player.height>=this.stage.$stageHeight) {
			// this.playerIsMove = false;
			this.setScoreText();
			this.endGame = true;
			this.jumpStartY = this.stage.$stageHeight*1.5;
			this.setStartJumpeSpeed(this.frameNum);
			this.nowAddDownSped = this.nowAddDownSped*3;
		}

	}
	private setScoreText() {
		this.scoreText.text = '分数：' + Math.ceil(this.changeToMeter(this.jumpStartY,this.nowStage));
	}
	private showScoreText() {
		this.scoreText.visible = true;
	}
	private gotoMoveBg() {
		this.removeAllList();
		// if(this.longBg.$y+(this.longBg.height-this.stage.$stageHeight)<=60) {
		// 	this.endPlayerMove();
		// }else {
		// 	this.longBg.$y =  this.longBg.$y - 60;
		// }
		if(this.player.$y>this.stage.$stageHeight&&	this.nowSpeed<0) {
			this.gameOver();
		}else {
			this.longBg.$y =  this.longBg.$y - 10;
		}


	}
	// private endPlayerMove() {
	// 	this.player.$y = this.player.$y + 30;
	// 	if(this.player.$y>this.stage.$stageHeight*0.8) {
	// 		this.gameOver();
	// 	}
	// }
	private gameOver() {
		this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
		this.player.visible = false;
		this.playBtnBox.visible = true;
		this.doodleBox.removeChildren();
		this.showScoreText();
		if(wx && wx.stopAccelerometer) {
			wx.stopAccelerometer(function (){
				console.log('停止监听左右');
			})
		}else {
			this.orientation.stop();
		}

	}
	private removeAllList() {
		this.stickList.removeChildren();
		this.springList.removeChildren();
	}
	private switchStickMove() {
		// let list = this.stickList.$children;
		// let springList = this.springList.$children;
		// let springLen = springList.length;
		// let len = list.length;
		// let item,springItem;
		// let speed;

		switch(this.JUMP_STATUS) {
			case this.JUMP_NORMAL:
			if((this.jumpStartY-this.stage.$stageHeight*0.8)<0.1 && this.nowSpeed>0) {
				this.stickMove();
			}
			break;
			case this.JUMP_SPRING:
			if(this.nowSpeed>0) {
				this.stickMove();
			}
			break;
		}

		// if((this.jumpStartY-this.stage.$stageHeight*0.8)<0.1 && this.nowSpeed>0) {
			// speed = this.changeMaObjMoveSpeed()
			// console.log('踏板移动',speed);
			// // debugger;
			// for(let i = 0;i<len;i++) {
			// 	item = list[i];
			// 	item.$y = item.$y +	speed;     // this.frameNum
			// 	if(item &&　item.isHit) {
			// 		// this.jumpStartY = item.$y - this.player.height;
			// 	}
			// }
			// for(let j=0;j<springLen;j++) {
			// 	springItem = springList[j];
			// 	springItem.$y = springItem.$y +	speed;  
			// }
			// this.lastPetalY = this.lastPetalY + speed;
		// }

	}
	private stickMove() {
		let list = this.stickList.$children;
		let springList = this.springList.$children;
		let springLen = springList.length;
		let len = list.length;
		let item,springItem;
		let speed;

		speed = this.changeMaObjMoveSpeed()
		// console.log('踏板移动',speed);
		// debugger;
		for(let i = 0;i<len;i++) {
			item = list[i];
			item.$y = item.$y +	speed;     // this.frameNum
			if(item &&　item.isHit) {
				// this.jumpStartY = item.$y - this.player.height;
			}
		}
		for(let j=0;j<springLen;j++) {
			springItem = springList[j];
			springItem.$y = springItem.$y +	speed;  
		}
		this.lastPetalY = this.lastPetalY + speed;
	}
	private stickMoveLeftAndRight() {
		let list = this.stickList.$children;
		let len = list.length;
		let item;
		for(let i = 0;i<len;i++) {
			item = list[i];
			if(item.TYPE_STATUS === item.TYPE_BLUE) {
				// debugger
				item.leftAndRightMove();
			}
		}
	}
	/**
	 * 计算地图上物体的移动速度
	 */
	private changeMaObjMoveSpeed() {
		let speed = 0;
		// switch(this.JUMP_STATUS) {
		// 	case this.JUMP_NORMAL:
		// 	this.stickMoveSpeed = this.stickMoveSpeed -this.stickAddSpeed; //Math.abs(this.jumpStartY-this.stage.$stageHeight)/this.frameNum
		// 	speed  = this.stickMoveSpeed;
		// 	console.log('移动3',this.stage.$stageHeight-this.jumpStartY);
		// 	// debugger
		// 	break;
		// 	case this.JUMP_SPRING:
		// 	speed = Math.abs(this.stage.$stageHeight*2)/60; // Math.abs(this.stage.$stageHeight*2)/60 
		// 	break;
		// }
		this.stickMoveSpeed = this.stickMoveSpeed -this.stickAddSpeed; //Math.abs(this.jumpStartY-this.stage.$stageHeight)/this.frameNum
		speed  = this.stickMoveSpeed;
		return speed;
	}
	private checkOverStick() {
		let list = this.stickList.$children;
		let len = list.length;
		let item;
		let removeChildList = [];
		let nowLen,nowList;

		for(let i=0;i<len;i++) {
			item =list[i];
			if(item.$y>=this.stage.$stageHeight) {
				item.isHit = false;
				removeChildList.push(item);
			}	
			
		}
		if(removeChildList.length) {
			for(let j=0;j<removeChildList.length;j++) {
				if(removeChildList[j]) {
					this.stickList.removeChild(removeChildList[j]);
				}

			}	
		}
	}
	 // 当当前的最后那个跳板大于某个值，就创建下一屏的跳板
	private addNewPetals() {
		let i = 0;
		let y =0;
		let pedalObj = null;


		if(this.lastPetalY>this.stageDistance+this.petalHeight) {
			this.preStickY  = 0;
			// this.distance = this.distance+5;
			this.nowStage++;
			while(y>-this.stage.$stageHeight) {
				pedalObj = this.createSticket(this.preStickY,i);
				y = pedalObj.$y;
				this.preStickY = pedalObj.$y;
				i++;
			}
		
			this.lastPetalY = y-pedalObj.height;
			// this.stageDistance = this.stageDistance +2;
		}
	}
	
}