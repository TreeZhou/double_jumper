// class DoodlePlayer extends BasePage {
// 	public constructor() {
// 		super();
// 	}
// 	private BeanNormalRight:eui.Image;
// 	private BeanNormalLeft:eui.Image;
// 	private BeanNormalFace:eui.Image;
// 	private beanFaceNorDown:eui.Image;
// 	private beanLeftNorDown:eui.Image;
// 	private beanRightNorDown:eui.Image;
// 	private beanRocketDefault:eui.Image;
// 	private beanWingFaceDefault:eui.Image;
// 	private beanWingLeftDefault:eui.Image;
// 	private beanWingRightDefault:eui.Image;
// 	private leftSpringUpDefault:eui.Image;
// 	private leftSpringDownDefault:eui.Image;
// 	private rightSpringUpDefault:eui.Image;
// 	private rightSpringDownDefault:eui.Image;
// 	private faceSpringUpDefault:eui.Image;
// 	private faceSpringDownDefault:eui.Image;
// 	public SIDE_STATUS:string='face'; // 正面跳，只有点击屏幕发射子弹的时候才会正面跳
// 	public SIDE_FACE:string='face';
// 	public SIDE_RIGHT:string='right';  // 右边
// 	public SIDE_LEFT:string='left';  // 左边
// 	public JUMP_STATUS:string='jump';
// 	public JUMP_NORMAL:string='jump';  // 正常跳跃的形式
// 	public JUMP_HIT:string='jumpHit'; // 撞击到时正常形式
// 	public JUMP_WING:string='wing'; //撞击到翅膀的形式
// 	public JUMP_ROCKET:string='rocket'; //　撞击到火箭时的形式
// 	public JUMP_SPRINGSHOE_JUMP:string='springShoeJump';  // 穿了弹簧鞋的跳跃
// 	public JUMP_SPRINGSHOE_HIT:string = 'springShoeHit';  // 穿了弹簧鞋的碰撞
// 	public JUMP_NORMAL_HIT:string = 'jumpHit';  // 正常状态下碰撞的状态
// 	// public COLOR_STATUS:string='normal';
// 	// public COLOR_DEFAULE:string='normal';
// 	public jumpHeightHight: number; // 正常最高的高度
// 	public jumpStartY: number = null; // 起跳高度
// 	public jumpStickDistan:number;
// 	public nowUpAddSpeed:number;  // 上升的加速度
// 	public nowDownAddSpeed:number; // 下落的加速度
// 	public initSpeed:number; // 初始化的速度
// 	public nowSpeed:number; // 现在的速度
// 	public frameNum:number=40; // 帧率，控制速度
// 	public isDown:boolean=false; // 判断是下落还是上升状态
// 	public speedX:number=0;  // 左右移动的增量
// 	public isPlayCircle:boolean=false;  //判断是否展示弹床旋转的动画
// 	public isJumperTopStop:boolean=false; // 判断是否跳跃到最高点，轮到跳板运动
// 	public missDiastance:Object;  // 偏差值
// 	public doodelMeter:number = 0;  // 豆丁跳跃的累计值
// 	public isStopCaulte:boolean = false;  // 是否停止累计分数
// 	public isWearSpringShoes:boolean = false;  // 是否正在穿弹簧鞋
// 	// private playerColorList:Object={};
// 	private sideStauts:any = [
// 		this.SIDE_FACE,
// 		this.SIDE_RIGHT,
// 		this.SIDE_LEFT,
// 	];
// 	private euiAllImageList:any = [];
// 	private euiImageJumpList:Object;
// 	public orientation:egret.DeviceOrientation;
// 	protected partAdded(partName:string,instance:any):void
// 	{
// 		super.partAdded(partName,instance);
// 	}
// 	protected childrenCreated():void
// 	{
// 		super.childrenCreated();
// 		this.setSideStatus(this.SIDE_STATUS);
// 		this.setEuiImageList();
// 		this.setPlayerSkewXY();
// 		this.setInitJumperData();
// 		this.setStartJumpeSpeed(this.jumpStickDistan,this.frameNum);
// 		this.setDownAddSpeed(this.jumpStickDistan,this.frameNum);
// 		// this.orientationEvent();  //　开始监听左右的加速计
// 		console.log(this.rotation)
// 	}
// 	private setEuiImageList() {
// 		let self = this;
// 		this.euiImageJumpList = {
// 			'normal':{
// 				'jump':{
// 					'face':	self.BeanNormalFace,
// 					'left':	self.BeanNormalLeft,
// 					'right':self.BeanNormalRight,
// 				},
// 				'jumpHit':{
// 					'face':self.beanFaceNorDown,
// 					'left':self.beanLeftNorDown,
// 					'right':self.beanRightNorDown
// 				},
// 				'rocket':{
// 					'face':self.beanRocketDefault,
// 					'left':self.beanRocketDefault,
// 					'right':self.beanRocketDefault
// 				},
// 				'wing':{
// 					'face':self.beanWingFaceDefault,
// 					'left':self.beanWingLeftDefault,
// 					'right':self.beanWingRightDefault
// 				},
// 				'springShoeJump':{
// 					'face':self.faceSpringUpDefault,
// 					'left':self.leftSpringUpDefault,
// 					'right':self.rightSpringUpDefault
// 				},
// 				'springShoeHit':{
// 					'face':self.faceSpringDownDefault,
// 					'left':self.leftSpringDownDefault,
// 					'right':self.rightSpringDownDefault
// 				}
// 			}
// 		}
// 		this.missDiastance = {
// 			'normal':44
// 		}
// 		// console.log('object',this.euiImageJumpList);
// 	}
// 	public setInitJumperData() {
// 		this.jumpHeightHight = this.stage.$stageHeight*0.6;
// 		this.jumpStickDistan = this.stage.$stageHeight*0.4;
// 		this.jumpStartY = this.stage.$stageHeight;
// 	}
// 	public setSideStatus(sideStatus){
// 		switch(sideStatus) {
// 			case this.SIDE_LEFT:
// 			this.SIDE_STATUS = this.SIDE_LEFT;
// 			break;
// 			case this.SIDE_RIGHT:
// 			this.SIDE_STATUS = this.SIDE_RIGHT;
// 			break;
// 			case this.SIDE_FACE:
// 			this.SIDE_STATUS = this.SIDE_FACE;
// 			break;
// 			default:
// 			this.SIDE_STATUS = this.SIDE_FACE;
// 			break;
// 		}
// 	}
// 	public setJumperStatus(jumpStatus){
// 		switch(jumpStatus){
// 			case this.JUMP_ROCKET:
// 			this.JUMP_STATUS = this.JUMP_ROCKET;
// 			this.JUMP_HIT = this.JUMP_NORMAL_HIT;
// 			break;
// 			case this.JUMP_WING:
// 			this.JUMP_STATUS = this.JUMP_WING;
// 			this.JUMP_HIT = this.JUMP_NORMAL_HIT;
// 			break;
// 			case this.JUMP_SPRINGSHOE_JUMP:
// 			this.JUMP_STATUS = this.JUMP_SPRINGSHOE_JUMP;
// 			this.JUMP_HIT = this.JUMP_SPRINGSHOE_HIT;
// 			break;
// 			case this.JUMP_NORMAL:
// 			this.JUMP_STATUS = this.JUMP_NORMAL;
// 			this.JUMP_HIT = this.JUMP_NORMAL_HIT;
// 			break;
// 			default:
// 			this.JUMP_STATUS = this.JUMP_NORMAL;
// 			this.JUMP_HIT = this.JUMP_NORMAL_HIT;
// 			break;
// 		}
// 	}
// 	public changePlaySide(isJumping:boolean){
// 		this.hideAllPlayer();
// 		if(isJumping) {
// 			this.euiImageJumpList[this.COLOR_STATUS][this.JUMP_STATUS][this.SIDE_STATUS].visible = true;
// 			// this.setThisWidthHeight(this.euiImageJumpList[this.COLOR_STATUS][this.JUMP_STATUS][this.SIDE_STATUS]);
// 		}else {
// 			this.euiImageJumpList[this.COLOR_STATUS][this.JUMP_HIT][this.SIDE_STATUS].visible = true;
// 			this.euiImageJumpList[this.COLOR_STATUS][this.JUMP_STATUS][this.SIDE_STATUS].visible = false;
// 			// this.setThisWidthHeight(this.euiImageJumpList[this.COLOR_STATUS][this.JUMP_HIT][this.SIDE_STATUS]);
// 			setTimeout(()=>{
// 				this.euiImageJumpList[this.COLOR_STATUS][this.JUMP_HIT][this.SIDE_STATUS].visible = false;
// 				this.euiImageJumpList[this.COLOR_STATUS][this.JUMP_STATUS][this.SIDE_STATUS].visible = true;
// 				// this.setThisWidthHeight(this.euiImageJumpList[this.COLOR_STATUS][this.JUMP_STATUS][this.SIDE_STATUS]);
// 					// console.log('当前宽高',this.width,this.height);
// 			}, 100);
// 		}
// 		// console.log('当前宽高',this.width,this.height);
// 		this.setPlayerSkewXY();
// 	}
// 	// private setThisWidthHeight(item){
// 	// 	this.width = item.width;
// 	// 	// this.height = item.height;
// 	// }
// 	private hideAllPlayer() {
// 		let len = this.$children.length;
// 		for(let i=0;i<len;i++) {
// 			this.$children[i].visible = false;
// 		}
// 	}
// 	public setPlayerSkewXY() {
// 		this.anchorOffsetX  = this.width/2;
// 		this.anchorOffsetY  = this.height/2;
// 	}
// 	/**
// 	 * 设置向下的加速度
// 	 */
// 	public setDownAddSpeed(jumpStickDistan,frame) {
// 		let moveX = Math.abs(jumpStickDistan) * 2 / (frame * (frame + 1));
// 		this.nowDownAddSpeed = moveX;
// 	}
// 	/**
// 	 * 	设置涂鸦的跳跃速度
// 	*/
// 	public setStartJumpeSpeed(jumpStickDistan,frame) {
// 		let moveX = Math.abs(jumpStickDistan) * 2 / (frame * (frame + 1));
// 		this.nowUpAddSpeed = moveX;
// 		this.nowSpeed = moveX * frame;
// 	}
// 	public movePlayerY() {
// 		if (this.nowSpeed < 0) {
// 			this.isDown = true;
// 			this.nowSpeed = this.nowSpeed - this.nowDownAddSpeed;
// 		} else {
// 			this.isDown = false;
// 			this.nowSpeed = this.nowSpeed - this.nowUpAddSpeed;
// 		}
// 		if(!this.isDown&& this.$y>this.jumpHeightHight||this.isDown) {
// 			this.$y = this.$y - this.nowSpeed;
// 			this.isJumperTopStop = false;
// 		}else {
// 			this.isJumperTopStop = true;
// 			if(!this.isStopCaulte) {
// 				this.doodelMeter = this.doodelMeter + this.nowSpeed;
// 			}
// 		}
// 		if(this.isDown) {
// 			if(this.isWearSpringShoes) {
// 				this.setJumperStatus(this.JUMP_SPRINGSHOE_JUMP);
// 			}else {
// 				this.setJumperStatus(this.JUMP_NORMAL);
// 			}
// 			this.changePlaySide(true);
// 			this.isPlayCircle = false;
// 		}else {
// 			if(this.isPlayCircle) {
// 				this.circleRun();
// 			}
// 		}
// 	}
// 	public orientationEvent() {
// 		let _self = this;
// 		try{
// 			if (wx && wx.onAccelerometerChange) {
// 				wx.onAccelerometerChange(this.handleFuncWx.bind(this));
// 			}
// 		}catch(err){
// 			this.orientation = new egret.DeviceOrientation();
// 			//添加事件监听器
// 			this.orientation.addEventListener(egret.Event.CHANGE,this.onOrientation,this);
// 			this.orientation.start();
// 			document.addEventListener('keydown',(event:KeyboardEvent)=>{
// 				console.log(event.keyCode);
// 				switch(event.keyCode) {
// 					case 65:
// 					this.setSideStatus(this.SIDE_LEFT);
// 					this.speedX = -5;
// 					break;
// 					case 68:
// 					this.setSideStatus(this.SIDE_RIGHT);
// 					this.speedX = 5;
// 					break;
// 				}
// 			})
// 		}
// 	}
// 	private onOrientation(e:egret.OrientationEvent){
// 		let stage = this.stage;
// 		if(!stage) {
// 			return false;
// 		}
// 		if (e.gamma >= 0) {  // 向右
// 			this.setSideStatus(this.SIDE_RIGHT);
// 		} else if (e.gamma< 0) {  // 向左
// 			this.setSideStatus(this.SIDE_LEFT);
// 		} 
// 		this.changePlaySide(true);
// 		this.speedX =Math.sin(e.gamma*(Math.PI/180))*this.stage.$stageWidth/22;
// 		// console.log('左右移动',Math.sin(e.gamma*(Math.PI/180)));
//     }
// 	private handleFuncWx(res) {
// 		let stage = this.stage;
// 		if(!stage) {
// 			return false;
// 		}
// 		if (res.x >= 0) {  // 向右
// 			this.setSideStatus(this.SIDE_RIGHT);
// 		} else if (res.x < 0) {  // 向左
// 			this.setSideStatus(this.SIDE_LEFT);
// 		} 
// 		// else {
// 		// 	this.setSideStatus(this.SIDE_FACE);
// 		// }
// 		this.speedX = Math.sin(res.x * Math.PI / 2) * this.stage.$stageWidth/22;
// 		this.changePlaySide(true);
// 	}
// 	public moveplayerX() {
// 		this.$x = this.$x + this.speedX;
// 		if (this.$x < -this.width) {
// 			this.$x = this.stage.$stageWidth;
// 		} else if (this.$x > this.stage.$stageWidth) {
// 			this.$x = -this.width;
// 		}
// 	}
// 	public circleRun(){
// 		this.rotation = this.nowSpeed;
// 	}
// } 
//# sourceMappingURL=DoodlePlayer.js.map