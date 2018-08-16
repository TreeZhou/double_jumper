class StickItem extends BasePage{
	public constructor() {
		super();
	}
	public meter:number=0;
	
	private stickDefaultSoil:eui.Image;
	private stickDefaultLeaf:eui.Image;
	private stickDefaultStone:eui.Image;
	private waterMoveDefault:eui.Group;
	private woodMoveDefault:eui.Group;

	public waterMoveCilpDefault:egret.MovieClip;
	public woodMoveCilpDefault:egret.MovieClip;

	public TYPE_NAME:string="sticket";
	public TYPE_STATUS:string='fixation'; // 踏板的状态
	public TYPE_FIXATION:string='fixation'; // 固定不动状态
	public TYPE_HORIZONTAL:string='horizontal'; // 水平移动
	public TYPE_HIT_DISABLE:string='hitDisable'; // 撞击无效，可自动断裂
	public TYPE_ONECE_HIT:string='oneceHit';  // 只检测碰撞一次

	// public COLOR_STATUS:string='normal';
	// public COLOR_DEFAULE:string='normal';

	private initSpeed:number=2;
	private speed:number=2;
	public JUMP_DISTANCE:number=60;

	private SHOW_PROBABILITY:any=[0.4,0.5,0.6,0.7,1];


	private stickClothDataList:Object;

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		
		this.initStickClothData();
		// this.setRandomStick();
		this.setInitLeftOrRightMove();
		this.setJumpeHeight();
		// 'waterDefaultMove'
		// let movePescide = this.createMoveObj("woodDefaultMove",this.waterMoveDefault);
		// console.log('rena',movePescide,this.waterMoveDefault);
		// this.waterMoveCilpDefault = movePescide;
		// movePescide.play();
	}
	private setJumpeHeight() {
		this.JUMP_DISTANCE = this.changeToPixel(this.JUMP_DISTANCE);
	}
	private initStickClothData() {
		let self = this;

		this.woodMoveCilpDefault = this.createMoveObj("woodDefaultMove",this.woodMoveDefault);
		this.waterMoveCilpDefault = this.createMoveObj("waterDefaultMove",this.waterMoveDefault);
		this.stickClothDataList = {
			normal:{
				fixation:[
					self.stickDefaultSoil,
					self.stickDefaultStone
					],
				horizontal:[
					self.stickDefaultLeaf
				],
				hitDisable:[
					self.woodMoveDefault
				],
				oneceHit:[
					self.waterMoveDefault
				]
			}
		}
	}
	public setRandomStick(typeName) {
		// let randomNum = Math.random();
		// if(randomNum<this.SHOW_PROBABILITY[0]) {
		// 	this.setTypeStick(this.TYPE_FIXATION);
		// 	// this.setTypeStick(this.TYPE_HIT_DISABLE);
		// }else if(randomNum>this.SHOW_PROBABILITY[0]&&randomNum<this.SHOW_PROBABILITY[1]){
		// 	this.setTypeStick(this.TYPE_HORIZONTAL);
		// }else if(randomNum>this.SHOW_PROBABILITY[1]&&randomNum<this.SHOW_PROBABILITY[2]){
		// 	this.setTypeStick(this.TYPE_ONECE_HIT);
		// }else if(randomNum>this.SHOW_PROBABILITY[2]&&randomNum<this.SHOW_PROBABILITY[3]){
		// 	this.setTypeStick(this.TYPE_HIT_DISABLE);
		// }else {
			
		// }
		this.setTypeStick(typeName);
		this.showStickImg();
	}
	private setInitLeftOrRightMove() {
		let random = Math.random();
		if(random>0.5) {
			this.speed = this.initSpeed;
		}else {
			this.speed = -this.initSpeed;
		}
	}
	public leftAndRightMove() {
		if(this.x+this.width>=this.stage.$stageWidth) {
			this.speed = -this.initSpeed;
		}else if(this.x<=0){
			this.speed = this.initSpeed;
		}
		this.x = this.x+this.speed;
	}

	public setTypeStick(type) {
		switch(type) {
			case this.TYPE_HORIZONTAL: 
			this.TYPE_STATUS = this.TYPE_HORIZONTAL;
			break;
			case this.TYPE_ONECE_HIT: 
			this.TYPE_STATUS = this.TYPE_ONECE_HIT;
			break;
			case this.TYPE_HIT_DISABLE: 
			this.TYPE_STATUS = this.TYPE_HIT_DISABLE;
			break;
			default:
			this.TYPE_STATUS = this.TYPE_FIXATION;
			break;
		}
	}
	public showStickImg() {
		let nowStick;

		this.hideAllChildren();
		// this.waterSticketMove.visible = true;
		// console.log(this.stickClothDataList[this.COLOR_STATUS],this.TYPE_STATUS);
		nowStick = this.randomShowSameType(this.stickClothDataList[this.COLOR_STATUS][this.TYPE_STATUS]);
		// debugger
		nowStick.visible = true;
		// console.log('我的个人显/示',this.TYPE_STATUS,nowStick.width,nowStick.height);

	}
	private randomShowSameType(list) {
		let len = list.length;
		let randomNum ,item;

		if(!len) {
			alert('随机的跳板数组长度不对!');
			return;
		}
		if(len === 1) {
			item = list[0];
		}else {
			randomNum = Math.floor(Math.random()*len);
			if(randomNum>=len) {
				randomNum = len-1;
			}else if(randomNum<0) {
				randomNum = 0;
			}
			item = list[randomNum];
		}

		return item;
	}
	// private hideAllChildren() {
	// 	let len = this.$children.length;

	// 	for(let i=0;i<len;i++) {
	// 		this.$children[i].visible = false;
	// 	}
	// }
	public playOneceClip(callback) {
		this.waterMoveCilpDefault.play();
		this.waterMoveCilpDefault.addEventListener('complete',function(){
			callback();
		},this)
	}
	public playDiasbleHitClip(callback){
		this.woodMoveCilpDefault.play();
		this.woodMoveCilpDefault.addEventListener('complete',function(){
			callback();
		},this)
	}


	
}