class GamePage2 extends BasePage{
	public constructor() {
		super();
	}

	private endGame: boolean = false;
	// private nowStage: number = 1;


	private orientation: any;


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
		// this.beginListenEvent();  //  监听点击开始的按钮

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
		// this.player.setInitJumperData();
		this.player.orientationEvent();
	}
	//  创建跳板
	private createSticket(){
		this.allSticks = new AllSticks();
		this.addChild(this.allSticks);
		this.stickList = this.allSticks.initSticket(this.stickList);
		// this.player.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddToStage, this);
	}
	private onAddToStage(){

		// let list = this.stickList.$children;
		// 	console.log(list);
		// 	this.run(list);
		// // for(let i=0;i<	list.length;i++) {
		// // 	if(list.playDiasbleHitClip ) {
		// // 		list.playDiasbleHitClip (()=>{})
		// // 	}
		
		// // }
			let movePescide = this.createMoveObj("woodDefaultMove",this.stickList);
		console.log('rena',movePescide,this.stickList);
		// this.waterMoveCilpDefault = movePescide;
		movePescide.play();
	}
	// private run(list){
	// 	for(let i=0;i<	list.length;i++) {
	// 		if(list[i].playDiasbleHitClip) {
	// 			list[i].playDiasbleHitClip (()=>{})
	// 		}
		
	// 	}
	// }
	/**
	 * 设置初始值
	 */
	public setInitDataGame() {
		this.player.visible = true;
		this.endGame = false;
		this.player.$y = this.stage.$stageHeight*0.9;
		this.longBg.$y = 0;
		// this.nowStage = 1;
		// this.scoreText.visible = false;
		// this.getRandomPosition();  // 初始化弹簧的数据
		console.log('对象',this.player.width,this.player.height,this.player.$y,this.player.$x,this.player.anchorOffsetX,this.player.anchorOffsetY);
	}
	/**
	 * 开始监听动画
	 */
	private beginAnimateEvent() {
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}
	/**
	 * 动画监听函数
	 */
	private onEnterFrame() {
		this.player.movePlayerY();
		if(this.player.isJumperTopStop){
			this.mapObjectMove();
		}
		this.player.moveplayerX();
		if (this.endGame) {
			this.gotoMoveBg();
		} else {
			this.checkIsGameOver();
			this.checkISOverStage(this.stickList,this.allSticks.recycleAllObject.bind(this.allSticks));
			this.allSticks.addNewPetals(this.stickList,this.doodleChangeToMeter(this.player.doodelMeter));
			this.allSticks.stickMoveLeftAndRight(this.stickList.$children);
		}

		if (this.player.isDown) {
			this.checkIsHitDoodle(this.stickList.$children, this.checkIsStickHit.bind(this));
			// this.checkIsHitDoodle(this.springList.$children,this.checkIsHitSpring.bind(this));
		}
		// console.log(this.stickList.$children.length);


	}
	private checkIsGameOver(){
		if(this.player.$y > this.stage.$stageHeight) {
			this.player.jumpHeightHight = this.stage.$stageHeight*0.3;
			this.player.setStartJumpeSpeed(this.stage.$stageHeight,this.player.frameNum);
			this.player.setDownAddSpeed(this.stage.$stageHeight,this.player.frameNum);
			this.endGame = true;
			this.player.isStopCaulte = true;
		}
	}
	private gotoMoveBg(){
		this.removeAllList();
		if (this.player.$y> this.stage.$stageHeight+this.player.height*1.5) {
			this.gameOver();
		} else {
			this.longBg.$y = this.longBg.$y - 10;
		}
	}
	private gameOver() {
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		this.player.visible = false;
		// this.playBtnBox.visible = true;
		this.doodleBox.removeChildren();
		// this.showScoreText();
		try{
			if (wx && wx.stopAccelerometer) {
				wx.stopAccelerometer(function () {
					console.log('停止监听左右');
				})
			} else {
				this.player.orientation.stop();
			}
		}catch(err) {
			console.log(err);
		}

		this.showPlayGameOverPage();

	}
	private showPlayGameOverPage(){
		
		Main.gameOver = new GameOverPage();
		Main.instance.addChild(Main.gameOver);
		Main.gameOver.setScoreText(this.setScoreText());

		this.visible = false;
		this.longBg.$y = 0;
		this.parent.removeChild(this);
	}
	private setScoreText() {
		let score = null;
		// console.log(this.player.jumpStartY);
		console.log('tingzhi',this.player.doodelMeter);
		score = '分数：' + Math.ceil(this.doodleChangeToMeter(this.player.doodelMeter));
		return score;
	}
	private removeAllList() {
		this.stickList.removeChildren();
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
		let playerMaxY = this.player.$y+this.player.anchorOffsetY;
		let playerMinY = this.player.$y-this.player.anchorOffsetY;
		let playerHalf = this.player.height/2;
		let playerMinX = this.player.$x-this.player.anchorOffsetX+this.player.missDiastance[this.player.COLOR_STATUS];
		let playerMaxX = this.player.$x + this.player.anchorOffsetX-this.player.missDiastance[this.player.COLOR_STATUS];
		let playerMiddel = this.player.$y; //-this.player.anchorOffsetY/2 this.player.anchorOffsetY

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
			// && playerMinY<itemMinY&&pointDistance > 0 && pointDistance < maxDistance &&
			if (playerMaxX >= itemMinX && playerMinX <= itemMaxX&&playerMaxY<=itemMaxY  && playerMaxY>=itemMinY && item.visible) {
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
		this.player.$y = item.$y-this.player.anchorOffsetY;
		this.player.jumpStartY = item.$y;
		if(item.TYPE_NAME === 'trampoline') {
			this.player.setStartJumpeSpeed(item.JUMP_DISTANCE,100);
			this.player.setJumperStatus(this.player.JUMP_NORMAL);
			// this.player.isPlayCircle =true;
		}else if(item.TYPE_NAME === 'wing'){
			this.player.setStartJumpeSpeed(item.JUMP_DISTANCE,200);
			this.player.setJumperStatus(this.player.JUMP_WING);
		}else if(item.TYPE_NAME === 'rocket'){
			this.player.setStartJumpeSpeed(item.JUMP_DISTANCE,200);
			this.player.setJumperStatus(this.player.JUMP_ROCKET);
		}else {
			this.player.setStartJumpeSpeed(item.JUMP_DISTANCE,this.player.frameNum);
			this.player.setJumperStatus(this.player.JUMP_NORMAL);
		}


		this.player.changePlaySide(false);
		
	}
	// private checkListOverMapObject(checkList) {
	// 	let list = checkList.$children;
	// 	let len = list.length;
	// 	let item;
	// 	let removeChildList = [];
	// 	let nowLen, nowList;

	// 	for (let i = 0; i < len; i++) {
	// 		item = list[i];
	// 		if (item.$y >= this.stage.$stageHeight) {
	// 			item.isHit = false;
	// 			removeChildList.push(item);
	// 		}

	// 	}
	// 	if (removeChildList.length) {
	// 		for (let j = 0; j < removeChildList.length; j++) {
	// 			if (removeChildList[j]) {
	// 				checkList.removeChild(removeChildList[j]);
	// 			}

	// 		}
	// 	}
	// }

}