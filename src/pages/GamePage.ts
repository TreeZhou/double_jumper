class GamePage extends BasePage{
	public constructor() {
		super();
	}
	private doodleBox: eui.Group;
	private stickList: eui.Group;
	private longBg: eui.Image;
	private player: DouDing;  // 豆丁
	private allBarrier:AllGameBarrier;  // 全部的障碍物的对象
	private bulletMoveObj:BulletMove;

	private endGame: boolean = false;  // 是否结束游戏


	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.percentHeight = 100;
		this.percentWidth = 100;
		this.createAllGameObj();

	}

	/**
	 * 开始游戏
	 */
	public beginGame() {  // 开始游戏的入口
		this.setInitDataGame();  // 设置游戏的开始数据
		this.beginAnimateEvent();  // 开始动画监听
		this.listenClickStageEvent();
	}
	/**
	 * 创建豆丁和跳板
	 */

	private createAllGameObj(){
		this.createDoodle();
		this.createSticket();  // 创建跳板
		this.createBulletMove();
	}

	// 创建豆丁
	private createDoodle() {
		this.player = new DouDing();
		this.doodleBox.addChild(this.player);
		this.player.$x = this.stage.$stageWidth / 2;
		this.player.$y = this.stage.$stageHeight-this.player.anchorOffsetY;
		this.player.orientationEvent();
	}
	/**
	 * 初始化子弹的对象
	 */
	private createBulletMove(){
		this.bulletMoveObj = new BulletMove();
		this.addChild(this.bulletMoveObj);
	}
	//  创建跳板
	private createSticket(){
		this.allBarrier = new AllGameBarrier();
		this.addChild(this.allBarrier);
		this.stickList = this.allBarrier.initSticket(this.stickList);
	}
	/**
	 * 监听屏幕的点击事件
	 */
	private listenClickStageEvent(){
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.beginSendBullet,this);
	}
	/**
	 * 点击屏幕的时候豆丁需要发射子弹
	 */
	private beginSendBullet(){
		if(this.player.isCanPlayButtle) {
			this.swichChangeDoudingSkin('face');
			this.bulletMoveObj.createBullet(this.player);
		}
	}
	/**
	 * 设置初始值
	 */
	public setInitDataGame() {
		this.endGame = false;
		this.longBg.$y = 0;
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
		this.player.moveplayerX();
		this.bulletMoveObj.bulletMoveY();
		if(this.player.isJumperTopStop){
			this.mapObjectMove();
		}

		if (this.endGame) {
			this.gotoMoveBg();
		} else {
			this.checkIsGameOver();
			this.checkISOverStage(this.stickList,this.allBarrier.recycleAllObject.bind(this.allBarrier));
			this.allBarrier.addNewSticket(this.stickList,this.doodleChangeToMeter(this.player.douDingJumperMeter));
			this.allBarrier.barrierMoved(this.stickList.$children);
			this.bulletMoveObj.removeBullet(this.bulletMoveObj);
		}
		if (this.player.isDown) {
			this.checkIsHitDoodle(this.stickList.$children, this.checkDouDingHitType.bind(this),this.douDingHitProp.bind(this));
		}



	}
	/**
	 * 移动地图上的物体
	 */
	private mapObjectMove() {
		let list = this.stickList.$children;
		let len = list.length;
		let item, springItem;
		let speed;

		speed = this.player.nowSpeed;
		for (let i = 0; i < len; i++) {
			item = list[i];
			item.$y = item.$y + speed;    
		}
		this.allBarrier.lastBarrierY = this.allBarrier.lastBarrierY + speed;
	}
	// 检查是否超过屏幕底线，是的话就移除该对象
    private checkISOverStage(fatherBox,callback:Function) {
		let list = fatherBox.$children;
		let len = list.length;
		let item;
		let removeChildList = [];
		let nowLen, nowList;

		for (let i = 0; i < len; i++) {
			item = list[i];
			if (item.$y >= this.stage.$stageHeight) {
				removeChildList.push(item);
			}

		}
		if (removeChildList.length) {
			for (let j = 0; j < removeChildList.length; j++) {
				if (removeChildList[j]) {
					fatherBox.removeChild(removeChildList[j]);
					callback(removeChildList[j]);
				}

			}
		}
        return fatherBox;
	}
	/**
	 * 检查是否豆丁触碰到地步，要进行游戏结束的画面
	 */
	private checkIsGameOver(){
		if(this.player.$y > this.stage.$stageHeight) {
			this.player.jumpMaxHeight = this.stage.$stageHeight*0.3;
			this.player.setStartJumpeSpeed(this.stage.$stageHeight,this.player.frameNum);
			this.player.setDownAddSpeed(this.stage.$stageHeight,this.player.frameNum);
			this.endGame = true;
			this.player.isStopCaulteScore = true;
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.beginSendBullet,this)
			this.removeChild(this.bulletMoveObj);
		}
	}
	/**
	 * 进行游戏结束时的移动背景
	 */
	private gotoMoveBg(){
		this.removeAllList();
		if (this.player.$y> this.stage.$stageHeight+this.player.height*1.5) {
			this.gameOver();
		} else {
			this.longBg.$y = this.longBg.$y - 10;
		}
	}
	/**
	 * 当游戏画面做完之后，停止游戏的监听和画面
	 */
	private gameOver() {
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		this.player.visible = false;
		this.doodleBox.removeChildren();
	
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
	/**
	 * 移除游戏界面，展示游戏结束页面
	 */
	private showPlayGameOverPage(){
		Main.gameOver = new GameOverPage();
		Main.instance.addChild(Main.gameOver);
		Main.gameOver.setScoreText(this.setScoreText());
		this.visible = false;
		this.longBg.$y = 0;
		this.parent.removeChild(this);
	}
	/**
	 * 计算游戏的分数
	 */
	private setScoreText() {
		let score = null;
		score = '分数：' + Math.ceil(this.doodleChangeToMeter(this.player.douDingJumperMeter));
		return score;
	}
	/**
	 * 移除所有障碍物
	 */
	private removeAllList() {
		this.stickList.removeChildren();
		// this.removeChild(this.bulletMoveObj);
	}

	/**
	 * 检测是否撞击了豆丁
	 */
	private checkIsHitDoodle(list, callback, propCallback) {
		let item, itemMinX, itemMaxX, itemMaxY, itemMinY, itemHalf, itemMiddleY, pointDistance, maxDistance;
		let listLen = list.length;
		let playerMaxY = this.player.$y+this.player.anchorOffsetY;
		let playerMinY = this.player.$y-this.player.anchorOffsetY;
		let playerHalf = this.player.height/2;
		let playerMinX = this.player.$x-this.player.anchorOffsetX+22;
		let playerMaxX = this.player.$x + this.player.anchorOffsetX-22;
		let playerMiddel = this.player.$y; //-this.player.anchorOffsetY/2 this.player.anchorOffsetY
		let isHitPop = false;

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
			isHitPop = this.checkIsHisProps(item,propCallback);
			if(isHitPop) {
				break;
			}
			if (playerMaxX >= itemMinX && playerMinX <= itemMaxX&&playerMaxY<=itemMaxY  && playerMaxY>=itemMinY && item.visible) {
				callback(item);
				break;

			}
		}
	}
	/**
	 * 检测豆丁是否碰撞到跳板中的道具
	 *
	 */
	private checkIsHisProps(sticketItem,callback){
		let childList = sticketItem.$children;
		let item, itemMinX, itemMaxX, itemMaxY, itemMinY;
		let isHit = false;

		if(sticketItem.$children[1]) {
		
			let playerMaxY = this.player.$y+this.player.anchorOffsetY;
			let playerMinY = this.player.$y-this.player.anchorOffsetY;
			let playerHalf = this.player.height/2;
			let playerMinX = this.player.$x-this.player.anchorOffsetX+22;
			let playerMaxX = this.player.$x + this.player.anchorOffsetX-22;
			let playerMiddel = this.player.$y;
			item = sticketItem.$children[1];
			itemMaxX = item.$x + item.width+sticketItem.$x;
			itemMinX = item.$x+sticketItem.$x;
			itemMinY = item.$y+sticketItem.$y;
			itemMaxY = itemMinY + item.height+sticketItem.height;
		
			if (playerMaxX >= itemMinX && playerMinX <= itemMaxX&&playerMaxY<=itemMaxY  && playerMaxY>=itemMinY && item.visible) {
					// debugger
				callback(item,sticketItem);
				isHit = true;
			}
		}
		return isHit;
	}
	/**
	 * 撞击豆丁后需要做的操作
	 */
	private checkDouDingHitType(item) {
		
		if(item.TYPE_NAME !== 'waterSticket') {
			this.player.$y = item.$y-this.player.anchorOffsetY;
			this.player.jumpStartY = item.$y;
			if(this.player.isWearSpringShoes) {
				this.player.setStartJumpeSpeed(item.JUMP_DISTANCE*1.5,this.player.frameNum*1.2);
			}else {
				this.player.setStartJumpeSpeed(item.JUMP_DISTANCE,this.player.frameNum);
			}
			
			this.player.changeDouDingSkin(false);
		}
		item.sticketSelfSkill();
		// if(item.TYPE_NAME === 'trampoline') {
		// 	this.player.setStartJumpeSpeed(item.JUMP_DISTANCE,100);
		// 	this.player.setSkinUpStatus(this.player.JUMP_UP);
		// 	 this.player.setSkinDownStatus(this.player.JUMP_DOWN);
		// 	// this.player.isPlayCircle =true;
		// }else if(item.TYPE_NAME === 'wing'){
		// 	this.player.setStartJumpeSpeed(item.JUMP_DISTANCE,200);
		// 	this.player.setSkinUpStatus(this.player.WING_UP);
		// 	 this.player.setSkinDownStatus(this.player.JUMP_DOWN);
		// }else if(item.TYPE_NAME === 'rocket'){
		// 	this.player.setStartJumpeSpeed(item.JUMP_DISTANCE,200);
		// 	this.player.setSkinUpStatus(this.player.ROCKET_UP);
		// 	 this.player.setSkinDownStatus(this.player.JUMP_DOWN);
		// }else {
		// 	this.player.setStartJumpeSpeed(item.JUMP_DISTANCE,this.player.frameNum);
		// 	this.player.setSkinUpStatus(this.player.JUMP_UP);
		// 	 this.player.setSkinDownStatus(this.player.JUMP_DOWN);
		// }	
	}
	/**
	 * 撞击道具豆丁需要做的操作
	 */
	private douDingHitProp(item,sticketItem){
		if(item.TYPE_NAME === 'wingProp'||item.TYPE_NAME === 'rocketProp') {
			this.player.setStartJumpeSpeed(item.JUMP_DISTANCE,200);
			this.player.isCanPlayButtle = false;
		}else if(item.TYPE_NAME === 'springShoeProp' && !this.player.isWearSpringShoes){
			this.player.setStartJumpeSpeed(item.JUMP_DISTANCE,this.player.frameNum*1.1);
			this.player.isWearSpringShoes = true;
			this.player.cancelSpringShoe();
		}else{
			this.player.setStartJumpeSpeed(item.JUMP_DISTANCE,this.player.frameNum*1.5);
		}
		this.swichChangeDoudingSkin(item.TYPE_NAME);
		this.player.$y = item.$y+sticketItem.$y-this.player.anchorOffsetY;
		this.player.jumpStartY = item.$y+sticketItem.$y;
		this.player.changeDouDingSkin(false);
		item.sticketSelfSkill();
	}
	/**
	 * 根据碰撞的属性来改变豆丁的皮肤
	 */ 
	private swichChangeDoudingSkin(typeName){
		switch(typeName){
			case 'wingProp':
			this.player.setSkinUpStatus(this.player.WING_UP);
			break;
			case 'springShoeProp':
			this.player.setSkinUpStatus(this.player.SPRINGSHOE_UP);
			break;
			case 'rocketProp':
			this.player.setSkinUpStatus(this.player.ROCKET_UP);
			break; 
			case 'face':
			if(this.player.isWearSpringShoes) {
				this.player.setSkinUpStatus(this.player.SPRINGSHOE_FACE_UP);
			}else {
				this.player.setSkinUpStatus(this.player.JUMP_FACE_UP);
			}
			break;
		}
	} 

}