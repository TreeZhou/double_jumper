class GamePage extends BasePage{
	public constructor() {
		super();
	}

	private playerIsMove: boolean = true; // 角色是否可以移动
	private endGame: boolean = false;
	private nowStage: number = 1;
	private nowSpringNumber: number; // 当前显示的弹簧个数


	private orientation: any;

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


	private scoreText: eui.Label;
	private player: DoodlePlayer;
	private allSticks:AllSticks;
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


	protected childrenCreated(): void {
		super.childrenCreated();
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
		this.createSticket();  // 创建跳板
		this.setInitDataGame();  // 设置游戏的开始数据
		this.beginAnimateEvent();  // 开始动画监听
	}
	// 创建涂鸦
	private createDoodle() {
		this.player = new DoodlePlayer();
		this.doodleBox.addChild(this.player);
		this.player.$x = this.stage.$stageWidth / 2;
	}
	//  创建跳板
	private createSticket(){
		this.allSticks = new AllSticks();
		this.addChild(this.allSticks);
		this.stickList = this.allSticks.initSticket(this.stickList,this.nowStage);
	}
	/**
	 * 设置初始值
	 */
	public setInitDataGame() {
		this.player.visible = true;
		this.playerIsMove = true;
		this.endGame = false;
		this.player.$y = this.stage.$stageHeight*0.9;
		this.longBg.$y = 0;
		this.nowStage = 1;
		this.springStageNum = [];
		this.nowSpringNumber = 0;
		// this.scoreText.visible = false;
		// this.getRandomPosition();  // 初始化弹簧的数据
		console.log('对象',this.player.width,this.player.height,this.player.$y,this.player.$x,this.player.anchorOffsetX,this.player.anchorOffsetY);
	}

	private beginAnimateEvent() {
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}
	private onEnterFrame() {
		if (this.playerIsMove) {
			this.player.movePlayerY();
		}
		if(this.player.isJumperTopStop){
			this.mapObjectMove();
		}
		this.player.moveplayerX();
		this.checkListOverMapObject(this.stickList);
		this.nowStage = this.allSticks.addNewPetals(this.stickList,this.nowStage);
		this.allSticks.stickMoveLeftAndRight(this.stickList.$children);
		if (this.player.isDown) {
			this.checkIsHitDoodle(this.stickList.$children, this.checkIsStickHit.bind(this));
			// this.checkIsHitDoodle(this.springList.$children,this.checkIsHitSpring.bind(this));
		}
		// console.log(this.stickList.$children.length);
		// if (this.endGame) {
		// 	this.gotoMoveBg();
		// } else {
		// 	this.checkIsGameOver();
		// }

	}
	private mapObjectMove() {
		let list = this.stickList.$children;
		// let springList = this.springList.$children;
		// let springLen = springList.length;
		let len = list.length;
		let item, springItem;
		let speed;

		speed = this.player.nowSpeed;
		for (let i = 0; i < len; i++) {
			item = list[i];
			item.$y = item.$y + speed;     // this.frameNum
		}
		// for (let j = 0; j < springLen; j++) {
		// 	springItem = springList[j];
		// 	springItem.$y = springItem.$y + speed;
		// }
		this.allSticks.lastOneStickY = this.allSticks.lastOneStickY + speed;
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

			if (playerMaxX >= itemMinX && playerMinX <= itemMaxX && playerMinY<itemMinY&&pointDistance > 0 && pointDistance < maxDistance && item.visible) {
				if(item.TYPE_HIT_DISABLE && item.TYPE_STATUS ===item.TYPE_HIT_DISABLE ) {
					// this.player.nowSpeed = this.player.nowSpeed-20;
					item.playDiasbleHitClip(()=>{
						item.visible = false;
					})
					break;
				}
				if(item.TYPE_ONECE_HIT && item.TYPE_STATUS ===item.TYPE_ONECE_HIT ) {
					item.playOneceClip(()=>{
						item.visible = false;
					})
				}
				callback(item);
				break;
			}
		}
	}
	private checkIsStickHit(item) {
		this.player.$y = item.$y;
		this.player.jumpStartY = item.$y;
		this.player.setStartJumpeSpeed(this.player.jumpStickDistan,this.player.frameNum);
		this.player.changePlaySide(false);
		
	}
	private checkListOverMapObject(checkList) {
		let list = checkList.$children;
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
					checkList.removeChild(removeChildList[j]);
				}

			}
		}
	}

}