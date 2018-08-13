class StickItem extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}
	public meter:number=0;
	
	private stickDefaultSoil:eui.Image;
	private stickDefaultLeaf:eui.Image;
	private stickDefaultStone:eui.Image;

	public TYPE_STATUS:string='fixation'; // 踏板的状态
	public TYPE_FIXATION:string='fixation'; // 固定不动状态
	public TYPE_HORIZONTAL:string='horizontal'; // 水平移动

	public COLOR_STATUS:string='normal';
	public COLOR_DEFAULE:string='normal';

	private initSpeed:number=2;
	private speed:number=2;

	private SHOW_PROBABILITY:any=[0.5,0.6,1];

	private stickClothDataList:Object;

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		
		this.initStickClothData();
		this.setRandomStick();
		this.setInitLeftOrRightMove();
	}
	private initStickClothData() {
		let self = this;

		this.stickClothDataList = {
			'normal':{
				'fixation':[
					self.stickDefaultSoil,
					self.stickDefaultStone
					],
				'horizontal':[
					self.stickDefaultLeaf
				]
			}
		}
	}
	public setRandomStick() {
		let randomNum = Math.random();
		
		if(randomNum<this.SHOW_PROBABILITY[0]) {
			this.setTypeStick(this.TYPE_FIXATION);
		}else if(randomNum>this.SHOW_PROBABILITY[0]&&randomNum<this.SHOW_PROBABILITY[1]){
			this.setTypeStick(this.TYPE_HORIZONTAL);
		}else {
			this.setTypeStick(this.TYPE_FIXATION);
		}
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
			default:
			this.TYPE_STATUS = this.TYPE_FIXATION;
			break;
		}
	}
	public showStickImg() {
		let nowStick;

		this.hideAllChildren();
		nowStick = this.randomShowSameType(this.stickClothDataList[this.COLOR_STATUS][this.TYPE_STATUS]);
		nowStick.visible = true;

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
	private hideAllChildren() {
		let len = this.$children.length;

		for(let i=0;i<len;i++) {
			this.$children[i].visible = false;
		}
	}


	
}