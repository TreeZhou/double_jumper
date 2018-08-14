class DoodlePlayer extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}
	private BeanNormalRight:eui.Image;
	private BeanNormalLeft:eui.Image;
	private BeanNormalFace:eui.Image;
	private beanFaceNorDown:eui.Image;
	private beanLeftNorDown:eui.Image;
	private beanRightNorDown:eui.Image;

	public SIDE_STATUS:string='face';
	public SIDE_FACE:string='face';
	public SIDE_RIGHT:string='right';  // 右边
	public SIDE_LEFT:string='left';  // 左边

	public COLOR_STATUS:string='normal';
	public COLOR_DEFAULE:string='normal';

	public jumpHeightHight: number; // 正常最高的高度
	public jumpStartY: number = null; // 起跳高度
	public jumpStickDistan:number;

	public nowUpAddSpeed:number;
	public nowDownAddSpeed:number;
	public initSpeed:number;
	public nowSpeed:number;
	public frameNum:number=20;
	public isDown:boolean=false;
	public speedX:number=0;

	public isJumperTopStop:boolean=false;


	// private playerColorList:Object={};
	private sideStauts:any = [
		this.SIDE_FACE,
		this.SIDE_RIGHT,
		this.SIDE_LEFT,
	];
	private euiAllImageList:any = [];

	private euiImageJumpList:Object;
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
		this.orientationEvent();  //　开始监听左右的加速计
	}
	private setEuiImageList() {
		let self = this;
		this.euiImageJumpList = {
			'normal':{
				'jumper':{
					'face':	self.BeanNormalFace,
					'left':	self.BeanNormalLeft,
					'right':self.BeanNormalRight,
				},
				'hit':{
					'face':self.beanFaceNorDown,
					'left':self.beanLeftNorDown,
					'right':self.beanRightNorDown
				}
			}
		}
		console.log('object',this.euiImageJumpList);
	}
	private setInitJumperData() {
		this.jumpHeightHight = this.stage.$stageHeight*0.5;
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
	public changePlaySide(isJumper:boolean){

		this.hideAllPlayer();
		if(isJumper) {
			this.euiImageJumpList[this.COLOR_STATUS]['jumper'][this.SIDE_STATUS].visible = true;
			
		}else {
			this.euiImageJumpList[this.COLOR_STATUS]['hit'][this.SIDE_STATUS].visible = true;
			this.euiImageJumpList[this.COLOR_STATUS]['jumper'][this.SIDE_STATUS].visible = false;
			setTimeout(()=>{
				this.euiImageJumpList[this.COLOR_STATUS]['hit'][this.SIDE_STATUS].visible = false;
				this.euiImageJumpList[this.COLOR_STATUS]['jumper'][this.SIDE_STATUS].visible = true;
			}, 100);
		}
		this.setPlayerSkewXY();
	}

	private hideAllPlayer() {
		let len = this.$children.length;

		for(let i=0;i<len;i++) {
			this.$children[i].visible = false;
		}
	}

	public setPlayerSkewXY() {
		this.anchorOffsetX  = this.width/2;
		this.anchorOffsetY  = this.height;
	}
	/**
	 * 	设置涂鸦的跳跃速度
	*/
	public setStartJumpeSpeed(jumpStickDistan,frame) {
		let moveX = Math.abs(jumpStickDistan) * 2 / (frame * (frame + 1));
		this.nowDownAddSpeed = moveX;
		this.nowSpeed = moveX * frame;
	}
	public movePlayerY() {
		this.nowSpeed = this.nowSpeed - this.nowDownAddSpeed;
		// debugger;
		if (this.nowSpeed < 0) {
			this.isDown = true;
		} else {
			this.isDown = false;
		}
		if(!this.isDown&& this.$y>this.jumpHeightHight||this.isDown) {
			this.$y = this.$y - this.nowSpeed;
			this.isJumperTopStop = false;
		}else {
			this.isJumperTopStop = true;
		}

	}

	private orientationEvent() {
		let _self = this;

		try{
			if (wx && wx.onAccelerometerChange) {
				wx.onAccelerometerChange(function (value) {
					console.log('value', value.x);
					_self.handleFuncWx(value);
				})
			}
		}catch(err){
			console.log(err);
		}

	}
	private handleFuncWx(res) {
		if (res.x > 0) {  // 向右
			this.setSideStatus(this.SIDE_RIGHT);
		} else if (res.x < 0) {  // 向左
			this.setSideStatus(this.SIDE_LEFT);
		} else {
			this.setSideStatus(this.SIDE_FACE);
		}
		this.speedX = res.x * this.stage.$stageWidth / 9;
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
	
}