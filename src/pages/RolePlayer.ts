class RolePlayer extends eui.Component {
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
	private frameNum:number=18;  //控制帧数的数量
	private isDown:boolean=false;  // 判断是否处于下落状态
	private distanceInit:number=30;
	private distance:number=30;  // 每个块的距离
	private playerIsMove:boolean= true; // 角色是否可以移动
	private endGame:boolean=false;


	private stageDistance:number=30;
	private lastPetalY:number;
	private petalHeight:number;

	// private pedalObj:StickItem;

	private orientation:any;


	

	private player:eui.Image;
	private gamePage:eui.Group;
	private stickList:eui.Group;
	private playBtnBox:eui.Group;
	private playBtn:eui.Image;
	// private longBg:eui.Image;


	private stickNum:number = 20;
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
		this.gamePage.percentHeight = 100;
		this.beginListenEvent();

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
	public beginGame() {

		this.setInitDataGame();  // 设置游戏的开始速度
		this.initSticket();
		this.setStartAddSpeed();
		this.setStartJumpeSpeed();
		this.beginAnimateEvent();
		this.orientationEvent();
	}
	/**
	 * 设置初始值
	 */
	public setInitDataGame(){
		this.jumpStartY = this.stage.$stageHeight-this.player.height-100;
		this.jumpHeightHight = this.stage.$stageHeight*0.4;
		this.player.visible = true;
		this.distance = this.distanceInit;
		this.playerIsMove = true;
		this.endGame = false;
		this.player.$y = this.stage.$stageHeight*0.8-this.player.height;
		// this.longBg.$y = 0;
	}
	/**
	 * 设置涂鸦的初始加速度
	 */
	private setStartAddSpeed(){
		this.nowAddSpeed = Math.abs(this.jumpHeightHight-this.jumpStartY)/this.frameNum/this.frameNum;
		this.nowAddDownSped = Math.abs(this.jumpHeightHight-this.jumpStartY)/this.frameNum/this.frameNum;
	}
	/**
	 * 	设置涂鸦的跳跃速度
	 */
	private setStartJumpeSpeed(){
		this.nowAddSpeed = Math.abs(this.jumpHeightHight-this.jumpStartY)/this.frameNum/this.frameNum;
		// this.initSpeed = Math.abs(this.jumpHeightHight-this.jumpStartY)/this.frameNum;
		this.nowSpeed =	Math.abs(this.jumpHeightHight-this.jumpStartY)/this.frameNum;
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
			// this.orientation = new egret.Motion();
			// window.addEventListener("deviceorientation", this.handleFunc.bind(this), true);
			//添加事件监听器
			this.orientation.addEventListener(egret.Event.CHANGE,this.handleFunc,this);
			//开始监听设备方向变化
			this.orientation.start();
		}
	}
	// private handleFunc(e:egret.MotionEvent){
	// 	let move = e.accelerationIncludingGravity.x;
	// 	console.log('摇动',e.accelerationIncludingGravity.x);
	// 	if(move>0) {
	// 		this.speedX = -move *0.8;
	// 	}else if(move<-0) {
	// 		this.speedX = -move *0.8;
	// 	}
	// 	//e.gamma>
	// }
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
		console.log();
		if(res.x>0.01) {
			this.speedX = res.x *this.stage.$stageWidth/9;
		}else if(res.x<-0.01) {
			this.speedX = res.x*this.stage.$stageWidth/9;
		}
		// alert(e);
	}
	// private handleFunc(e){
	// 	// console.log('摇动',e.gamma);
	// 	if(e.gamma>0) {
	// 		this.speedX = e.gamma *0.8;
	// 	}else if(e.gamma<-0) {
	// 		this.speedX = e.gamma *0.8;
	// 	}
	// }

	private initSticket() {
		let i = 0;
		let y =this.stage.$stageHeight;
		let pedalObj = null;

		while(y>0) {
			pedalObj = this.createSticket(this.stage.$stageHeight,i);
			y = pedalObj.$y;
			i++;
		}
		this.lastPetalY = y-pedalObj.height;
		this.petalHeight = pedalObj.height;
		console.log('最后一个y',this.lastPetalY);
	}
	private createSticket(initY,num) {
		let stickObj = null;
		let spring = null;
			stickObj = new StickItem();
			stickObj.isHit = false;
			this.stickList.addChild(stickObj);

			stickObj.$y = initY-(this.distance+stickObj.height) *num;
			stickObj.$x = Math.random() *(this.stage.stageWidth-stickObj.width);
			// spring = new FloorSpring();
			// this.stickList.addChild(spring);
			// spring.$x = stickObj.$x;
			// spring.$y = stickObj.$y - spring.height;
			return stickObj;
	}
	private beginAnimateEvent() {
		this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
	}
	private onEnterFrame() {
		// console.log('哈哈',this.player.$y);
		if(this.playerIsMove) {
			this.moveplayerY();
		}

		this.moveplayerX();
		this.stickMove();
		this.checkOverStick();
		this.addNewPetals();
		if(this.isDown) {
			this.checkHitMove();
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
		// 	this.isDown = true;
		// }else if((this.player.$y-this.player.width)>this.jumpStartY){
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
		// 	this.nowSpeed  = this.initSpeed;
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
	private checkHitMove() {
		let len = this.stickList.$children.length;
		let item,itemTwo;
		let playerX = this.player.$x;
		let playerY = this.player.$y+this.player.height;
		let playerW = this.player.width;
		let playerH = this.player.height;
		let itemMaxX =null;
		let itemMinX = null;
		let itemMaxY = null;
		let itemMinY = null;

		
		for(let i=0;i<len;i++) {
			item = this.stickList.$children[i];
			itemMaxX = item.$x+item.width-playerW/5;
			itemMinX = item.$x-playerW/3;
			itemMaxY = item.$y+item.height;
			itemMinY = item.$y;
			if(playerX>itemMinX&&playerX<itemMaxX&&playerY-itemMinY>=0.1&&playerY-itemMaxY<=0.1) {
				this.jumpStartY = itemMinY;
				// this.isDown = false;
				// this.player.$y = itemMinY - this.player.height;
				this.setStartJumpeSpeed();
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
	private checkIsGameOver() {
		let list = this.stickList.$children;
		let len = list.length;
		let item = null;

		if(this.player.$y+this.player.height>=this.stage.$stageHeight) {
			// this.playerIsMove = false;
			this.endGame = true;
			this.jumpStartY = this.stage.$stageHeight*2;
			this.setStartJumpeSpeed();
			this.nowAddDownSped = this.nowAddDownSped*3;
		}

	}
	private gotoMoveBg() {
		this.removeAllStickList();
		// if(this.longBg.$y+(this.longBg.height-this.stage.$stageHeight)<=60) {
		// 	this.endPlayerMove();
		// }else {
		// 	this.longBg.$y =  this.longBg.$y - 60;
		// }
		if(this.player.$y>this.stage.$stageHeight&&	this.nowSpeed<0) {
			this.gameOver();
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
		// this.orientation.stop();
		this.playBtnBox.visible = true;
	}
	private removeAllStickList() {
		this.stickList.removeChildren();
	}
	private stickMove() {
		let list = this.stickList.$children;
		let len = list.length;
		let item = null;
		let speed;
		

		if((this.jumpStartY-this.stage.$stageHeight*0.8)<0.1 && this.nowSpeed>0) {
			for(let i = 0;i<len;i++) {
				item = list[i];
				speed = Math.abs(this.jumpStartY-this.stage.$stageHeight)/this.frameNum;
				item.$y = item.$y +	speed;     // this.frameNum
				if(item &&　item.isHit) {
					this.jumpStartY = item.$y - this.player.height;
				}
			}
			this.lastPetalY = this.lastPetalY + speed;
		}
		// else if(this.nowSpeed<0 && this.player.$y+this.player.height>=this.stage.$stageHeight) {
		// 		for(let i = 0;i<len;i++) {
		// 		item = list[i];
		// 		item.$y = item.$y +this.nowSpeed*1.5;
		// 		this.player.$y = this.stage.$stageHeight*0.9;
		// 	}
				
		// }
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
			// nowLen = this.stickList.$children.length;
			// nowList = this.stickList.$children;
			// for(let k=0;k<removeChildList.length;k++) {
			// 	this.stickList.addChild(removeChildList[k]);
			// 	removeChildList[k].$y = 0-this.distance-removeChildList[k].height-Math.abs(this.nowSpeed);
			// 	removeChildList[k].$x = Math.random()*(this.stage.$stageWidth-removeChildList[k].width);
			// }
				
		}
	}

	private addNewPetals() {
		let i = 0;
		let y =0;
		let pedalObj = null;

		if(this.lastPetalY>this.stageDistance+this.petalHeight) {
			this.distance = this.distance+5;
			while(y>-this.stage.$stageHeight) {
				pedalObj = this.createSticket(0,i);
				y = pedalObj.$y;
				i++;
			}
			this.lastPetalY = y-pedalObj.height;
			this.stageDistance = this.stageDistance +2;
		}
	}
}
//implements  eui.UIComponent 