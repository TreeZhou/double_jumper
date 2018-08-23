// class StickItem extends BasePage{
// 	public constructor() {
// 		super();
// 	}
// 	public meter:number=0;
// 	private stickDefaultSoil:eui.Image;
// 	private stickDefaultLeaf:eui.Image;
// 	private stickDefaultStone:eui.Image;
// 	private waterMoveDefault:eui.Group;
// 	private woodMoveDefault:eui.Group;
// 	private stickDefaultCloud:eui.Image;
// 	public waterMoveCilpDefault:egret.MovieClip;
// 	public woodMoveCilpDefault:egret.MovieClip;
// 	public TYPE_NAME:string="sticket";
// 	public TYPE_STATUS:string='fixation'; // 踏板的状态
// 	public TYPE_FIXATION:string='fixation'; // 固定不动状态
// 	public TYPE_HORIZONTAL:string='0'; // 水平移动
// 	public TYPE_HIT_DISABLE:string='hitDisable'; // 撞击无效，可自动断裂
// 	public TYPE_ONECE_HIT:string='oneceHit';  // 只检测碰撞一次
// 	public TYPE_TIMING:string = 'timing';  // 定时消失
// 	// public COLOR_STATUS:string='normal';
// 	// public COLOR_DEFAULE:string='normal';
// 	private initSpeed:number=2;
// 	private speed:number=2;
// 	public JUMP_DISTANCE:number=60;
// 	private SHOW_PROBABILITY:any=[0.4,0.5,0.6,0.7,1];
// 	private stickClothDataList:Object;
// 	private isPlayWood:boolean = false;
// 	protected partAdded(partName:string,instance:any):void
// 	{
// 		super.partAdded(partName,instance);
// 	}
// 	protected childrenCreated():void
// 	{
// 		super.childrenCreated();
// 		this.setInitAllData();
// 		// this.initStickClothData();
// 		// this.setRandomStick();
// 		// this.setInitLeftOrRightMove();
// 		// this.setJumpeHeight();
// 		// 'waterDefaultMove'
// 		// let movePescide = this.createMoveObj("woodDefaultMove",this.waterMoveDefault);
// 		// console.log('rena',movePescide,this.waterMoveDefault);
// 		// this.waterMoveCilpDefault = movePescide;
// 		// movePescide.play();
// 	}
// 	public setInitAllData(){
// 		this.initStickClothData();
// 		this.setInitLeftOrRightMove();
// 		this.setJumpeHeight();
// 	}
// 	public resetIniData(){
// 		this.visible = true;
// 		this.waterMoveCilpDefault.gotoAndStop(0);
// 		this.woodMoveCilpDefault.gotoAndStop(0);
// 		this.isPlayWood = false;
// 	}
// 	private setJumpeHeight() {
// 		this.JUMP_DISTANCE = this.changeToPixel(this.JUMP_DISTANCE);
// 	}
// 	private initStickClothData() {
// 		let self = this;
// 		this.woodMoveCilpDefault = this.createMoveObj("woodDefaultMove",this.woodMoveDefault);
// 		this.waterMoveCilpDefault = this.createMoveObj("waterDefaultMove",this.waterMoveDefault);
// 		this.stickClothDataList = {
// 			normal:{
// 				fixation:[
// 					self.stickDefaultSoil,
// 					self.stickDefaultStone
// 					],
// 				horizontal:[
// 					self.stickDefaultLeaf
// 				],
// 				hitDisable:[
// 					self.waterMoveDefault
// 				],
// 				oneceHit:[
// 					self.stickDefaultCloud
// 				],
// 				timing:[
// 					self.woodMoveDefault
// 				]
// 			}
// 		}
// 		this.setThisWidthHeight({
// 			width:126,
// 			height:32
// 		});
// 	}
// 	public setStickTypeName(typeName) {
// 		this.setTypeStick(typeName);
// 		this.showStickImg();
// 	}
// 	private setInitLeftOrRightMove() {
// 		let random = Math.random();
// 		if(random>0.5) {
// 			this.speed = this.initSpeed;
// 		}else {
// 			this.speed = -this.initSpeed;
// 		}
// 	}
// 	public leftAndRightMove() {
// 		if(this.x+this.width>=this.stage.$stageWidth) {
// 			this.speed = -this.initSpeed;
// 		}else if(this.x<=0){
// 			this.speed = this.initSpeed;
// 		}
// 		this.x = this.x+this.speed;
// 	}
// 	public setTypeStick(type) {
// 		switch(type) {
// 			case this.TYPE_HORIZONTAL: 
// 			this.TYPE_STATUS = this.TYPE_HORIZONTAL;
// 			break;
// 			case this.TYPE_ONECE_HIT: 
// 			this.TYPE_STATUS = this.TYPE_ONECE_HIT;
// 			break;
// 			case this.TYPE_HIT_DISABLE: 
// 			this.TYPE_STATUS = this.TYPE_HIT_DISABLE;
// 			break;
// 			case this.TYPE_TIMING: 
// 			this.TYPE_STATUS = this.TYPE_TIMING;
// 			break;
// 			default:
// 			this.TYPE_STATUS = this.TYPE_FIXATION;
// 			break;
// 		}
// 	}
// 	public showStickImg() {
// 		let nowStick;
// 		this.hideAllChildren();
// 		nowStick = this.randomShowSameType(this.stickClothDataList[this.COLOR_STATUS][this.TYPE_STATUS]);
// 		nowStick.visible = true;
// 		this.setThisWidthHeight({
// 			width:nowStick.width,
// 			height:nowStick.height
// 		});
// 	}
// 	public playOneceClip(callback) {
// 		setTimeout(()=>{
// 			if(this.TYPE_STATUS === this.TYPE_ONECE_HIT) {
// 				callback();
// 			}
// 		},20);
// 	}
// 	public playDiasbleHitClip(callback){
// 		this.waterMoveCilpDefault.play();
// 		this.waterMoveCilpDefault.addEventListener('complete',function(){
// 			if(this.TYPE_STATUS === this.TYPE_HIT_DISABLE) {
// 				callback();
// 			}
// 		},this)
// 	}
// 	public setTimingSticket(timeNum,callback){
// 		this.isPlayWood = true;
// 		setTimeout(()=>{
// 			let self = this;
// 			this.woodMoveCilpDefault.play();
// 			this.woodMoveCilpDefault.addEventListener('complete',function(){
// 				if(self.TYPE_STATUS === self.TYPE_TIMING) {
// 					callback(self);
// 				}
// 			},this)
// 		},timeNum)
// 	}
// } 
//# sourceMappingURL=StickItem.js.map