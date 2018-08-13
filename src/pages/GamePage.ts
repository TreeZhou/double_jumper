class GamePage extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	private frameNum: number = 20;  //控制帧数的数量
	private distanceInit: number = 30;
	private distance: number = 10;  // 每个块的距离
	private playerIsMove: boolean = true; // 角色是否可以移动
	private endGame: boolean = false;
	private nowStage: number = 1;
	private nowSpringNumber: number; // 当前显示的弹簧个数


	private stageDistance: number = 30;  // 每个阶段的间隔
	private lastPetalY: number;   // 当前最后一个踏板的Y值
	private petalHeight: number;  // 绿色踏板的高度
	private preStickY: number;  // 前一个踏板的位置

	private stickMoveSpeed: number;
	private stickAddSpeed: number;

	// private pedalObj:StickItem;

	private orientation: any;
	private STAGE_METER: number = 200; // 一屏等于多少米


	//  弹簧分阶段出现的阶级
	private SPRING_STAGE_LINE: any = [  // 弹簧的分段
		{
			minHeight: 200,
			maxHeight: 1000,
			num: 10
		},
		{
			minHeight: 1001,
			maxHeight: 2000,
			num: 15
		},
		{
			minHeight: 2001,
			maxHeight: 5000,
			num: 20
		},
	];
	private springStageNum: any = [];  // 用于存储每个弹簧应该出现的位置

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


	private scoreText: eui.Label;
	private player: DoodlePlayer;
	private gamePage: eui.Group;
	private stickList: eui.Group;
	private playBtnBox: eui.Group;
	private playBtn: eui.Image;
	private longBg: eui.Image;
	private springList: eui.Group;
	private doodleBox: eui.Group;
	// private doodlePlayer:eui.Component;


	private stickNum: number = 30;
	public childList: any = [];
	private stickMoveList: any = [];

	private initAddSpeed: number = 0.5;
	private hitSpeed: number = 13;
	private isStickMove: boolean = false;
	private hitNowNum: number = null;
	private speedX: number = 0;
	private playerChangeY: number = 0;
	private playerBeforeY: number = 0;


	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected createChildren(): void {
		super.createChildren();
		this.percentHeight = 100;
		this.percentWidth = 100;
		this.gamePage.percentHeight = 100;
		this.beginListenEvent();  //  监听点击开始的按钮

	}

	/**
	 * 监听点击事件
	 */
	private beginListenEvent() {
		this.playBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.beginGame();
			this.playBtnBox.visible = false;
		}, this)
	}
	/**
	 * 开始游戏
	 */
	public beginGame() {  // 开始游戏的入口
		this.createDoodle();
		this.setInitDataGame();  // 设置游戏的开始数据
		this.initSticket();     // 初始化第一屏的踏板
		this.beginAnimateEvent();  // 开始动画监听
		this.orientationEvent();  //　开始监听左右的加速计
	}
	// 创建涂鸦
	private createDoodle() {
		this.player = new DoodlePlayer();
		this.doodleBox.addChild(this.player);
		this.player.$x = this.stage.$stageWidth / 2;
	}
	/**
	 * 设置初始值
	 */
	public setInitDataGame() {
		this.player.visible = true;
		this.preStickY = this.stage.$stageHeight;
		this.playerIsMove = true;
		this.endGame = false;
		this.player.$y = this.stage.$stageHeight*0.9;
		this.longBg.$y = 0;
		this.nowStage = 1;
		this.springStageNum = [];
		this.nowSpringNumber = 0;
		this.scoreText.visible = false;
		this.getRandomPosition();  // 初始化弹簧的数据


		console.log('对象',this.player.width,this.player.height,this.player.$y,this.player.$x,this.player.anchorOffsetX,this.player.anchorOffsetY);
	}
	/**
	 * 像素更换成多少米
	 */
	public changeToMeter(y, stage) {
		let meterNum = null;
		if (y > 0) {
			meterNum = (this.stage.$stageHeight - y) / this.stage.$stageHeight * this.STAGE_METER + (stage - 1) * 200;
		} else {
			meterNum = (Math.abs(y)) / this.stage.$stageHeight * this.STAGE_METER + stage * 200;
		}


		return meterNum;
	}
	/**
	 * 计算当前这个跳板的间距
	 */
	private caculateStickDistance() {
		let distand = null;
		let meter = this.nowStage * this.STAGE_METER;
		let list = this.STICK_STAGE_DISTANSE;
		let len = list.length;


		for (let i = 0; i < len; i++) {
			if (meter >= list[i].minHeight && meter <= list[i].maxHeight || i >= len - 1) {
				distand = Math.ceil(Math.abs(Math.random() * (list[i].distance - this.distanceInit)) + this.distanceInit);
				break;
			}
		}
		// console.log('距离',distand);
		return distand;

	}
	private setStickSpeed(distanceY, frame) {
		// let frame = this.frameNum; // this.stage.$stageHeight*0.9-this.jumpStartY
		this.stickMoveSpeed = Math.abs(distanceY) * 2 / ((frame + 1));
		this.stickAddSpeed = Math.abs(distanceY) * 2 / (frame * (frame + 1));
	}
	private orientationEvent() {
		let _self = this;

		if (wx && wx.onAccelerometerChange) {
			wx.onAccelerometerChange(function (value) {
				console.log('value', value.x);
				_self.handleFuncWx(value);
			})
		} else {
			this.orientation = new egret.DeviceOrientation();
			//添加事件监听器
			this.orientation.addEventListener(egret.Event.CHANGE, this.handleFunc, this);
			//开始监听设备方向变化
			this.orientation.start();
		}
	}
	private handleFunc(e: egret.OrientationEvent) {
		if (e.gamma > 0) {
			this.speedX = e.gamma * 0.8;
		} else if (e.gamma < -0) {
			this.speedX = e.gamma * 0.8;
		}
	}
	private handleFuncWx(res) {
		if (res.x > 0) {  // 向右
			this.speedX = res.x * this.stage.$stageWidth / 9;
			this.player.setSideStatus(this.player.SIDE_RIGHT);
		} else if (res.x < 0) {  // 向左
			this.speedX = res.x * this.stage.$stageWidth / 9;
			this.player.setSideStatus(this.player.SIDE_LEFT);
		} else {
			this.speedX = res.x * this.stage.$stageWidth / 9;
			this.player.setSideStatus(this.player.SIDE_FACE);
		}
		this.player.changePlaySide(true);
	}
	/**
	 * 初始化第一屏的踏板的位置，随机为主
	 */
	private initSticket() {
		let i = 0;
		let y = this.stage.$stageHeight;
		let pedalObj = null;

		while (y > 0) {
			pedalObj = this.createSticket(this.preStickY, i);
			y = pedalObj.$y;
			this.preStickY = pedalObj.$y;
			i++;
		}
		this.lastPetalY = y - pedalObj.height;
		this.petalHeight = pedalObj.height;
		console.log('最后一个y', this.lastPetalY);
	}

	/**
	 * 创建绿色的踏板
	 */
	private createSticket(initY, num) {
		let stickObj = null;
		// let randomPro = Math.random(); initY *num
		let spring = null;
		let distance = this.caculateStickDistance();

		stickObj = new StickItem();
		stickObj.isHit = false;
		this.stickList.addChild(stickObj);
		stickObj.$y = initY - (distance + stickObj.height);
		stickObj.$x = Math.random() * (this.stage.stageWidth - stickObj.width);
		stickObj.meter = this.changeToMeter(stickObj.$y, this.nowStage);
		// stickObj.setRandomStick();
		// console.log('米数',	stickObj.meter ,stickObj.$y);
		if (this.nowSpringNumber < this.springStageNum.length && stickObj.TYPE_STATUS === stickObj.TYPE_GREEN) {
			if (this.nowStage * this.STAGE_METER > this.springStageNum[this.nowSpringNumber] && (this.nowStage - 1) * this.STAGE_METER < this.springStageNum[this.nowSpringNumber]) {
				// debugger
				let random = Math.random();
				if (random > 0.5) {
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
	private getRandomPosition() {
		let stageLen = this.SPRING_STAGE_LINE.length;
		let item, randomNum, list, minStage;

		for (let i = 0; i < stageLen; i++) {
			item = this.SPRING_STAGE_LINE[i];
			for (let j = 0; j < item.num; j++) {
				minStage = (item.maxHeight - item.minHeight) / item.num;
				randomNum = Math.ceil(Math.random() * minStage + item.minHeight + minStage * j);
				this.springStageNum.push(randomNum);
			}
		}
		list = this.springStageNum.sort(function (a, b) {
			return a - b;
		})
		this.springStageNum = list;
		console.log('阶段的数据', this.springStageNum);
	}
	/**
	 * 创建弹簧
	 */
	private createSpring(stickObj) {
		let springObj = new FloorSpring();
		let random = Math.random();



		this.springList.addChild(springObj);
		springObj.$y = stickObj.$y - springObj.height * 0.8;
		springObj.meter = this.changeToMeter(springObj.$y, this.nowStage);
		if (random > 0.5) {
			springObj.$x = stickObj.$x + stickObj.width - springObj.width * 1.2;
		} else {
			springObj.$x = stickObj.$x + springObj.width / 2;
		}
		return springObj;
	}

	private beginAnimateEvent() {
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}
	private onEnterFrame() {
		if (this.playerIsMove) {
			this.player.movePlayerY();
		}
		if(this.player.isJumperTopStop){
			this.stickMove();
		}
		this.moveplayerX();
		this.checkOverStick();
		this.addNewPetals();
		this.stickMoveLeftAndRight();
		if (this.player.isDown) {

			this.checkIsHitDoodle(this.stickList.$children, this.checkIsStickHit.bind(this));
			this.checkIsHitDoodle(this.springList.$children,this.checkIsHitSpring.bind(this));
		}
		// if (this.endGame) {
		// 	this.gotoMoveBg();
		// } else {
		// 	this.checkIsGameOver();
		// }

	}

	private moveplayerX() {
		this.player.$x = this.player.$x + this.speedX;
		if (this.player.$x < -this.player.width) {
			this.player.$x = this.stage.$stageWidth;
		} else if (this.player.$x > this.stage.$stageWidth) {
			this.player.$x = -this.player.width;
		}
	}
	private checkIsStickHit(item) {
		this.player.$y = item.$y;
		this.player.jumpStartY = item.$y;
		this.player.setStartJumpeSpeed(this.player.jumpStickDistan,this.player.frameNum);
		// this.setStickSpeed(this.stage.$stageHeight * 0.9 - this.jumpStartY, this.frameNum);
		this.player.changePlaySide(false);
		
	}
	private checkIsHitDoodle(list, callback) {
		let item, itemMinX, itemMaxX, itemMaxY, itemMinY, itemHalf, itemMiddleY, pointDistance, maxDistance;
		let listLen = list.length;
		let playerMaxY = this.player.$y;
		let playerMinY = this.player.$y-this.player.anchorOffsetY;
		let playerHalf = this.player.height / 2;
		let playerMinX = this.player.$x-this.player.anchorOffsetX;
		let playerMaxX = this.player.$x + this.player.anchorOffsetX;
		let playerMiddel = this.player.$y-this.player.anchorOffsetY/2;

		for (let i = 0; i < listLen; i++) {
			item = list[i];
			itemMaxX = item.$x + item.width;
			itemMinX = item.$x;
			itemMinY = item.$y;
			itemMaxY = item.$y + item.height;
			itemHalf = item.height / 2;
			itemMiddleY = itemMinY + itemHalf;
			pointDistance = itemMiddleY - playerMiddel;
			maxDistance = itemHalf + playerHalf;

			if (playerMaxX >= itemMinX && playerMinX <= itemMaxX && playerMinY<itemMinY&&pointDistance > 0 && pointDistance < maxDistance ) {
				callback(item);
				break;
			}
		}


	}
	private checkIsHitSpring(item) {
		this.player.jumpStartY = item.$y;
		this.player.setStartJumpeSpeed(this.player.jumpStickDistan*2,this.player.frameNum*2);
		item.showOffenSpring();
	}
	private checkIsGameOver() {
		let list = this.stickList.$children;
		let len = list.length;
		let item = null;

		if (this.player.$y + this.player.height >= this.stage.$stageHeight) {
			this.setScoreText();
			this.endGame = true;
			this.player.jumpStartY = this.stage.$stageHeight * 1.5;
			this.player.setStartJumpeSpeed(this.player.jumpStickDistan*2,this.frameNum*2);
		}

	}
	private setScoreText() {
		this.scoreText.text = '分数：' + Math.ceil(this.changeToMeter(this.player.jumpStartY, this.nowStage));
	}
	private showScoreText() {
		this.scoreText.visible = true;
	}
	private gotoMoveBg() {
		this.removeAllList();
		if (this.player.$y > this.stage.$stageHeight) {
			this.gameOver();
		} else {
			this.longBg.$y = this.longBg.$y - 10;
		}
	}
	private gameOver() {
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		this.player.visible = false;
		this.playBtnBox.visible = true;
		this.doodleBox.removeChildren();
		this.showScoreText();
		if (wx && wx.stopAccelerometer) {
			wx.stopAccelerometer(function () {
				console.log('停止监听左右');
			})
		} else {
			this.orientation.stop();
		}

	}
	private removeAllList() {
		this.stickList.removeChildren();
		this.springList.removeChildren();
	}
	private stickMove() {
		let list = this.stickList.$children;
		let springList = this.springList.$children;
		let springLen = springList.length;
		let len = list.length;
		let item, springItem;
		let speed;

		speed = this.player.nowSpeed;
		for (let i = 0; i < len; i++) {
			item = list[i];
			item.$y = item.$y + speed;     // this.frameNum
		}
		for (let j = 0; j < springLen; j++) {
			springItem = springList[j];
			springItem.$y = springItem.$y + speed;
		}
		this.lastPetalY = this.lastPetalY + speed;
	}
	private stickMoveLeftAndRight() {
		let list = this.stickList.$children;
		let len = list.length;
		let item;
		for (let i = 0; i < len; i++) {
			item = list[i];
			if (item.TYPE_STATUS === item.TYPE_HORIZONTAL) {
				item.leftAndRightMove();
			}
		}
	}
	private checkOverStick() {
		let list = this.stickList.$children;
		let len = list.length;
		let item;
		let removeChildList = [];
		let nowLen, nowList;

		for (let i = 0; i < len; i++) {
			item = list[i];
			if (item.$y >= this.stage.$stageHeight) {
				item.isHit = false;
				removeChildList.push(item);
			}

		}
		if (removeChildList.length) {
			for (let j = 0; j < removeChildList.length; j++) {
				if (removeChildList[j]) {
					this.stickList.removeChild(removeChildList[j]);
				}

			}
		}
	}
	// 当当前的最后那个跳板大于某个值，就创建下一屏的跳板
	private addNewPetals() {
		let i = 0;
		let y = 0;
		let pedalObj = null;


		if (this.lastPetalY > this.stageDistance + this.petalHeight) {
			this.preStickY = 0;
			this.nowStage++;
			while (y > -this.stage.$stageHeight) {
				pedalObj = this.createSticket(this.preStickY, i);
				y = pedalObj.$y;
				this.preStickY = pedalObj.$y;
				i++;
			}
			this.lastPetalY = y - pedalObj.height;
		}
	}

}