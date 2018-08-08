class StickItem extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}
	public meter:number=0;
	
	private stickImgGreen:eui.Image;
	private stickImgBule:eui.Image;

	public TYPE_STATUS:number=1; // 踏板的状态
	public TYPE_GREEN:number=1;
	public TYPE_BLUE:number=2;

	private initSpeed:number=2;
	private speed:number=2;


	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.setTypeStick(this.TYPE_GREEN);
		// console.log('wode',this);
		this.setInitLeftOrRightMove();
		// this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
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
		// console.log('这个对象',this.x,this.width,this.stage.$stageWidth,this.speed);
		// debugger;
		if(this.x+this.width>=this.stage.$stageWidth) {
			this.speed = -this.initSpeed;
		}else if(this.x<=0){
			this.speed = this.initSpeed;
		}
		// console.log('这个对象2',this.x,this.width,this.stage.$stageWidth,this.speed);
		// debugger;
		this.x = this.x+this.speed;
	}

	public setTypeStick(type) {
		switch(type) {
			case this.TYPE_BLUE: 
			this.TYPE_STATUS = this.TYPE_BLUE;
			break;
			default:
			this.TYPE_STATUS = this.TYPE_GREEN;
			break;
		}
		this.showStickImg();
	}
	private showStickImg() {
		switch(this.TYPE_STATUS) {
			case this.TYPE_BLUE: 
			this.stickImgGreen.visible = false;
			this.stickImgBule.visible = true;
			break;
			default:
			this.stickImgGreen.visible = true;
			this.stickImgBule.visible = false;
			break;
		}
	}


	
}