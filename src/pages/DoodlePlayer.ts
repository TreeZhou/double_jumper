class DoodlePlayer extends BasePage {
	public constructor() {
		super();
	}
	private BeanNormalRight:eui.Image;
	private BeanNormalLeft:eui.Image;
	private BeanNormalFace:eui.Image;
	private beanFaceNorDown:eui.Image;
	private beanLeftNorDown:eui.Image;
	private beanRightNorDown:eui.Image;
	private beanRocketDefault:eui.Image;
	private beanWingFaceDefault:eui.Image;
	private beanWingLeftDefault:eui.Image;
	private beanWingRightDefault:eui.Image;

	public SIDE_STATUS:string='face';
	public SIDE_FACE:string='face';
	public SIDE_RIGHT:string='right';  // 右边
	public SIDE_LEFT:string='left';  // 左边

	public JUMP_STATUS:string='jump';
	public JUMP_NORMAL:string='jump';  // 正常跳跃的形式
	public JUMP_HIT:string='hit'; // 撞击到时正常形式
	public JUMP_WING:string='wing'; //撞击到翅膀的形式
	public JUMP_ROCKET:string='rocket'; //　撞击到火箭时的形式

	// public COLOR_STATUS:string='normal';
	// public COLOR_DEFAULE:string='normal';

	public jumpHeightHight: number; // 正常最高的高度
	public jumpStartY: number = null; // 起跳高度
	public jumpStickDistan:number;

	public nowUpAddSpeed:number;
	public nowDownAddSpeed:number;
	public initSpeed:number;
	public nowSpeed:number;
	public frameNum:number=40;
	public isDown:boolean=false;
	public speedX:number=0;
	public isPlayCircle:boolean=false;

	public isJumperTopStop:boolean=false;


	// private playerColorList:Object={};
	private sideStauts:any = [
		this.SIDE_FACE,
		this.SIDE_RIGHT,
		this.SIDE_LEFT,
	];
	private euiAllImageList:any = [];

	private euiImageJumpList:Object;
	public orientation:egret.DeviceOrientation;
	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.setSideStatus(this.SIDE_STATUS);
		this.setEuiImageList();
		this.setPlayerSkewXY();
		this.setInitJumperData();
		this.setStartJumpeSpeed(this.jumpStickDistan,this.frameNum);
		this.setDownAddSpeed(this.jumpStickDistan,this.frameNum);
		// this.orientationEvent();  //　开始监听左右的加速计
	
		console.log(this.rotation)
	}
	private setEuiImageList() {
		let self = this;
		this.euiImageJumpList = {
			'normal':{
				'jump':{
					'face':	self.BeanNormalFace,
					'left':	self.BeanNormalLeft,
					'right':self.BeanNormalRight,
				},
				'hit':{
					'face':self.beanFaceNorDown,
					'left':self.beanLeftNorDown,
					'right':self.beanRightNorDown
				},
				'rocket':{
					'face':self.beanRocketDefault,
					'left':self.beanRocketDefault,
					'right':self.beanRocketDefault
				},
				'wing':{
					'face':self.beanWingFaceDefault,
					'left':self.beanWingLeftDefault,
					'right':self.beanWingRightDefault
				}
			}
		}
		// console.log('object',this.euiImageJumpList);
	}
	public setInitJumperData() {
		this.jumpHeightHight = this.stage.$stageHeight*0.6;
		this.jumpStickDistan = this.stage.$stageHeight*0.4;
		this.jumpStartY = this.stage.$stageHeight;
	}
	public setSideStatus(sideStatus){
		switch(sideStatus) {
			case this.SIDE_LEFT:
			this.SIDE_STATUS = this.SIDE_LEFT;
			break;
			case this.SIDE_RIGHT:
			this.SIDE_STATUS = this.SIDE_RIGHT;
			break;
			case this.SIDE_FACE:
			this.SIDE_STATUS = this.SIDE_FACE;
			break;
			default:
			this.SIDE_STATUS = this.SIDE_FACE;
			break;

		}
	}
	public setJumperStatus(jumpStatus){
		switch(jumpStatus){
			case this.JUMP_ROCKET:
			this.JUMP_STATUS = this.JUMP_ROCKET;
			break;
			case this.JUMP_WING:
			this.JUMP_STATUS = this.JUMP_WING;
			break;
			// case this.JUMP_HIT:
			// this.JUMP_STATUS = this.JUMP_HIT;
			// break;
			case this.JUMP_NORMAL:
			this.JUMP_STATUS = this.JUMP_NORMAL;
			break;
			default:
			this.JUMP_STATUS = this.JUMP_NORMAL;
			break;
		}
	}
	public changePlaySide(isJumping:boolean){
		this.hideAllPlayer();
		if(isJumping) {
			this.euiImageJumpList[this.COLOR_STATUS][this.JUMP_STATUS][this.SIDE_STATUS].visible = true;
			// this.setThisWidthHeight(this.euiImageJumpList[this.COLOR_STATUS][this.JUMP_STATUS][this.SIDE_STATUS]);
		}else {
			this.euiImageJumpList[this.COLOR_STATUS][this.JUMP_HIT][this.SIDE_STATUS].visible = true;
			this.euiImageJumpList[this.COLOR_STATUS][this.JUMP_STATUS][this.SIDE_STATUS].visible = false;
			// this.setThisWidthHeight(this.euiImageJumpList[this.COLOR_STATUS][this.JUMP_HIT][this.SIDE_STATUS]);
			setTimeout(()=>{
				this.euiImageJumpList[this.COLOR_STATUS][this.JUMP_HIT][this.SIDE_STATUS].visible = false;
				this.euiImageJumpList[this.COLOR_STATUS][this.JUMP_STATUS][this.SIDE_STATUS].visible = true;
				// this.setThisWidthHeight(this.euiImageJumpList[this.COLOR_STATUS][this.JUMP_STATUS][this.SIDE_STATUS]);
					// console.log('当前宽高',this.width,this.height);
			}, 100);
		}
		// console.log('当前宽高',this.width,this.height);
		this.setPlayerSkewXY();
	}

	private setThisWidthHeight(item){
		this.width = item.width;
		// this.height = item.height;
	}

	private hideAllPlayer() {
		let len = this.$children.length;

		for(let i=0;i<len;i++) {
			this.$children[i].visible = false;
		}
	}

	public setPlayerSkewXY() {
		this.anchorOffsetX  = this.width/2;
		this.anchorOffsetY  = this.height/2;
	}
	/**
	 * 设置向下的加速度
	 */
	public setDownAddSpeed(jumpStickDistan,frame) {
		let moveX = Math.abs(jumpStickDistan) * 2 / (frame * (frame + 1));
		this.nowDownAddSpeed = moveX;
	}
	/**
	 * 	设置涂鸦的跳跃速度
	*/
	public setStartJumpeSpeed(jumpStickDistan,frame) {
		let moveX = Math.abs(jumpStickDistan) * 2 / (frame * (frame + 1));
		this.nowUpAddSpeed = moveX;
		this.nowSpeed = moveX * frame;
	}
	public movePlayerY() {
	
		// debugger;
		if (this.nowSpeed < 0) {
			this.isDown = true;
			this.nowSpeed = this.nowSpeed - this.nowDownAddSpeed;
		} else {
			this.isDown = false;
			this.nowSpeed = this.nowSpeed - this.nowUpAddSpeed;
		}
		if(!this.isDown&& this.$y>this.jumpHeightHight||this.isDown) {
			this.$y = this.$y - this.nowSpeed;
			this.isJumperTopStop = false;
		}else {
			this.isJumperTopStop = true;
		}

		if(this.isDown) {
			this.setJumperStatus(this.JUMP_NORMAL);
			this.changePlaySide(true);
			this.isPlayCircle = false;
		}else {
			if(this.isPlayCircle) {
				this.circleRun();
			}
		}

	}

	public orientationEvent() {
		let _self = this;

		try{
			if (wx && wx.onAccelerometerChange) {
				wx.onAccelerometerChange(this.handleFuncWx.bind(this));
			}
		}catch(err){
			console.log(err);
			this.orientation = new egret.DeviceOrientation();
			//添加事件监听器
			this.orientation.addEventListener(egret.Event.CHANGE,this.onOrientation,this);
			this.orientation.start();
		}

	}
	private onOrientation(e:egret.OrientationEvent){
		let stage = this.stage;
		if(!stage) {
			return false;
		}
		if (e.gamma > 0) {  // 向右
			this.setSideStatus(this.SIDE_RIGHT);
		} else if (e.gamma< 0) {  // 向左
			this.setSideStatus(this.SIDE_LEFT);
		} else {
			this.setSideStatus(this.SIDE_FACE);
		}
		this.changePlaySide(true);
		this.speedX =Math.sin(e.gamma*(Math.PI/180))*this.stage.$stageWidth/22;
		// console.log('左右移动',Math.sin(e.gamma*(Math.PI/180)));
    }
	private handleFuncWx(res) {
		let stage = this.stage;
		if(!stage) {
			return false;
		}
		if (res.x > 0) {  // 向右
			this.setSideStatus(this.SIDE_RIGHT);
		} else if (res.x < 0) {  // 向左
			this.setSideStatus(this.SIDE_LEFT);
		} else {
			this.setSideStatus(this.SIDE_FACE);
		}
		this.speedX = Math.sin(res.x * Math.PI / 2) * this.stage.$stageWidth/22;
		this.changePlaySide(true);
	}
	public moveplayerX() {

		this.$x = this.$x + this.speedX;
		if (this.$x < -this.width) {
			this.$x = this.stage.$stageWidth;
		} else if (this.$x > this.stage.$stageWidth) {
			this.$x = -this.width;
		}
	}
	
	public circleRun(){
		this.rotation = this.nowSpeed;
	}
}